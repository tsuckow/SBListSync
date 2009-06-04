//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cSync_body == 'undefined')
{
	DF1ListSync.cSync_body = {};
}

DF1ListSync.cSync_body.construct =
function( logger, playlistFactory )
{
	if( !( logger instanceof DF1ListSync.iLogger ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iLogger");
	}

	if( !( playlistFactory instanceof DF1ListSync.iPlaylistFactory ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iPlaylistFactory");
	}

	this._logger = logger;
	this._playlistFactory = playlistFactory;
	
	//this.timer = null;
	//Df1_listsync.Sync.Delay();
};

DF1ListSync.cSync_body.start =
function()
{
}

DF1ListSync.cSync_body.stop =
function()
{
}

DF1ListSync.cSync_body.forceSync =
function()
{
	//var now = new Date();
	//var timeStart= d.getTime();
};

/**
This function is the meat and potatos for this extension.
Everything that follows is a result of what you see here.

This function retrieves the 3 lists. The Real playlist in songbird,
an internal list maintained by this extension, and a temporary cache
from the server.

Those lists are parsed and manipulation decesions are maintained.
The lists are then modified based on these. Several sync operations
may be completed at once, if the server is manipulated it must wait for
completion of said operation.
*/
Df1_listsync.cSync_body.doSync =
function()
{
	var d = new Date();
	var timeS= d.getTime();

	//Sync
	//TODO: Update
	//Df1_listsync.StatusHandler.setText("Syncing.");
	
	//Get the lists that we sync
	//TODO: Update
	var LocalLists = Df1_listsync.DB.getLists();
	
	//TODO: Update
	Df1_listsync.Sync.Delay();
	
	var done = false;
	
	//Handle each list
	for ( var i = 0; i < LocalLists.length && !done ; i++ )
	{
		var list = LocalLists[i];
		done = this.processList(list);
	}
	
	d = new Date();
	var timeE= d.getTime();
	
	//TODO: Update
	//Df1_listsync.StatusHandler.setText("Completed Sync in: " + (timeE - timeS));
};

DF1ListSync.cSync_body.processList =
function(list)
{
	//Df1_listsync.StatusHandler.setText("Scanning list: " + list.remote);
	
	//Get Playlist Objects
	try
	{
		var playlistReal   = this._playlistFactory.getRealPlaylist( list.local );
		var playlistLocal  = this._playlistFactory.getLocalPlaylist( list.remote );
		var playlistRemote = this._playlistFactory.getRemotePlaylist( list.remote );
	}
	catch(e)
	{
		//FIXME
		//Not Found.
		
		return true;
	}
	
	//Get the actual lists
	var listReal   = playlistReal.getList();
	var listLocal  = playlistLocal.getList();
	var listRemote = playlistRemote.getList();
	
	//Join arrays (unique elements)
	var JoinedList = Df1_listsync.Sync.uniqueArrayMerge( listReal, listRemote );
	JoinedList     = Df1_listsync.Sync.uniqueArrayMerge( JoinedList, listLocal );
	
	//Handle ALL music files, regardless of the list it is in.
	for( var i = 0; i < JoinedList.length; i=i+1 )
	{
		if(JoinedList[i] == "") return true;
		var isReal = RealList.indexOf( JoinedList[i] ) >= 0;
		var isLocal = Items.indexOf( JoinedList[i] ) >= 0;
		var isRemote = RemoteItems.indexOf( JoinedList[i] ) >= 0;
		
		//R L Re | A R L Re
		//0 0 0  | x 0 0 0
		//0 0 1  | 1 1 1 0
		//0 1 0  | 0 0 1 0
		//0 1 1  | 0 0 0 1
		//1 0 0  | 1 0 0 1
		//1 0 1  | 1 0 1 0
		//1 1 0  | 0 1 1 0
		//1 1 1  | x 0 0 0
		
		var add = !isLocal || (isReal && isRemote);
		var real = (isReal && isLocal && !isRemote) || (!isReal && !isLocal && isRemote);
		var local = (!isLocal && isRemote) || (isLocal && !isRemote);
		var remote = (!isReal && isLocal && isRemote) || (isReal && !isLocal && !isRemote);
		
		//Manip Real Playlist
		if(real)
		{
			//Df1_listsync.StatusHandler.setText("Modifing Real");
			if(add)
			{
				playlistReal.add( JoinedList[i] );
			}
			else
			{
				playlistReal.remove( JoinedList[i] );
			}
		}
		
		
		if(local)
		{
		//	Df1_listsync.StatusHandler.setText("Modifing Local");
			if(add)
			{
				playlistLocal.add( JoinedList[i] );
			}
			else
			{
				playlistLocal.remove( JoinedList[i] );
			}
		}
		
		if(remote)
		{
			//Df1_listsync.StatusHandler.setText("Modifing Remote");
			if(add)
			{
				playlistRemote.add( JoinedList[i] );
			}
			else
			{
				playlistRemote.remove( JoinedList[i] );
			}
		
			//Only modify remote entry once, the cache will have to be updated or any further decisions would be rejected by server.
			return true;
		}
	}
		
	return false;
};
// Make a namespace.
if (typeof Df1_listsync == 'undefined')
{
  var Df1_listsync = {};
}

// Make a namespace.
if (typeof Df1_listsync.Sync == 'undefined')
{
	Df1_listsync.Sync = {};
}

Df1_listsync.Sync.init =
function()
{
	this.timer = null;
	Df1_listsync.Sync.Delay();
};

Df1_listsync.Sync.getDelayTime =
function()
{
	return 30*1000//5*60*1000;
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
Df1_listsync.Sync.doSync =
function()
{
	//Sync
	Df1_listsync.StatusHandler.setText("Syncing.");
	
	//Get the lists that we sync
	var LocalLists = Df1_listsync.DB.getLists();
	
	//Handle each list
	for ( var i = 0; i < LocalLists.length; i++ )
	{
		var list = LocalLists[i];
		Df1_listsync.StatusHandler.setText("Scanning list: " + list.remote);
		//Get the list raw data 
		var ListData = Df1_listsync.DB.getList( list.remote );
		
		//Split data into array
		var Items;

		if( ListData==undefined )
		{
			Items = new Array();
		}
		else
		{
			if( ListData == "" )
				Items = new Array();
			else
				Items = ListData.split("\n");
		}
		
		//Get remote list raw data.
		var RemoteListData = Df1_listsync.DB.getRemoteList( list.remote );
		
		//Split data into array
		var RemoteItems;
		if( RemoteListData==undefined )
		{
			//Failure to load remote list must break out. else we would delete everything!
			Df1_listsync.Sync.ManipCallback(true,"",list.remote);
			break;
		}
		else
		{
			if( RemoteListData == "" )
				RemoteItems = new Array();
			else
				RemoteItems = RemoteListData.split("\n");
		}
		
		//alert( plList.contentSrc.prePath + plList.contentSrc.path )
		
		var sbILibraryManager=Components.classes["@songbirdnest.com/Songbird/library/Manager;1"].getService(Components.interfaces.sbILibraryManager);
		var libraries=sbILibraryManager.getLibraries();
		var foundLibrary;
		var libraryPlList;
		
		//Get the main library, we only sync it.
		foundLibrary=sbILibraryManager.mainLibrary;
		libraryPlList=foundLibrary.QueryInterface(Components.interfaces.sbIMediaList);
		
		//Get the medialist (exception if not exist)
		try
		{
			var RealLists = foundLibrary.getMediaItem( list.local );//libraryPlList.getItemsByProperty( "contentSrc" , list.local );
		}
		catch(e)
		{
			Df1_listsync.DB.removeList( list.remote );
			Df1_listsync.StatusHandler.setText("Removing non-existant list.");
			continue;
		}
		
		//Cast to medialist
		var RealPList = RealLists.QueryInterface(Components.interfaces.sbIMediaList);
		
		//Enumerate to array
		
		//Make Array
		RealPList.enumerateAllItems( Df1_listsync.Sync.ListEnumerator );
		
		//Get array
		var RealList = Df1_listsync.Sync.ListEnumerator.getList();
		
		
		//Join arrays (unique elements)
		var JoinedList = Df1_listsync.Sync.uniqueArrayMerge( RealList, RemoteItems );
		JoinedList = Df1_listsync.Sync.uniqueArrayMerge( JoinedList, Items );
		
		//Handle ALL music files, regardless of the list it is in.
		for( var i = 0; i < JoinedList.length; i=i+1 )
		{
			if(JoinedList[i] == "") continue;
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
			
			//alert("" + add + " " + real + " " + local + " " + remote);
			
			//Manip Real Playlist
			if(real)
			{
				Df1_listsync.StatusHandler.setText("Modifing Real");
				if(add)
				{
					// Get a pointer to the IOService
					// the IO service
					var ioService = Components.classes["@mozilla.org/network/io-service;1"]
											  .getService(Components.interfaces.nsIIOService);

					// create an nsIURI
					try
					{
						var uri = ioService.newURI( JoinedList[i] , null, null);
					}
					catch(e)
					{
						alert("ListSync Error: Malformed URL.");
					}
				
					if(uri)
					{
						//Add/locate MediaItem to/in main library
						var ListItem = foundLibrary.createMediaItem( uri );
						
						//Add the media item to playlist
						RealPList.add( ListItem );
					}
				}
				else
				{
					var ListItems = new Array();
					try
					{
						ListItems = RealPList.getItemsByProperty( SBProperties.contentURL, JoinedList[i] );
					}
					catch(e)
					{
						alert("ListSync Error: Item used to exist but no longer does.");
					}
					
					if( ListItems.length > 0 )
					{
						var theItem = ListItems.queryElementAt(0,Components.interfaces.sbIMediaItem);
						RealPList.remove( theItem );
					}
				}
			}
			
			
			if(local)
			{
				Df1_listsync.StatusHandler.setText("Modifing Local");
				if(add)
				{
					//Add Entry
					Items.push( JoinedList[i] );
					
					//Commit
					var newLocalList = Items.join("\n");
					Df1_listsync.DB.setList(list.remote,newLocalList);
				}
				else
				{
					//Remove Entry
					Items.splice( Items.indexOf( JoinedList[i] ), 1 );
					
					//Commit
					var newLocalList = Items.join("\n");
					Df1_listsync.DB.setList(list.remote,newLocalList);
				}
			}
			
			if(remote)
			{
				Df1_listsync.StatusHandler.setText("Modifing Remote");
				if(add)
				{
					//ListID, OldListHash(Check for changes since last cache), OP, Item, Callback
					Df1_listsync.IO.remotePlaylistManip( list.remote, sha1( RemoteListData ), Df1_listsync.IOmanipOps.ADD, JoinedList[i], function(success, data){ Df1_listsync.Sync.ManipCallback(success, data, list.remote) } );
				}
				else
				{
					//ListID, OldListHash(Check for changes since last cache), OP, Item, Callback
					Df1_listsync.IO.remotePlaylistManip( list.remote, sha1( RemoteListData ), Df1_listsync.IOmanipOps.REMOVE, JoinedList[i], function(success, data){ Df1_listsync.Sync.ManipCallback(success, data, list.remote) } );
				}
			}
			
			//Only modify remote entry once, the cache will have to be updated or any further decisions would be rejected by server.
			if(remote) return;
		}
		
	}
	
	Df1_listsync.Sync.Delay();
};

/**
Handles manipulating 
*/
Df1_listsync.Sync.ManipCallback =
function(unusedsuccess, unuseddata, id)
{
	//Refresh List
	Df1_listsync.IO.getRemotePlaylist( id, function(success, data){ Df1_listsync.Sync.GetListCallback(success, data, id) } );
};

Df1_listsync.Sync.GetListCallback =
function(success, data, id)
{
	if(success)
	{
		var listData = data.join("\n");
		
		Df1_listsync.DB.setRemoteList(id, listData);
		Df1_listsync.Sync.forceSync();
	}
	else
	{
		Df1_listsync.Sync.Delay();
	}
	
};

Df1_listsync.Sync.forceSync =
function()
{
	clearTimeout( this.timer );
	setTimeout( function(){ Df1_listsync.Sync.doSync() }, 5000 );
};

Df1_listsync.Sync.Delay =
function()
{
	var delay = Df1_listsync.Sync.getDelayTime();
	clearTimeout( this.timer );
	setTimeout( function(){ Df1_listsync.Sync.doSync() }, delay );
};
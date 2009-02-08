// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

// Make a namespace.
if (typeof Df1_listsync.Options == 'undefined')
{
  Df1_listsync.Options = {};
}

Df1_listsync.Options.populate =
function()
{
	
	var synced = this.mainWindow.Df1_listsync.DB.getLists();
	
	for(var i = 0; i < synced.length; i++)
	{
		var sbILibraryManager=Components.classes["@songbirdnest.com/Songbird/library/Manager;1"].getService(Components.interfaces.sbILibraryManager);
		var libraries=sbILibraryManager.getLibraries();
		var foundLibrary;
		var libraryPlList;
		
		//Get the main library, we only sync it.
		foundLibrary=sbILibraryManager.mainLibrary;
		libraryPlList=foundLibrary.QueryInterface(Components.interfaces.sbIMediaList);
		
		var local = synced[ i ].local;
		
		//Get the medialist (exception if not exist)
		try
		{
			//var RealLists = libraryPlList.getItemsByProperty( SBProperties.GUID , local );
			var RealLists = foundLibrary.getMediaItem( local );
			
			var localName = RealLists.name;
			
			this.insertSorted( this.syncList, true, false, synced[i].remote, "", localName );
		}
		catch(e)
		{
			//Not Found. Nuke It. No Such Playlist.
			alert( "A synced playlist has been removed." );
			this.mainWindow.Df1_listsync.DB.removeList( synced[i].remote );
		}
	}
	
	Df1_listsync.Options.getRemote();
};

Df1_listsync.Options.getRemote =
function()
{
	this.mainWindow.Df1_listsync.IO.getLists( function(success,data){ if(success){ Df1_listsync.Options.getRemoteCallback(data); } } );
};

Df1_listsync.Options.getRemoteCallback =
function(data)
{
	this.remote = data;
	Df1_listsync.Options.refresh();
	
};

Df1_listsync.Options.refresh =
function()
{
	var sel = this.getSelection(this.syncList);
	this.clearList(this.syncList);
	
	var synced = this.mainWindow.Df1_listsync.DB.getLists();
	
	var syncedremote = new Array();
	
	for(var i = 0; i < synced.length; i++)
	{
		syncedremote.push( synced[i].remote );
	}
	
	var mixed = this.mainWindow.Df1_listsync.Sync.uniqueArrayMerge( syncedremote, this.remote );
	
	for(var i = 0; i < mixed.length; i++)
	{
		var isSynced = syncedremote.indexOf( mixed[i] ) >= 0;
		var doesExist = this.remote.indexOf( mixed[i] ) >= 0;
		
		var localName = "";
		
		if(isSynced)
		{
			var sbILibraryManager=Components.classes["@songbirdnest.com/Songbird/library/Manager;1"].getService(Components.interfaces.sbILibraryManager);
			var libraries=sbILibraryManager.getLibraries();
			var foundLibrary;
			var libraryPlList;
			
			//Get the main library, we only sync it.
			foundLibrary=sbILibraryManager.mainLibrary;
			libraryPlList=foundLibrary.QueryInterface(Components.interfaces.sbIMediaList);
			
			var syncedItem = synced[ syncedremote.indexOf( mixed[i] ) ];
			var local = syncedItem.local;
			
			//Get the medialist (exception if not exist)
			try
			{
				//var RealLists = libraryPlList.getItemsByProperty( SBProperties.GUID , local );
				var RealLists = foundLibrary.getMediaItem( local );
				localName = RealLists.name;
			}
			catch(e)
			{
				//Not Found. Nuke It. No Such Playlist.
				alert( "A synced playlist has been removed." );
				this.mainWindow.Df1_listsync.DB.removeList( syncedItem.remote );
				continue; //Next!
			}
		}
		
		if(doesExist)
		{
			Df1_listsync.Options.getRemoteName( isSynced, mixed[i], localName );
		}
		
		this.insertSorted( this.syncList, isSynced, !doesExist, mixed[i], "", localName );
	}
	
	this.setSelection( this.syncList, sel );
};

Df1_listsync.Options.getRemoteName =
function(synced, id, localName)
{
	this.mainWindow.Df1_listsync.IO.getRemotePlaylistInfo( id, function(success,data){ if(success){ Df1_listsync.Options.getRemoteNameCallback( synced, id, localName, data ); } } );
};

Df1_listsync.Options.getRemoteNameCallback =
function(synced, id, localName, data)
{
	var sel = this.getSelection(this.syncList);
	this.insertSorted( this.syncList, synced, false, id, data[0], localName );
	this.setSelection( this.syncList, sel );
};
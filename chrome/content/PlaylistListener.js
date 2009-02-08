// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

Df1_listsync.PlaylistListener =
{
	init : function()
	{
		//Enum top Level Libraries
		/*while(libraries.hasMoreElements())
		{
			foundLibrary=libraries.getNext();

		}*/
	
		var sbILibraryManager=Components.classes["@songbirdnest.com/Songbird/library/Manager;1"].getService(Components.interfaces.sbILibraryManager);
		var libraries=sbILibraryManager.getLibraries();
		var foundLibrary;
		var libraryPlList;
		var filters;
		
		//Get the main library, we only sync it.
		foundLibrary=sbILibraryManager.mainLibrary;
		libraryPlList=foundLibrary.QueryInterface(Components.interfaces.sbIMediaList);
		
		//Listen for new playlists
		Df1_listsync.PlaylistListener.registerPlaylist(libraryPlList);
		
		//Look for the playlists
		tempView=libraryPlList.createView();
		filters=tempView.cascadeFilterSet;
		filters.clearAll();
		filters.appendSearch(new Array("*"),1);
		filters.appendFilter("http://songbirdnest.com/data/1.0#isList");
		filters.set(1,new Array("1"),1);
		
		//Iterate through the lists
		for(i=0;i<tempView.length;i++)
		{
			//Get the list
			plList=tempView.getItemByIndex(i).QueryInterface(Components.interfaces.sbIMediaList);
			//Is the list completely full of shit?
			if(plList.name!=""&&plList.name!=" "&&plList.name!="undefined"&&plList.name!=null)
			{
				//alert( plList.contentSrc.prePath + plList.contentSrc.path )
				//We cannot sync it if it is not editable (Like a Smart Playlist)
				if( plList.userEditableContent )
				{
					Df1_listsync.StatusHandler.setText(plList.name);
					Df1_listsync.PlaylistListener.registerPlaylist(plList);
				}
			}
		}
	},

	/*********************************************************************
     	 * Routine fired for when media is removed from the main library.  We need
     	 * to do this so we can add it to server.
     	 *********************************************************************/
	onItemAdded : function(list, item, index)
	{
		var list = item.getProperty(SBProperties.isList);
		
		if(list == "1")
		{//Is a Playlist
			var playlist = item.QueryInterface(Components.interfaces.sbIMediaList);
			Df1_listsync.StatusHandler.setText("Playlist Added: " + playlist.name);
			//playlist.guid
			//Property: ContentUrl
		}
		else
		{//Is Music
			Df1_listsync.StatusHandler.setText("Music Added");
		}
		
		return false;
    },
	
	/*********************************************************************
     	 * Routine fired for when media is removed from the main library.  We need
     	 * to do this so we can remove it from server.
     	 *********************************************************************/
    onBeforeItemRemoved : function(list, item, index)
	{
		var list = item.getProperty(SBProperties.isList);
		
		if(list == "1")
		{//Is a Playlist
			var playlist = item.QueryInterface(Components.interfaces.sbIMediaList);
			Df1_listsync.StatusHandler.setText("Playlist Removed: " + playlist.name);
		}
		else
		{//Is Music
			Df1_listsync.StatusHandler.setText("Music Removed");
		}
		
		return false;
	},
	
	registerPlaylist : function(list)
	{
		list.addListener( Df1_listsync.PlaylistListener , false,
			list.LISTENER_FLAGS_ITEMADDED |
			list.LISTENER_FLAGS_BEFOREITEMREMOVED
			);
	}
};
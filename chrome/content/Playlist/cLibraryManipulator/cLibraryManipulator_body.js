//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cLibraryManipulator_body == 'undefined')
{
	DF1ListSync.cLibraryManipulator_body = {};
}

DF1ListSync.cLibraryManipulator_body.construct = 
function( localListID )
{
	var sbILibraryManager=Components.classes["@songbirdnest.com/Songbird/library/Manager;1"].getService(Components.interfaces.sbILibraryManager);
	
	//Get the main library, we only sync it.
	this._mainLibrary=sbILibraryManager.mainLibrary;
	var libraryPlList = this._mainLibrary.QueryInterface(Components.interfaces.sbIMediaList);
	
	//Get the medialist (exception if not exist)
	try
	{
		var RealLists = this._mainLibrary.getMediaItem( localListID );
	}
	catch(e)
	{
		//Doesnt Exist
		throw e;//TODO: New Exception
	}
	
	//Cast to medialist
	this._medialist = RealLists.QueryInterface(Components.interfaces.sbIMediaList);
};

DF1ListSync.cLibraryManipulator_body.add = 
function( url )
{
	// Get a pointer to the IOService
	// the IO service
	var ioService = Components.classes["@mozilla.org/network/io-service;1"]
							  .getService(Components.interfaces.nsIIOService);

	// create an nsIURI
	try
	{
		var uri = ioService.newURI( url , null, null);
	}
	catch(e)
	{
		alert("ListSync Error: Malformed URL.");
		throw e;
	}

	//Add/locate MediaItem to/in main library
	var ListItem = this._mainLibrary.createMediaItem( uri );
	
	//Add the media item to playlist
	this._medialist.add( ListItem );
};

DF1ListSync.cLibraryManipulator_body.remove = 
function( url )
{
	var ListItems = new Array();
	try
	{
		ListItems = this._medialist.getItemsByProperty( SBProperties.contentURL, url );
	}
	catch(e)
	{
		alert("ListSync Error: Item used to exist but no longer does.");
		return;
	}
	
	if( ListItems.length > 0 )
	{
		var theItem = ListItems.queryElementAt(0,Components.interfaces.sbIMediaItem);
		this._medialist.remove( theItem );
	}
};

DF1ListSync.cLibraryManipulator_body.getList = 
function()
{
	this._medialist.enumerateAllItems( this.ListEnumerator );
	
	//Get array
	var RealList = this.ListEnumerator.getList();
	
	this.ListEnumerator.clearList();
	
	return RealList;
};

Df1_listsync.cLibraryManipulator_body.ListEnumerator =
{
	onEnumerationBegin: function(aMediaList)
	{
		this.list = new Array();
	},
	
	onEnumeratedItem: function(aMediaList, aMediaItem)
	{
		this.list.push( aMediaItem.getProperty(SBProperties.contentURL) );
	},  

	onEnumerationEnd: function(aMediaList, aStatusCode)
	{},
	
	getList: function()
	{
		return this.list;
	},
	
	clearList: function()
	{
		this.list = new Array();
	},
};

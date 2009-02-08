// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

// Make a namespace.
if (typeof Df1_listsync.Options == 'undefined')
{
  Df1_listsync.Options = {};
}

Df1_listsync.Options.onSelection =
function()
{
	var sel = this.syncList.selectedIndex;
	if( sel >= 0 )
	{
		var item = this.syncList.getItemAtIndex( sel );
		var synced = this.mainWindow.Df1_listsync.DB.getLists();
		var itemID = item.getAttribute("value");
		
		var isSynced = false;
		for(var i = 0; i < synced.length; i=i+1)
		{
			if( synced[i].remote == itemID )
			{
				isSynced = true;
				break;
			}
		}
		
		if( isSynced )
		{
			this.syncListEnable.setAttribute("label","Disable");
		}
		else
		{
			this.syncListEnable.setAttribute("label","Enable");
		}
		
		this.syncListEnable.removeAttribute("disabled");
	}
	else
	{
		this.syncListEnable.setAttribute("label","Disable");
		this.syncListEnable.setAttribute("disabled","true");
	}
}

Df1_listsync.Options.onClick =
function()
{
	var item = this.syncList.selectedItem;
	if( item != null )
	{
		var synced = this.mainWindow.Df1_listsync.DB.getLists();
		var itemID = item.getAttribute("value");		
		
		var isSynced = false;
		for(var i = 0; i < synced.length; i=i+1)
		{
			if( synced[i].remote == itemID )
			{
				isSynced = true;
				break;
			}
		}
		
		if( isSynced )
		{
			//this.syncListEnable.setAttribute("label","Disable");
			this.mainWindow.Df1_listsync.DB.removeList( itemID );
			Df1_listsync.Options.getRemote();
		}
		else
		{
			//this.syncListEnable.setAttribute("label","Enable");
			
			var params = {result:null};       
			window.openDialog("chrome://df1_listsync/content/dialogOptions/select_playlist.xul", "", "chrome, dialog, modal, resizable=yes", params).focus();
			if (params.result)
			{
			    // User clicked ok. Process changed arguments; e.g. write them to disk or whatever
				this.mainWindow.Df1_listsync.DB.addList( itemID, params.result )	
				Df1_listsync.Options.getRemote();
			}
			else
			{
				// User clicked cancel. Typically, nothing is done here.
			}
		}
	}
	else
	{
		this.syncListEnable.setAttribute("label","Disable");
		this.syncListEnable.setAttribute("disabled","true");
	}
}
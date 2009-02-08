// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

Df1_listsync.MenuListener =
{

	/*********************************************************************
     	 * Routine fired when updating display of menu. (eg. when pref change)
     	 *********************************************************************/
	update : function()
	{
		var enabled = Application.prefs.get("extensions.df1_listsync.syncenabled").value;
		var syncButton = document.getElementById('df1_listsync-MenuSync');
		if(enabled)
		{
			syncButton.setAttribute("checked","true");
		}
		else
		{
			syncButton.removeAttribute("checked");
		}
	},

	/*********************************************************************
     	 * Routine fired when the settings dialog is to be displayed.
     	 *********************************************************************/
	openSettings : function()
	{
		window.open("chrome://df1_listsync/content/dialogOptions/options.xul", "", "chrome"); 
    },
	
	/*********************************************************************
     	 * Routine fired when enable button is clicked.
     	 *********************************************************************/
    toggleEnable : function()
	{
		//alert( "Item being removed." );
		
		//Application.prefs.get("extensions.df1_listsync.firstrun").value
		
		var syncButton = document.getElementById('df1_listsync-MenuSync');
		var checked = syncButton.hasAttribute("checked");
		Application.prefs.setValue("extensions.df1_listsync.syncenabled", (checked==true)/*:bool*/ );
    }
}; 
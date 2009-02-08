// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

Df1_listsync.Commands =
{
	init : function()
	{
		// Attach doHelloWorld to our helloworld command
	    this._helloWorldCmd = document.getElementById("df1_listsync-helloworld-cmd");
	    this._helloWorldCmd.addEventListener("command", 
	         function() { controller.doHelloWorld(); }, false);

		//Settings Menuitem
		this._CmdMenuSettings = document.getElementById("df1_listsync-menu-settings");
	    this._CmdMenuSettings.addEventListener("command", 
	         function() { Df1_listsync.MenuListener.openSettings(); }, false);
		
		//Enable Menuitem
		this._CmdMenuEnable = document.getElementById("df1_listsync-menu-enable");
	    this._CmdMenuEnable.addEventListener("command", 
	         function() { Df1_listsync.MenuListener.toggleEnable(); }, false);
	}
}; 
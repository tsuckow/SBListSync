if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = 
		Components.classes["@mozilla.org/appshell/window-mediator;1"]
		.getService(Components.interfaces.nsIWindowMediator)
		.getMostRecentWindow("Songbird:Main")
		.DF1ListSync;
}
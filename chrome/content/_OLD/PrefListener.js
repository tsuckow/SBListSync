// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

Df1_listsync.PrefListener =
{
	/*********************************************************************
     	 * Routine fired to init listening
     	 *********************************************************************/
	init : function()
	{
		this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
         .getService(Components.interfaces.nsIPrefService)
         .getBranch("extensions.df1_listsync.");
		this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
		this.prefs.addObserver("", this, false);
    },
	
	/*********************************************************************
	* Routine fired for when media is removed from the main library.  We need
	* to do this so we can remove it from server.
	* aSubject - The nsIPrefBranch  object (this).
	* aTopic - The string defined by NS_PREFBRANCH_PREFCHANGE_TOPIC_ID
	* aData - The name of the preference which has changed, relative to the "root" of the aSubject branch. 
	 *********************************************************************/
    observe : function( aSubject, aTopic, aData )
	{
		//Update marks in menu
		Df1_listsync.MenuListener.update();
	}
};
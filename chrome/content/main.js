
// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

/**
 * UI controller that is loaded into the main player window
 */
Df1_listsync.Controller = {

  /**
   * Called when the window finishes loading
   */
	onLoad: function()
	{

		// initialization code
		this._initialized = true;
		this._strings = document.getElementById("df1_listsync-strings");
		
		
		
		// Make a local variable for this controller so that
		// it is easy to access from closures.
		var controller = this;
		
		Df1_listsync.ajax.init();
		Df1_listsync.IO.init();
		Df1_listsync.DB.init();
		Df1_listsync.Sync.init();
		
		//Setup what all the commands do
		Df1_listsync.Commands.init();
		//Set the state of the menuitems
		Df1_listsync.MenuListener.update();
		
		
		Df1_listsync.PlaylistListener.init();
		
		
		Df1_listsync.PrefListener.init();
		
		
		Df1_listsync.StatusHandler.registerListener();
		
		var login = Df1_listsync.LoginHelper.getLogin();
		Df1_listsync.IO.setLogin( login.username, login.password );
		
		/*setTimeout(function(){ Df1_listsync.IO.getRemotePlaylist(5); },5000);
		setTimeout(function(){ Df1_listsync.IO.logout(); },7000);
		setTimeout(function(){ Df1_listsync.IO.getRemotePlaylist(5); },9000);
		setTimeout(function(){ Df1_listsync.IO.getRemotePlaylistHash(5); },11000);*/
		
		// Perform extra actions the first time the extension is run after init
		if (Application.prefs.get("extensions.df1_listsync.firstrun").value)
		{
			Application.prefs.setValue("extensions.df1_listsync.firstrun", false);
			this._firstRunSetup();
	    }
	},
  

  /**
   * Called when the window is about to close
   */
  onUnLoad: function()
  {
    this._initialized = false;
	Df1_listsync.ajax.destruct();
  },
  

  /**
   * Sample command action
   */
  doHelloWorld : function() {
    var message = "Df1_listsync: " + this._strings.getString("helloMessage") + this._initialized;
    alert(message);
  },

  
  /**
   * Perform extra setup the first time the extension is run
   */
  _firstRunSetup : function() {
  
    // Call this.doHelloWorld() after a 3 second timeout
    setTimeout(function(controller) { controller.doHelloWorld(); }, 3000, this); 
  
  },

};

window.addEventListener("load", function(e) { Df1_listsync.Controller.onLoad(e); }, false);
window.addEventListener("unload", function(e) { Df1_listsync.Controller.onUnLoad(e); }, false);

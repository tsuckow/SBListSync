//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

//Make Namespace.
if (typeof DF1ListSync.nMain == 'undefined')
{
	DF1ListSync.nMain = {};
}

DF1ListSync.nMain.onLoad =
function()
{
	//Logger
	var logger = new DF1ListSync.cLogger();
	DF1ListSync.DialogUtils.m_logger = logger;
	
	var status = new DF1ListSync.cStatus();

	status.setText("Init");
	
	//
	//LOGIN (This is only for dev and will be changed later)
	//
	
	var settings = new DF1ListSync.cSettings();
	
	var http = new XMLHttpRequest();
	
	var ajax = new DF1ListSync.cAjax( http, settings );
	
	
	
	//
	//END LOGON
	//
	
	var db = new DF1ListSync.cDB( "df1_listsync" );
	
	//var playlistFactory = new DF1ListSync.cPlaylistFactory( /*library,*/ db );
	
	//var sync = new DF1ListSync.cSync( logger, playlistFactory );
	
	var queue = new DF1ListSync.cIOQueue();
	
	var IOfactory = new DF1ListSync.cIOCommandFactory( queue );
	
	var IOManager = new DF1ListSync.cIOManager( queue, IOfactory );
	
	var pump = new DF1ListSync.cIOPump( ajax, queue );
	
	pump.start();
	
	IOManager.newLogin( "user", "pass" );
	
	IOManager.request( "getLists" );

};

window.addEventListener("load", function(e) { DF1ListSync.nMain.onLoad(e); }, false);

/*
//UI controller that is loaded into the main player window
Df1_listsync.Controller = {

	//Finished Loading
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
		
		// Perform extra actions the first time the extension is run after init
		if (Application.prefs.get("extensions.df1_listsync.firstrun").value)
		{
			Application.prefs.setValue("extensions.df1_listsync.firstrun", false);
			this._firstRunSetup();
	    }
	},
  
//On Exit
onUnLoad: function()
  {
    this._initialized = false;
	Df1_listsync.ajax.destruct();
  },
  

  //FirstRun
  doHelloWorld : function() {
    var message = "Df1_listsync: " + this._strings.getString("helloMessage") + this._initialized;
    alert(message);
  },

  
  //Fisrt Run
  _firstRunSetup : function() {
  
    // Call this.doHelloWorld() after a 3 second timeout
    setTimeout(function(controller) { controller.doHelloWorld(); }, 3000, this); 
  
  },

};

window.addEventListener("load", function(e) { Df1_listsync.Controller.onLoad(e); }, false);
window.addEventListener("unload", function(e) { Df1_listsync.Controller.onUnLoad(e); }, false);
*/
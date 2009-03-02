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



/*
	var http = new XMLHttpRequest();
	
	alert( (http.__proto__ == XMLHttpRequest.prototype) + " " + (http.__proto__ === XMLHttpRequest.prototype) + " " + http.readyState );
	
	http.__proto__.readyState = 5;
	
	alert( (http.__proto__ == XMLHttpRequest.prototype) + " " + (http.__proto__ === XMLHttpRequest.prototype) + " " + http.readyState );

	var http2 = new XMLHttpRequest();
	
	alert( http2.readyState );
	*/
	/*var httpRequest = new DF1ListSync.iXMLHttpRequest();
	var settings = new DF1ListSync.cSettings();
	var ajax = new DF1ListSync.cAjax(httpRequest,settings);
	ajax.add();*/
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
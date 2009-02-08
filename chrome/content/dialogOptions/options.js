// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

// Make a namespace.
if (typeof Df1_listsync.Options == 'undefined')
{
  Df1_listsync.Options = {};
}

Df1_listsync.Options.init =
function()
{
	var wMediator = Components.classes["@mozilla.org/appshell/window-mediator;1"]
		.getService(Components.interfaces.nsIWindowMediator);
	
	var type = "";
	var enumerator = wMediator.getEnumerator(type);
	var winME = document.defaultView;
	while(enumerator.hasMoreElements())
	{
		var win = enumerator.getNext();
		if( win.location == winME.location.toString())
		{
			if(win != winME)
			{
				var pref_window = document.getElementById("df1_listsyncPreferences");
				pref_window.cancelDialog();
				
				win.focus();
				win.getAttention();
				win.focus();
				return;
			}
		}
		
	}
	
	this.mainWindow = wMediator.getMostRecentWindow("Songbird:Main");
	
	
	this.loginTimer = null;
	this.loginCount = 0;
	this.loginIcon = document.getElementById("df1_listsync-LoginImage");
	
	this.acctUser = document.getElementById("userPref");
	this.acctPass = document.getElementById("passPref");
	
	this.syncList = document.getElementById("synclist");
	
	this.syncListEnable = document.getElementById("df1_listsync-ButtonEnable");
	
	var login = this.mainWindow.Df1_listsync.LoginHelper.getLogin();
	
	this.acctUser.value = login.username;
	this.acctPass.value = login.password;
	
	this.loginChange();
	
	/*this.insertSorted( this.syncList, true, false, 120, "DIE COMMIES!", "L" );
	this.insertSorted( this.syncList, true, false, 100, "R", "L" );
	this.insertSorted( this.syncList, false, false, 1051, "EE", "L" );
	this.insertSorted( this.syncList, true, false, 120, "EE", "L" );
	this.insertSorted( this.syncList, false, true, 3213, "", "L" );
	this.insertSorted( this.syncList, true, true, 3521, "A", "L" );*/

	this.remote = new Array();
	
	Df1_listsync.Options.populate();
},

Df1_listsync.Options.accept =
function()
{
	clearTimeout(this.loginTimer);
	this.loginHandle();
},

Df1_listsync.Options.loginChange =
function()
{
	var oThis = this;
	clearTimeout(this.loginTimer);
	
	this.loginTimer = setTimeout(function(){ oThis.loginHandle(); },400);
},

Df1_listsync.Options.loginHandle =
function()
{
	this.loginCount++;
	this.loginIcon.style.listStyleImage = "url('chrome://df1_listsync/skin/busy.png')";
	this.clearList(this.syncList);
	//Set Localized Tooltip
	
	var oThis = this;
	
	var user = this.acctUser.value;
	var pass = this.acctPass.value;
	
	this.mainWindow.Df1_listsync.LoginHelper.setLogin( user, pass );
	
	this.mainWindow.Df1_listsync.IO.setLogin(user, pass, function(s){ oThis.loginCallback(s); } );
};
	
Df1_listsync.Options.loginCallback =
function(success)
{
	this.loginCount--;
	
	if( this.loginCount == 0 )//Most Recent Request
	{
		if(success)
		{
			this.loginIcon.style.listStyleImage = "url('chrome://df1_listsync/skin/ok.png')";
			//Set Localized Tooltip
		}
		else
		{
			this.loginIcon.style.listStyleImage = "url('chrome://df1_listsync/skin/bad.png')";
			//Set Localized Tooltip
		}
		this.populate();
	}
};

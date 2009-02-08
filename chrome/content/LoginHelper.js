// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

Df1_listsync.LoginHelper =
{
	
	getLogin : function()
	{
		
		var hostname = 'chrome://df1_listsync/';
		var formSubmitURL = 'Account';
		var httprealm = null;
		var username = "";
		var password = "";
		
		try
		{
			// Get Login Manager 
			var myLoginManager = Components.classes["@mozilla.org/login-manager;1"]
				.getService(Components.interfaces.nsILoginManager);
			
			// Find users for the given parameters
			var logins = myLoginManager.findLogins({}, hostname, formSubmitURL, httprealm);
			
			// Find user from returned array of nsILoginInfo objects
			if( logins.length > 0 )
			{
				username = logins[0].username;
				password = logins[0].password;
			}
		}
		catch(ex)
		{
			alert( "No Login Manager. How is that possible?" );
		}
		
		return { username: username, password: password, };
	},
	

	setLogin : function(user, pass)
	{
		var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1",
			Components.interfaces.nsILoginInfo,
			"init");
		
		var hostname = 'chrome://df1_listsync/';
		var formSubmitURL = 'Account';
		var httprealm = null;
		
		var loginInfo = new nsLoginInfo("chrome://df1_listsync/", "Account", null, user, pass, "", "");
		
		try
		{
			// Get Login Manager 
			var myLoginManager = Components.classes["@mozilla.org/login-manager;1"]
				.getService(Components.interfaces.nsILoginManager);
			
			// Find users for the given parameters
			var logins = myLoginManager.findLogins({}, hostname, formSubmitURL, httprealm);
			
			// Find user from returned array of nsILoginInfo objects
			if( logins.length > 0 )
			{//Replace
				//Remove multiples if somehow there are
				for (var i = 1; i < logins.length; i++)
				{
					passwordManager.removeLogin(logins[i]);
				}
				
				if(pass == "" || pass == null)
				{
					passwordManager.removeLogin(logins[0]);
				}
				else
				{
					myLoginManager.modifyLogin( logins[0] , loginInfo );
				}
			}
			else
			{//New
				if( !(pass == "" || pass == null) )
				{
					myLoginManager.addLogin(loginInfo);
				}
			}
		}
		catch(ex)
		{
			alert( "No Login Manager. How is that possible?" );
		}
		
	},
};
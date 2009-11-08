//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cAuth_body == 'undefined')
{
	DF1ListSync.cAuth_body = {};
}

DF1ListSync.cAuth_body.construct =
function( logger )
{
	if( !( logger instanceof DF1ListSync.iLogger ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iLogger");
	}

	this._logger = logger;
	
	this._user = "";
	this._pass = "";
	
	this._hash = "";
	this._sessionID = "";
};

/**
**  \brief Checks whether this instance has been authenticated successfully
*/
DF1ListSync.cAuth_body.isAuthenticated =
function()
{
	return this._sessionID != "";
};

/**
**  \brief Forces this instance to reauthenticate
*/
DF1ListSync.cAuth_body.authenticate =
function()
{
	//Do Magic Here
};

/**
**  \brief Sets the login for this instance
*/
DF1ListSync.cAuth_body.setLogin =
function( user, pass )
{
	this._user = user;
	this._pass = pass;
	
	this._hash = "";
	this._sessionID = "";
};

DF1ListSync.cAuth_body.getUsername =
function()
{
	return this._user;
};

DF1ListSync.cAuth_body.getPassword =
function()
{
	return this._pass;
};

DF1ListSync.iAuth_body.getSessionID =
function()
{
	return this._sessionID;
};

DF1ListSync.cAuth_body.storeLogin =
function()
{
		var user = this._user;
		var pass = this._pass;
		
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
};

DF1ListSync.cAuth_body.retrieveLogin =
function()
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
	
	this._user = username;
	this._pass = password;
};

/**
** \brief Clones the authentication information into a new instance.
** \note If the previous instance was authenticated, this one will not be.
*/
DF1ListSync.cAuth_body.clone =
function()
{
	var newauth = new DF1ListSync.cAuth( this._logger );
	
	newauth.setLogin( this._user, this._pass );
	
	return newauth;
};
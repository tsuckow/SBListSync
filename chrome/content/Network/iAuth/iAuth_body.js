//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iAuth_body == 'undefined')
{
	DF1ListSync.iAuth_body = {};
}

/**
**  \brief Checks whether this instance has been authenticated successfully
*/
DF1ListSync.iAuth_body.isAuthenticated = DF1ListSync.Utils.AbstractFunction;

/**
**  \brief Forces this instance to reauthenticate
*/
DF1ListSync.iAuth_body.authenticate = DF1ListSync.Utils.AbstractFunction;

/**
**  \brief Sets the login for this instance
*/
DF1ListSync.iAuth_body.setLogin = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iAuth_body.getUsername = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iAuth_body.getPassword = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iAuth_body.getSessionID = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iAuth_body.storeLogin = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iAuth_body.retrieveLogin = DF1ListSync.Utils.AbstractFunction;

/**
** \brief Clones the authentication information into a new instance.
** \note If the previous instance was authenticated, this one will not be.
*/
DF1ListSync.iAuth_body.clone = DF1ListSync.Utils.AbstractFunction;
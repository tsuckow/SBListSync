//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cCommandSetLogin_body == 'undefined')
{
	DF1ListSync.cCommandSetLogin_body = {};
}

DF1ListSync.cCommandSetLogin_body.construct =
function(invoker, factory, user, pass)
{
	if( !( invoker instanceof DF1ListSync.iIOInvoker ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOInvoker");
	}
	
	if( !( factory instanceof DF1ListSync.iIOCommandExecuteFactory ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOCommandExecuteFactory");
	}
	
	if(typeof user != 'string')
	{
		throw new DF1ListSync.cInvalidParameterException("Username is not a string");
	}
	
	if(typeof pass != 'string')
	{
		throw new DF1ListSync.cInvalidParameterException("Password is not a string");
	}
	
	this.invoker = invoker;
	this.factory = factory;
	this.username = user;
	this.password = pass;
};

DF1ListSync.cCommandSetLogin_body.getName =
function()
{
	return "IOCommand: SetLogin"
};

DF1ListSync.cCommandSetLogin_body.execute =
function()
{
	//Get rid this command
	this.invoker.pop();
	
	this.invoker.setLogin(user, pass);
		
	this.factory.addHello();
}

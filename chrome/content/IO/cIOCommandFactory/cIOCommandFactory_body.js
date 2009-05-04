//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOCommandFactory_body == 'undefined')
{
	DF1ListSync.cIOCommandFactory_body = {};
}

DF1ListSync.cIOCommandFactory_body.construct =
function(invoker, executeFactory, ajax)
{
	if( !( invoker instanceof DF1ListSync.iIOInvoker ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOInvoker");
	}
	
	if( !( executeFactory instanceof DF1ListSync.iIOCommandExecuteFactory ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOCommandExecuteFactory");
	}
	
	if( !( ajax instanceof DF1ListSync.iAjax ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iAjax");
	}
	
	this.invoker = invoker;
	this.executeFactory = executeFactory;
};

DF1ListSync.cIOCommandFactory_body.getWait =
function(time)
{
	if(typeof time != 'number')
	{
		throw new DF1ListSync.cInvalidParameterException("Time is not a number");
	}
	
	var obj = new DF1ListSync.cIOCommandWait(this.invoker, time);
	return obj;
};

DF1ListSync.cIOCommandFactory_body.getSetLogin =
function(user, pass)
{
	if(typeof user != 'string')
	{
		throw new DF1ListSync.cInvalidParameterException("Username is not a string");
	}
	
	if(typeof pass != 'string')
	{
		throw new DF1ListSync.cInvalidParameterException("Password is not a string");
	}
	
	var obj = new DF1ListSync.cIOCommandSetLogin(this.invoker, this.executeFactory, user, pass);
	return obj;
};

DF1ListSync.cIOCommandFactory_body.getHello =
function(obj, func)
{
	var obj = new DF1ListSync.cIOCommandHello(this.invoker, this.executeFactory, this.ajax, obj, func);
	return obj;
};

DF1ListSync.cIOCommandFactory_body.getLogin =
function(chall, obj, func)
{
	var obj = new DF1ListSync.cIOCommandLogin(this.invoker, this.executeFactory, this.ajax, chall, obj, func);
	return obj;
};
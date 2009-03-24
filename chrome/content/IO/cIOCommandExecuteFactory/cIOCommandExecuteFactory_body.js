//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOCommandExecuteFactory_body == 'undefined')
{
	DF1ListSync.cIOCommandExecuteFactory_body = {};
}

DF1ListSync.cIOCommandExecuteFactory_body.construct =
function(invoker, factory)
{
	if( !( invoker instanceof DF1ListSync.iIOInvoker ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOInvoker");
	}
	
	if( !( factory instanceof DF1ListSync.iIOCommandFactory ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOCommandFactory");
	}
	
	this.invoker = invoker;
	this.factory = factory;
};

DF1ListSync.cIOCommandExecuteFactory_body.addWait =
function(time)
{
	var cmd = this.factory.getWait(time);
	this.invoker.append(cmd);
};

DF1ListSync.cIOCommandExecuteFactory_body.addSetLogin =
function(user, pass);
{
	var cmd = this.factory.getSetLogin(user, pass);
	this.invoker.append(cmd);
};

DF1ListSync.cIOCommandExecuteFactory_body.addHello =
function()
{
	var cmd = this.factory.getHello();
	this.invoker.append(cmd);
};

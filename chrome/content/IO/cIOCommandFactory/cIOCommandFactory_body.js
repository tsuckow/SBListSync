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
function(invoker)
{
	if( !( invoker instanceof DF1ListSync.iIOInvoker ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOInvoker");
	}
	
	this.invoker = invoker;
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
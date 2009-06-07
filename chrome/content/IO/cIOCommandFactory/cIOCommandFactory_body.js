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
function( queue )
{
	this._queue = queue;
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

DF1ListSync.cIOCommandFactory_body.newGetLists =
function( obj, func )
{
	return new DF1ListSync.cIOCommandGetLists( obj, func );
};
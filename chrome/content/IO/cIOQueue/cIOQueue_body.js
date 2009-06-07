//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOQueue_body == 'undefined')
{
	DF1ListSync.cIOQueue_body = {};
}


DF1ListSync.cIOQueue_body.construct =
function()
{
	this._queue = new Array();
};

DF1ListSync.cIOQueue_body.append =
function( IOCommand )
{
	if( !( IOCommand instanceof DF1ListSync.iIOCommand ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOCommand");
	}
	
	this._queue.unshift(IOCommand);
};

DF1ListSync.cIOQueue_body.prepend =
function( IOCommand )
{
	if( !( IOCommand instanceof DF1ListSync.iIOCommand ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOCommand");
	}

	this._queue.push(IOCommand);
};

DF1ListSync.cIOQueue_body.pop =
function()
{
	return this._queue.pop();
};

DF1ListSync.cIOQueue_body.isEmpty =
function()
{
	return this._queue.length == 0;
};
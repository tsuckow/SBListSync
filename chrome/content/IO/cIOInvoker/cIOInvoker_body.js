//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOInvoker_body == 'undefined')
{
	DF1ListSync.cIOInvoker_body = {};
}

DF1ListSync.cIOInvoker_body.construct =
function(set)
{
	if( !( set instanceof DF1ListSync.iSettings ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iSettings");
	}

	this.settings = set;
	
	this.queue = new Array();
		
	this.timer = DF1ListSync.Utils.setTimeout(this, this.process, 100);
};

DF1ListSync.cIOInvoker_body.append =
function(command)
{
	if( !( command instanceof DF1ListSync.iIOCommand ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOCommand");
	}
	
	this.queue.push(command);
};

DF1ListSync.cIOInvoker_body.prepend =
function(command)
{
	if( !( command instanceof DF1ListSync.iIOCommand ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOCommand");
	}
	
	this.queue.unshift(command);
};

DF1ListSync.cIOInvoker_body.pop =
function()
{
	this.queue.shift();
};

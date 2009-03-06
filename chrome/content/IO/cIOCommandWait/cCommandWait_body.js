//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cCommandWait_body == 'undefined')
{
	DF1ListSync.cCommandWait_body = {};
}

DF1ListSync.cCommandWait_body.construct =
function(invoker, end)
{
	if( !( invoker instanceof DF1ListSync.iIOInvoker ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOInvoker");
	}
	
	if(typeof end != 'number')
	{
		throw new DF1ListSync.cInvalidParameterException("Time is not a number");
	}
	
	this.invoker = invoker;
	this.endTime = end;
};

DF1ListSync.cCommandWait_body.getName =
function()
{
	return "IOCommand: Wait"
};

DF1ListSync.cCommandWait_body.execute =
function()
{
	var now = new Date().getTime();
	
	if( now > this.endTime )
	{
		this.invoker.pop();
		
		//Df1_listsync.StatusHandler.setText( "Waiting Done" );
	}
	else
	{
		var displayTime = (this.endTime - now);
		displayTime = Math.ceil(displayTime/100) / 10;
		//Df1_listsync.StatusHandler.setText("Waiting " + displayTime.toFixed(1) );
	}
}
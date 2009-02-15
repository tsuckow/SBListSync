//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cUnitRunner_body == 'undefined')
{
	DF1ListSync.cUnitRunner_body = {};
}

DF1ListSync.cUnitRunner_body.construct =
function()
{
	
};

DF1ListSync.cUnitRunner_body.init =
function()
{
	if( !this.busy )
	{
		this.inRun = true;
		
		this.busy = true;
		this.ySpot = this.runTest();
		this.ySpot.next();
		
		this.inRun = false;
	}
};

DF1ListSync.cUnitRunner_body.resume =
function()
{
	this.inRun = true;
	
	try
	{
		this.ySpot.next();
	}
	catch(e)
	{
		if(e instanceof StopIteration)
			this.busy = false;
		else
			throw e;
	}
	
	this.inRun = false;
};

DF1ListSync.cUnitRunner_body.runTest =
function()
{
	var num = 10;
	for( var i = 0; i < num; i=i+1 )
	{
		this.current = i;
		DF1ListSync.Utils.setTimeout(this, this.callback, 30000, i, false);
		
		
		
		yield;
	}
};

DF1ListSync.cUnitRunner_body.callback =
function(id, success)
{
	if(this.inRun)
	{
		//Need to leave the test runner first.
		DF1ListSync.Utils.setTimeoutArgs(this, arguments.callee, 0, arguments);
		return;
	}
	
	//Stuff related to success or failure of test
	
	alert( "Test " + id + " " + success );
	
	//

	if(id == this.current)
	{
		clearTimeout(this.timeout);
		this.resume();
	}
};

DF1ListSync.cUnitRunner_body.timeout = null;

DF1ListSync.cUnitRunner_body.current = -1;

DF1ListSync.cUnitRunner_body.ySpot = null;

DF1ListSync.cUnitRunner_body.busy = false;

DF1ListSync.cUnitRunner_body.inRun = false;

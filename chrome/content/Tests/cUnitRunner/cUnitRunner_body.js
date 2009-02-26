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
function(o, f_reg, f_callback)
{
	this.tests = new Array();

	this.resultCallback = DF1ListSync.Utils.build(o,f_callback);
	
	this.addCallback = DF1ListSync.Utils.build(o,f_reg);
	
	this.addTests( new DF1ListSync.cTestAjax().getTests() );
	
};

DF1ListSync.cUnitRunner_body.addTests =
function(t)
{
	for(var i = 0; i < t.length; i=i+1)
	{
		var tt = t[i];
	
		this.tests.push( { obj: tt.obj, func: tt.func } );
		this.addCallback(tt.name);
	}
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
	var num = this.tests.length;
	for( var i = 0; i < num; i=i+1 )
	{
		this.current = i;
		this.timeout = DF1ListSync.Utils.setTimeout(this, this.callback, 30000, i, false);
		
		var test = this.tests[i];
		DF1ListSync.Utils.build(test.obj,test.func)(this, this.callback, i);
		
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
	
	
	var msg = "Replace me";
	this.resultCallback(id, success, msg);
	
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
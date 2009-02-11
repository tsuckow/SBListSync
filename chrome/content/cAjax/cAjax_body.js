//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cAjax_body == 'undefined')
{
	DF1ListSync.cAjax_body = {};
}

DF1ListSync.cAjax_body.construct =
function(HttpRequest,Settings)
{
	//Super
	arguments.callee.$.construct.call(this);
	
	if( !( HttpRequest instanceof XMLHttpRequest ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of XMLHttpRequest");
	}
	
	if( !( Settings instanceof DF1ListSync.iSettings ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iSettings");
	}
	
	//Http Request Object for actually doing server communication
	this.http = HttpRequest;
	this.settings = Settings;
	
	this.settings.addEventListener(this, this.callback);
	
	//Empty Queue
	this.queue = [];
	
	this.retryTimer = undefined;
	
	this.retryCount = 0;
	
	this.RETRYMAX = 4;
	
	//Milliseconds
	this.RETRYTIMEOUT = 4 * 1000;
	
	//Init Processing
	//var oThis = this;
	//this.timer = setTimeout(function(){ oThis.process(); },100);
};

DF1ListSync.cAjax_body.add =
function()
{
	var othis = this;
	DF1ListSync.Utils.setTimeout(this.settings, this.settings.triggerEventListeners, 5000, "PAram");
};

DF1ListSync.cAjax_body.callback =
function(o)
{
	alert("I got called back! " + this.RETRYMAX + " " + o);
};
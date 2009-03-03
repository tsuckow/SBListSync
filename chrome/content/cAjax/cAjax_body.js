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
	
	//TODO: This is for IO not ajax
	this.settings.addEventListener(this, this.settingsCallback);
	
	//Empty Queue
	this.queue = new Array();
	
	this.retryTimer = undefined;
	
	this.retryCount = 0;
	
	this.RETRYMAX = 4;
	
	//Milliseconds
	this.RETRYTIMEOUT = 4 * 1000;
	
	//Init Processing
	var oThis = this;
	this.timer = setTimeout(function(){ oThis.process(); },100);
};

DF1ListSync.cAjax_body.destroy =
function()
{
	if( this.http.readyState != 0 )
	{
		this.http.abort();
	}
	clearTimeout(this.timer);
	this.queue = new Array();
}

DF1ListSync.cAjax_body.open =
function(url, obj, func)
{
	fobj = (typeof obj  == "undefined")?this:obj;
	func = (typeof func == "undefined")?function(){}:func;
	
	var callback = DF1ListSync.Utils.build(obj, func);
	
	this.queue.push( [url,callback] );
};

DF1ListSync.cAjax_body.retry =
function()
{
	clearTimeout( this.retryTimer );
	//Df1_listsync.StatusHandler.setText("Ajax: retry " + this.retryCount);
	var oThis = this; //Referance to self. Use this in internal function so "this" will really point to this object and not something else.
	var oHttp = this.http;
	if( this.http.readyState != 0 )
	{
		this.http.abort();
	}
	
	this.retryCount = this.retryCount + 1;
	
	if(this.retryCount > this.RETRYMAX)
	{
		this.retryCount = 0;
		//Df1_listsync.StatusHandler.setText("Ajax: failed");
		//Comm Error
		var entry = this.queue.shift();
		
		var call = entry[1];
			
		if( call !== undefined )
		{
			call(false,"");
		}
	}
	else
	{
		//Try Again
		//this.process();
	}
};

DF1ListSync.cAjax_body.process =
function()
{
	var oThis = this;
	this.timer = setTimeout(function(){ oThis.process(); },100);
	
	if( this.http.readyState != 0 )
	{
		return;
	}
	
	if(this.queue.length > 0)
	{
		var item = this.queue[0]; //Next Item, Peek dont pop
		
		//build the URL
		var sURL = item[0];
		
		//TODO: Update this to new system
		//if(this.retryCount == 0) Df1_listsync.StatusHandler.setText("Ajax: url " + sURL);

		//open connection to suggestion source file
		this.http.open("get", sURL , true);

		//Setup Callback
		var oThis = this;
		this.http.onreadystatechange = function () { oThis.ajaxCallback(); };
		
		this.http.send(null);

		this.retryTimer = setTimeout( function(){ oThis.retry() }, this.RETRYTIMEOUT );
	}
};

DF1ListSync.cAjax_body.ajaxCallback =
function()
{
	if ( this.http.readyState == 4)
	{
		if( this.http.status == 200 )
		{
			clearTimeout( this.retryTimer );
			this.retryCount = 0;
			
			//Result
			var result = this.http.responseText;
			
			//Cleanup
			this.http.abort();
			
			//Call the callback.
			var entry = this.queue.shift();
			
			var call = entry[1];
			
			if( call !== undefined )
			{
				call(true,result);
			}
		}
		else
		{
			this.retry();
		}
	}
};

//TODO: This is for IO not ajax
DF1ListSync.cAjax_body.settingsCallback =
function(o)
{
	alert("I got called back! " + this.RETRYMAX + " " + o);
};
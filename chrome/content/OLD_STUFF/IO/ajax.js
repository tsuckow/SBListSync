// Make a namespace.
if (typeof Df1_listsync == 'undefined')
{
  var Df1_listsync = {};
}

Df1_listsync.ajax =
{
	init : function()
	{
		
		this.http = new XMLHttpRequest();
		
		//Empty Queue
		this.queue = [];
		
		this.retryTimer = undefined;
		
		this.retryCount = 0;
		
		this.RETRYMAX = 4;
		
		//Milliseconds
		this.RETRYTIMEOUT = 4 * 1000;
		
		//Init Processing
		var oThis = this;
		this.timer = setTimeout(function(){ oThis.process(); },100);
	},
	
	destruct : function()
	{
		if( this.http.readyState != 0 )
		{
	        this.http.abort();
	    }
		clearTimeout(this.timer);
		this.queue = [];
	},
	
	send : function(url, callback)
	{
		this.queue.push( [url,callback] );
	},
	
	retry : function()
	{
		Df1_listsync.StatusHandler.setText("Ajax: retry " + this.retryCount);
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
			Df1_listsync.StatusHandler.setText("Ajax: failed");
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
			this.process();
		}
	},
	
	process : function()
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
			
			if(this.retryCount == 0) Df1_listsync.StatusHandler.setText("Ajax: url " + sURL);

			//open connection to suggestion source file
			this.http.open("get", sURL , true);

			//Setup Callback
			var oThis = this;
			this.http.onreadystatechange = function () { oThis.handleCallback(); };
			
			this.http.send(null);
	
			this.retryTimer = setTimeout( function(){ oThis.retry() }, this.RETRYTIMEOUT );
		}
	},
	
	handleCallback : function()
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
        }
	},
};

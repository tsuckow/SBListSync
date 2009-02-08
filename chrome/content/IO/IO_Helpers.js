// Make a namespace.
if (typeof Df1_listsync == 'undefined')
{
  var Df1_listsync = {};
}

// Make a namespace.
if (typeof Df1_listsync.IO == 'undefined')
{
  Df1_listsync.IO = {};
}

Df1_listsync.IO.ajaxSend =
function(url)
{
	var oThis = this;
	Df1_listsync.ajax.send(this.URLPREFIX + url, function(success,data){ oThis.handleCallback(success,data); } );
	this.busy = true;
};

Df1_listsync.IO.addWait =
function(time)
{
	if( time === undefined )
	{
		time = this.IOERROR_WAITTIME;
	}
	
	this.queue.unshift(
		[
			Df1_listsync.IOops.WAIT,
			[new Date().getTime() + time],
			undefined
		]
	);
};

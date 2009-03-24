//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOInvoker_body == 'undefined')
{
	DF1ListSync.cIOInvoker_body = {};
}

DF1ListSync.cIOInvoker_body.process =
function()
{
	//Do it all again
	this.timer = DF1ListSync.Utils.setTimeout(this, this.process, 100);
	
	if( !this.busy && (this.queue.length > 0) )
	{
		var item = this.queue[0]; //Next Item, Peek dont pop
		
		this.busy = item.execute() === true;
	}
};

DF1ListSync.cIOInvoker_body.callback =
function(success,data)
{
	if( this.queue.length > 0 )
	{
		var item = this.queue[0]; //Next Item, Peek dont pop
		
		item.callback(success, data);
	}
		
	this.busy = false;
};

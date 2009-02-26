//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cInvalidOperationException_body == 'undefined')
{
	DF1ListSync.cInvalidOperationException_body = {};
}
		
DF1ListSync.cInvalidOperationException_body.construct =
function(msg)
{
	//Super
	arguments.callee.$.construct.call(this);
	
	this.message = (typeof msg == 'undefined') ? "" : msg;
};

DF1ListSync.cInvalidOperationException_body.name = "InvalidOperationException";
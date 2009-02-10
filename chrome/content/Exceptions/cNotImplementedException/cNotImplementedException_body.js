//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cNotImplementedException_body == 'undefined')
{
	DF1ListSync.cNotImplementedException_body = {};
}
		
DF1ListSync.cNotImplementedException_body.construct =
function(msg)
{
	this.message = (typeof msg == 'undefined') ? "" : msg;
};

DF1ListSync.cNotImplementedException_body.name = "Action Not Implemented";
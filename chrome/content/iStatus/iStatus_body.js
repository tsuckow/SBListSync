//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iStatus_body == 'undefined')
{
	DF1ListSync.iStatus_body = {};
}

DF1ListSync.iStatus_body.setStatus = DF1ListSync.Utils.AbstractFunction;
DF1ListSync.iStatus_body.clearStatus = DF1ListSync.Utils.AbstractFunction;
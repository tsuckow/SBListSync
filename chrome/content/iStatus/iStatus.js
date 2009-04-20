//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iStatus == 'undefined')
{
	if (typeof DF1ListSync.iStatus_body != 'undefined')
	{
		DF1ListSync.iStatus = DF1ListSync.cObject.extend(DF1ListSync.iStatus_body);
	}
}
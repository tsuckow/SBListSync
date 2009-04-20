//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cStatus == 'undefined')
{
	if (typeof DF1ListSync.cStatus_body != 'undefined')
	{
		DF1ListSync.cStatus = DF1ListSync.iStatus.extend(DF1ListSync.cStatus_body);
	}
}
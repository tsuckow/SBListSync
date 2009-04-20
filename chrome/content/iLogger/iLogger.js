//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iLogger == 'undefined')
{
	if (typeof DF1ListSync.iLogger_body != 'undefined')
	{
		DF1ListSync.iLogger = DF1ListSync.cObject.extend(DF1ListSync.iLogger_body);
	}
}
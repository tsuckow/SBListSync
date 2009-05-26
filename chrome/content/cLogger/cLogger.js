//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cLogger == 'undefined')
{
	if (typeof DF1ListSync.cLogger_body != 'undefined')
	{
		DF1ListSync.cLogger = DF1ListSync.iLogger.extend(DF1ListSync.cLogger_body);
	}
}
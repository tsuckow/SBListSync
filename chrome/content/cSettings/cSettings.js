//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cSettings == 'undefined')
{
	if (typeof DF1ListSync.cSettings_body != 'undefined')
	{
		DF1ListSync.cSettings = DF1ListSync.iSettings.extend(DF1ListSync.cSettings_body);
	}
}
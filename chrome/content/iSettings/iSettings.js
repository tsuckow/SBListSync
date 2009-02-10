//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iSettings == 'undefined')
{
	if (typeof DF1ListSync.iSettings_body != 'undefined')
	{
		DF1ListSync.iSettings = PolyClass.extend(DF1ListSync.iSettings_body);
	}
}
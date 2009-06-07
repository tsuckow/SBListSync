//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOManager == 'undefined')
{
	if (typeof DF1ListSync.cIOManager_body != 'undefined')
	{
		DF1ListSync.cIOManager = DF1ListSync.iIOManager.extend(DF1ListSync.cIOManager_body);
	}
}
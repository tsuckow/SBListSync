//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOManager == 'undefined')
{
	if (typeof DF1ListSync.iIOManager_body != 'undefined')
	{
		DF1ListSync.iIOManager = DF1ListSync.cObject.extend(DF1ListSync.iIOManager_body);
	}
}
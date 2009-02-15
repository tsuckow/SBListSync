//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cUnitRunner == 'undefined')
{
	if (typeof DF1ListSync.cUnitRunner == 'undefined')
	{
		DF1ListSync.cUnitRunner = DF1ListSync.cObject.extend(DF1ListSync.cUnitRunner_body);
	}
}
//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOCommandFactory == 'undefined')
{
	if (typeof DF1ListSync.cIOCommandFactory_body != 'undefined')
	{
		DF1ListSync.cIOCommandFactory = DF1ListSync.iIOCommandFactory.extend(DF1ListSync.cIOCommandFactory_body);
	}
}
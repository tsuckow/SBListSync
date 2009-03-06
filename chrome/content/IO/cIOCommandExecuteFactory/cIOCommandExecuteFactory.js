//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOCommandExecuteFactory == 'undefined')
{
	if (typeof DF1ListSync.cIOCommandExecuteFactory_body != 'undefined')
	{
		DF1ListSync.cIOCommandExecuteFactory = DF1ListSync.iIOCommandExecuteFactory.extend(DF1ListSync.cIOCommandExecuteFactory_body);
	}
}
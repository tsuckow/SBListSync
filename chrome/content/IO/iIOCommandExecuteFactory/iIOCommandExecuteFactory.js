//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOCommandExecuteFactory == 'undefined')
{
	if (typeof DF1ListSync.iIOCommandExecuteFactory_body != 'undefined')
	{
		DF1ListSync.iIOCommandExecuteFactory = DF1ListSync.cObject.extend(DF1ListSync.iIOCommandExecuteFactory_body);
	}
}
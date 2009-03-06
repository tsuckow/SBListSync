//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOCommandFactory == 'undefined')
{
	if (typeof DF1ListSync.iIOCommandFactory_body != 'undefined')
	{
		DF1ListSync.iIOCommandFactory = DF1ListSync.cObject.extend(DF1ListSync.iIOCommandFactory_body);
	}
}
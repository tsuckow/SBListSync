//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOCommandHello == 'undefined')
{
	if (typeof DF1ListSync.cIOCommandHello_body != 'undefined')
	{
		DF1ListSync.cIOCommandHello = DF1ListSync.iIOCommand.extend(DF1ListSync.cIOCommandHello_body);
	}
}
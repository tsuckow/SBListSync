//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOCommandLogin == 'undefined')
{
	if (typeof DF1ListSync.cIOCommandLogin_body != 'undefined')
	{
		DF1ListSync.cIOCommandLogin = DF1ListSync.iIOCommand.extend(DF1ListSync.cIOCommandLogin_body);
	}
}
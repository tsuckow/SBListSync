//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cCommandLogin == 'undefined')
{
	if (typeof DF1ListSync.cCommandLogin_body != 'undefined')
	{
		DF1ListSync.cCommandLogin = DF1ListSync.iIOCommand.extend(DF1ListSync.cCommandLogin_body);
	}
}
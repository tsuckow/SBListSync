//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cCommandSetLogin == 'undefined')
{
	if (typeof DF1ListSync.cCommandSetLogin_body != 'undefined')
	{
		DF1ListSync.cCommandSetLogin = DF1ListSync.iIOCommand.extend(DF1ListSync.cCommandSetLogin_body);
	}
}

//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOPump == 'undefined')
{
	if (typeof DF1ListSync.cIOPump_body != 'undefined')
	{
		DF1ListSync.cIOPump = DF1ListSync.iIOPump.extend(DF1ListSync.cIOPump_body);
	}
}
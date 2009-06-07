//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOPump == 'undefined')
{
	if (typeof DF1ListSync.iIOPump_body != 'undefined')
	{
		DF1ListSync.iIOPump = DF1ListSync.cObject.extend(DF1ListSync.iIOPump_body);
	}
}
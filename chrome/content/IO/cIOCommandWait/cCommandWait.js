//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cCommandWait == 'undefined')
{
	if (typeof DF1ListSync.cCommandWait_body != 'undefined')
	{
		DF1ListSync.cCommandWait = DF1ListSync.iIOCommand.extend(DF1ListSync.cCommandWait_body);
	}
}
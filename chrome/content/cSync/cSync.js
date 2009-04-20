//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cSync == 'undefined')
{
	if (typeof DF1ListSync.cSync_body != 'undefined')
	{
		DF1ListSync.cSync = DF1ListSync.iSync.extend(DF1ListSync.cSync_body);
	}
}
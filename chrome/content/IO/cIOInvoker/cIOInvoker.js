//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOInvoker == 'undefined')
{
	if (typeof DF1ListSync.cIOInvoker_body != 'undefined')
	{
		DF1ListSync.cIOInvoker = DF1ListSync.iIOInvoker.extend(DF1ListSync.cIOInvoker_body);
	}
}
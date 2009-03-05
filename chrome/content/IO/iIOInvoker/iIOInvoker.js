//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOInvoker == 'undefined')
{
	if (typeof DF1ListSync.iIOInvoker_body != 'undefined')
	{
		DF1ListSync.iIOInvoker = DF1ListSync.cObject.extend(DF1ListSync.iIOInvoker_body);
	}
}
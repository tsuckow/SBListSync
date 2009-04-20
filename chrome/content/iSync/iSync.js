//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iSync == 'undefined')
{
	if (typeof DF1ListSync.iSync_body != 'undefined')
	{
		DF1ListSync.iSync = DF1ListSync.cObject.extend(DF1ListSync.iSync_body);
	}
}
//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOQueue == 'undefined')
{
	if (typeof DF1ListSync.iIOQueue_body != 'undefined')
	{
		DF1ListSync.iIOQueue = DF1ListSync.cObject.extend(DF1ListSync.iIOQueue_body);
	}
}
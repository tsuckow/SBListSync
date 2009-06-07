//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOQueue == 'undefined')
{
	if (typeof DF1ListSync.cIOQueue_body != 'undefined')
	{
		DF1ListSync.cIOQueue = DF1ListSync.iIOQueue.extend(DF1ListSync.cIOQueue_body);
	}
}
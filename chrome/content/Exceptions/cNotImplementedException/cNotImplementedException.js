//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cNotImplementedException == 'undefined')
{
	if (typeof DF1ListSync.cNotImplementedException_body != 'undefined')
	{
		DF1ListSync.cNotImplementedException = DF1ListSync.iException.extend(DF1ListSync.cNotImplementedException_body);
	}
}
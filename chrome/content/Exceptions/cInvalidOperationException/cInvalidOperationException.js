//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cInvalidOperationException == 'undefined')
{
	if (typeof DF1ListSync.cInvalidOperationException_body != 'undefined')
	{
		DF1ListSync.cInvalidOperationException = DF1ListSync.iException.extend(DF1ListSync.cInvalidOperationException_body);
	}
}
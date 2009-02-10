//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cInvalidParameterException == 'undefined')
{
	if (typeof DF1ListSync.cInvalidParameterException_body != 'undefined')
	{
		DF1ListSync.cInvalidParameterException = DF1ListSync.iException.extend(DF1ListSync.cInvalidParameterException_body);
	}
}
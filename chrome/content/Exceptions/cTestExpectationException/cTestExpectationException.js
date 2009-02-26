//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cTestExpectationException == 'undefined')
{
	if (typeof DF1ListSync.cTestExpectationException_body != 'undefined')
	{
		DF1ListSync.cTestExpectationException = DF1ListSync.iException.extend(DF1ListSync.cTestExpectationException_body);
	}
}
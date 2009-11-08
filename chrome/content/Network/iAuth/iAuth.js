//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iAuth == 'undefined')
{
	if (typeof DF1ListSync.iAuth_body != 'undefined')
	{
		DF1ListSync.iAuth = DF1ListSync.cObject.extend(DF1ListSync.iAuth_body);
	}
}
//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cAuth == 'undefined')
{
	if (typeof DF1ListSync.cAuth_body != 'undefined')
	{
		DF1ListSync.cAuth = DF1ListSync.iAuth.extend(DF1ListSync.cAuth_body);
	}
}
//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iAjax == 'undefined')
{
	if (typeof DF1ListSync.iAjax_body != 'undefined')
	{
		DF1ListSync.iAjax = DF1ListSync.cObject.extend(DF1ListSync.iAjax_body);
	}
}
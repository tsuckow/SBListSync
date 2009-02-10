//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cAjax == 'undefined')
{
	if (typeof DF1ListSync.cAjax_body != 'undefined')
	{
		DF1ListSync.cAjax = DF1ListSync.iAjax.extend(DF1ListSync.cAjax_body);
	}
}
//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cTestAjax == 'undefined')
{
	if (typeof DF1ListSync.cTestAjax == 'undefined')
	{
		DF1ListSync.cTestAjax = DF1ListSync.iUnitTest.extend(DF1ListSync.cTestAjax_body);
	}
}
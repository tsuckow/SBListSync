//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.tTestAjax_Settings == 'undefined')
{
	if (typeof DF1ListSync.tTestAjax_Settings_body != 'undefined')
	{
		DF1ListSync.tTestAjax_Settings = DF1ListSync.iSettings.extend(DF1ListSync.tTestAjax_Settings_body);
	}
}
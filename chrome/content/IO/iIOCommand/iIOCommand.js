//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOCommand == 'undefined')
{
	if (typeof DF1ListSync.iIOCommand_body != 'undefined')
	{
		DF1ListSync.iIOCommand = DF1ListSync.cObject.extend(DF1ListSync.iIOCommand_body);
	}
}
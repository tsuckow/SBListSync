//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOCommandGetLists == 'undefined')
{
	if (typeof DF1ListSync.cIOCommandGetLists_body != 'undefined')
	{
		DF1ListSync.cIOCommandGetLists = DF1ListSync.iIOCommand.extend(DF1ListSync.cIOCommandGetLists_body);
	}
}
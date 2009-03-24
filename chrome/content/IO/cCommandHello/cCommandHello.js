//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cCommandHello == 'undefined')
{
	if (typeof DF1ListSync.cCommandHello_body != 'undefined')
	{
		DF1ListSync.cCommandHello = DF1ListSync.iIOCommand.extend(DF1ListSync.cCommandHello_body);
	}
}
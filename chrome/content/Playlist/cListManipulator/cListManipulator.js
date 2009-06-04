//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cListManipulator == 'undefined')
{
	if (typeof DF1ListSync.cListManipulator_body != 'undefined')
	{
		DF1ListSync.cListManipulator = DF1ListSync.iPlaylistManipulator.extend(DF1ListSync.cListManipulator_body);
	}
}
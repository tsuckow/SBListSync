//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cLibraryManipulator == 'undefined')
{
	if (typeof DF1ListSync.cLibraryManipulator_body != 'undefined')
	{
		DF1ListSync.cLibraryManipulator = DF1ListSync.iPlaylistManipulator.extend(DF1ListSync.cLibraryManipulator_body);
	}
}
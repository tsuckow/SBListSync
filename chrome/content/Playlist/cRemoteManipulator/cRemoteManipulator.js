//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cRemoteManipulator == 'undefined')
{
	if (typeof DF1ListSync.cRemoteManipulator_body != 'undefined')
	{
		DF1ListSync.cRemoteManipulator = DF1ListSync.iPlaylistManipulator.extend(DF1ListSync.cRemoteManipulator_body);
	}
}
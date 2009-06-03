//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iLibraryManipulator == 'undefined')
{
	if (typeof DF1ListSync.iLibraryManipulator_body != 'undefined')
	{
		DF1ListSync.iLibraryManipulator = DF1ListSync.cObject.extend(DF1ListSync.iLibraryManipulator_body);
	}
}
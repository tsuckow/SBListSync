//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iPlaylistFactory == 'undefined')
{
	if (typeof DF1ListSync.iPlaylistFactory_body != 'undefined')
	{
		DF1ListSync.iPlaylistFactory = DF1ListSync.cObject.extend(DF1ListSync.iPlaylistFactory_body);
	}
}
//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cPlaylistFactory == 'undefined')
{
	if (typeof DF1ListSync.cPlaylistFactory_body != 'undefined')
	{
		DF1ListSync.cPlaylistFactory = DF1ListSync.iPlaylistFactory.extend(DF1ListSync.cPlaylistFactory_body);
	}
}
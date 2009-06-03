.//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iPlaylistFactory_body == 'undefined')
{
	DF1ListSync.iPlaylistFactory_body = {};
}

DF1ListSync.iPlaylistFactory_body.getRealPlaylist = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iPlaylistFactory_body.getLocalPlaylist = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iPlaylistFactory_body.getRemotePlaylist = DF1ListSync.Utils.AbstractFunction;
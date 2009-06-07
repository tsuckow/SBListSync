.//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cPlaylistFactory_body == 'undefined')
{
	DF1ListSync.cPlaylistFactory_body = {};
}

DF1ListSync.cPlaylistFactory_body.construct =
function( db )
{
	this._db = db;
};

DF1ListSync.cPlaylistFactory_body.getRealPlaylist =
function( id )
{
	return new DF1ListSync.cLibraryManipulator( id );
};

DF1ListSync.cPlaylistFactory_body.getLocalPlaylist =
function( id )
{
	return new DF1ListSync.cListManipulator( id, this._db );
};

DF1ListSync.cPlaylistFactory_body.getRemotePlaylist =
function( id )
{
	
};
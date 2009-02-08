// Make a namespace.
if (typeof Df1_listsync == 'undefined')
{
  var Df1_listsync = {};
}

// Make a namespace.
if (typeof Df1_listsync.IO == 'undefined')
{
	Df1_listsync.IO = {};
}

Df1_listsync.IO.init =
function()
{
	this.loggedIn = false;
	this.remoteListNum = -1;
	this.remoteList = [];
	
	this.username = "";
	this.passhash = "";
	
	//Empty Queue
	this.queue = [];
	
	this.busy = false;
	
	//Init Processing
	var oThis = this;
	this.timer = setTimeout(function(){ oThis.process(); },100);
	
	this.URLPREFIX = "http://sblistsync.novahost.org/Sync/";
	
	this.IOERROR_WAITTIME = 30000;
};

Df1_listsync.IO.login =
function(callback)
{
	Df1_listsync.StatusHandler.setText("Login");
	this.queue.unshift(
		[
			Df1_listsync.IOops.LOGIN_HELLO,
			[],
			callback
		]
	);
};

Df1_listsync.IO.setLogin =
function(user, pass, callback)
{
	Df1_listsync.StatusHandler.setText("Queuing Set Login");
	this.queue.push(
		[
			Df1_listsync.IOops.LOGIN_SET,
			[ user, sha1( pass + "sbLS$4!t" ) ],
			callback
		]
	);
};

Df1_listsync.IO.logout =
function()
{
	Df1_listsync.StatusHandler.setText("Queuing Logout.");
	this.queue.push(
		[
			Df1_listsync.IOops.LOGOUT,
			[],
			undefined
		]
	);
};
	
Df1_listsync.IO.checkValidLogin =
function(callback)
{
	Df1_listsync.StatusHandler.setText("Queuing Check Login");
	this.queue.push(
		[
			Df1_listsync.IOops.LOGIN_HELLO,
			[],
			callback
		]
	);
};
	
Df1_listsync.IO.getLists =
function(callback)
{
	Df1_listsync.StatusHandler.setText("Queuing List Get");
	this.queue.push(
		[
			Df1_listsync.IOops.LISTS_GET,
			[],
			callback
		]
	);
};
	
Df1_listsync.IO.getRemotePlaylist =
function(playlistID, callback)
{
	Df1_listsync.StatusHandler.setText("Queuing List Get");
	this.queue.push(
		[
			Df1_listsync.IOops.LIST_GET,
			[playlistID],
			callback
		]
	);
};

Df1_listsync.IO.getRemotePlaylistHash =
function(playlistID, callback)
{
	Df1_listsync.StatusHandler.setText("Queuing List Hash Get");
	this.queue.push(
		[
			Df1_listsync.IOops.LIST_HASH,
			[playlistID],
			callback
		]
	);
};

Df1_listsync.IO.remotePlaylistManip =
function(playlistID, checksum, op, file, callback)
{
	Df1_listsync.StatusHandler.setText("Queuing List Hash Get");
	this.queue.push(
		[
			Df1_listsync.IOops.LIST_MANIP,
			[playlistID, checksum, op, file],
			callback
		]
	);
};

Df1_listsync.IO.getRemotePlaylistInfo =
function(playlistID, callback)
{
	Df1_listsync.StatusHandler.setText("Get List Info");
	this.queue.push(
		[
			Df1_listsync.IOops.GET_INFO,
			[playlistID],
			callback
		]
	);
};
	
Df1_listsync.IOops =
{
	LOGIN_HELLO:     1,
	LOGIN_DO:        2,
	LOGIN_SET:       3,
	LOGOUT:          4,
	LIST_MANIP:      5,
	LIST_GET:        6,
	LIST_HASH:       7,
	WAIT:            8,
	GET_INFO:        9,
	LISTS_GET:      10,
};

Df1_listsync.IOmanipOps =
{
	ADD:             1,
	REMOVE:          2,
};
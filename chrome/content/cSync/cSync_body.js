//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cSync_body == 'undefined')
{
	DF1ListSync.cSync_body = {};
}

DF1ListSync.cSync_body.construct =
function()
{
	this.timer = null;
	Df1_listsync.Sync.Delay();
};

DF1ListSync.cSync_body.forceSync =
function()
{
	var now = new Date();
	var timeStart= d.getTime();
};
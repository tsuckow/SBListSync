var timer = 0;
var last_entries;

//
// This Should all be changed to use callbacks, logger sends notification when new log entry comes in,
//


var load =
function()
{
	var logdat = DF1ListSync.DialogUtils.getLogger();
	logdat.logGeneric("Dialog: Logger","Opened Logger Dialog");
	
	timer = DF1ListSync.Utils.setTimeout(this, this.refresh, 1000);
};

var refresh =
function()
{
	if( typeof DF1ListSync == 'undefined' ) return;
	
	var logdat = DF1ListSync.DialogUtils.getLogger();
	
	var logs = logdat.getLogs( logdat.type.Generic );
	
	var list = document.getElementById("List");
	var item = list.appendItem(name,name);
	
	for(var i = 0; i < logs.length; ++i)
	{
		var cell = document.createElement('listcell');
		cell.setAttribute('label', logs[i].sm );
		//cell.setAttribute('value', "ii" );
		item.appendChild( cell );
	}
	
	sizeToContent();
	
	timer = DF1ListSync.Utils.setTimeout(this, this.refresh, 3000);
};

var unload =
function()
{
	clearTimeout(timer);
};
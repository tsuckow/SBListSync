//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cSettings_body == 'undefined')
{
	DF1ListSync.cSettings_body = {};
}
		
DF1ListSync.cSettings_body.construct =
function()
{
	//Super
	arguments.callee.$.construct.call(this);
	
	this.events = new Array();
};
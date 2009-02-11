//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cSettings_body == 'undefined')
{
	DF1ListSync.cSettings_body = {};
}

DF1ListSync.cSettings_body.addEventListener =
function(o, f)
{
	this.events.push( {obj: o, func: f} );
};

DF1ListSync.cSettings_body.removeEventListener =
function(o, f)
{
	var eLen = this.events.length;
	for(var i = 0; i < eLen; i=i+1)
	{
		var event = this.events[i];
		if(event.obj === o && event.func === f)
		{
			this.events.splice(i,1);
			break;
		}
	}
};

DF1ListSync.cSettings_body.triggerEventListeners =
function()
{
	var eLen = this.events.length;
	for(var i = 0; i < eLen; i=i+1)
	{
		var event = this.events[i];
		event.func.apply(event.obj,arguments);
	}
};
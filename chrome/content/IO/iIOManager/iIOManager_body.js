//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOManager_body == 'undefined')
{
	DF1ListSync.iIOManager_body = {};
}

DF1ListSync.iIOManager_body.request = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iIOManager_body.addListener = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iIOManager_body.removeListener = DF1ListSync.Utils.AbstractFunction;

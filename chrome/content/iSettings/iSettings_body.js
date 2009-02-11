//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iSettings_body == 'undefined')
{
	DF1ListSync.iSettings_body = {};
}

DF1ListSync.iSettings_body.addEventListener = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iSettings_body.removeEventListener = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iSettings_body.triggerEventListeners = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iSettings_body.getUsername = DF1ListSync.Utils.AbstractFunction;

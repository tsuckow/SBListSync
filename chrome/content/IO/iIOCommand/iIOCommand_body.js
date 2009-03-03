//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOCommand_body == 'undefined')
{
	DF1ListSync.iIOCommand_body = {};
}

DF1ListSync.iIOCommand_body.execute = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iIOCommand_body.callback = function(){};//Not required
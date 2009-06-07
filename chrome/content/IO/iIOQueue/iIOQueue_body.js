//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOQueue_body == 'undefined')
{
	DF1ListSync.iIOQueue_body = {};
}

DF1ListSync.iIOQueue_body.append = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iIOQueue_body.prepend = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iIOQueue_body.pop = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iIOQueue_body.isEmpty = DF1ListSync.Utils.AbstractFunction;

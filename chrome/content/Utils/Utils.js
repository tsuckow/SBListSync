//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.Utils == 'undefined')
{
	DF1ListSync.Utils = {};
}

DF1ListSync.Utils.AbstractFunction =
function()
{
	throw new DF1ListSync.cNotImplementedException("Abstract Function");
};

DF1ListSync.Utils.setTimeout =
function(o, f, time)
{
	//Get any arguments after time
	var args =  Array.prototype.slice.call(arguments,3);
	return setTimeout( function(){ f.apply(o,args); }, time );
}
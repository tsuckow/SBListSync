//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iException == 'undefined')
{
	DF1ListSync.iException = function(){};//Contructor
	DF1ListSync.iException.prototype = new Error();
	DF1ListSync.iException.prototype.construct = function() {};
	DF1ListSync.iException.extend = PolyClass.extend;
}
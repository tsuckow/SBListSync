//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iException == 'undefined')
{
	/*if (typeof DF1ListSync.iException_body != 'undefined')
	{
		DF1ListSync.iException = PolyClass.extend(DF1ListSync.iException_body);
	}*/
	DF1ListSync.iException = function(){ };//Contructor
	DF1ListSync.iException.prototype = new Error();
	DF1ListSync.iException.extend = PolyClass.extend;
}
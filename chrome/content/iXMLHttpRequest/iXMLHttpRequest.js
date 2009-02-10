//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iXMLHttpRequest == 'undefined')
{
	DF1ListSync.iXMLHttpRequest = function(){};//Contructor
	DF1ListSync.iXMLHttpRequest.prototype = new XMLHttpRequest();
	DF1ListSync.iXMLHttpRequest.prototype.construct = function() {};
	DF1ListSync.iXMLHttpRequest.extend = DF1ListSync.cObject.extend;
}
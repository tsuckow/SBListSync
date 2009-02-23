//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cTestAjax_body == 'undefined')
{
	DF1ListSync.cTestAjax_body = {};
}

DF1ListSync.cTestAjax_body.testSend =
function(o, f, id)
{
	var oThis = this;
	var callback = function(s, d){ oThis.testSendCallback(s, d, id, o, f); }
	
	var ajax = new DF1ListSync.cAjax( , );
	
	DF1ListSync.Utils.setTimeout(this, callback, 5000, true, []);
};

DF1ListSync.cTestAjax_body.testSendCallback =
function(success, data, id, obj, func)
{
	DF1ListSync.Utils.build(obj,func)(id, true);
};
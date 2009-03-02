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
	
	var httpRequest = new DF1ListSync.tTestAjax_HttpRequest();
	
	httpRequest.registerAction("GET", "http://example.com/a.php?a=1", true, 404, "BlaBlaBla");
	
	httpRequest.registerAction("GET", "http://example.com/a.php?a=1", true, 200, "ERROR_TEST\nData");
	
	httpRequest.registerAction("GET", "http://example.com/b.php?b=2", true, 200, "OK");
	
	var settings = new DF1ListSync.tTestAjax_Settings();
	
	this.Send_ajax = new DF1ListSync.cAjax(httpRequest, settings);
	
	var url = "http://example.com/a.php?a=1";
	
	this.Send_ajax.open(url, this, callback);
	
	//DF1ListSync.Utils.setTimeout(this, callback, 5000, true, []);
};

DF1ListSync.cTestAjax_body.testSendCallback =
function(success, data, id, obj, func)
{
	this.Send_ajax.destroy();
	DF1ListSync.Utils.build(obj,func)(id, true);
};
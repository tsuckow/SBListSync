//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.tTestAjax_HttpRequest_body == 'undefined')
{
	DF1ListSync.tTestAjax_HttpRequest_body = {};
}

DF1ListSync.tTestAjax_HttpRequest_body.construct =
function()
{
	
};

DF1ListSync.tTestAjax_HttpRequest_body.abort =
function()
{
	this.currentItem = null;
	clearTimeout(this.timeout);
};

DF1ListSync.tTestAjax_HttpRequest_body.open =
function(method, url, async)
{
	this.currentItem = { m: method, u:url, a:async };
};

DF1ListSync.tTestAjax_HttpRequest_body.send =
function(body)
{
	if()
};

DF1ListSync.tTestAjax_HttpRequest_body.currentItem = null;

DF1ListSync.tTestAjax_HttpRequest_body.timeout = null;

DF1ListSync.tTestAjax_HttpRequest_body.onreadystatechange = 

DF1ListSync.tTestAjax_HttpRequest_body.time = 3000;
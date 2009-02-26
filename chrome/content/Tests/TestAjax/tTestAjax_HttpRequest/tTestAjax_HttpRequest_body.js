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
	this.onreadystatechange = function(){};
	this.mockList = new Array();
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
	if(typeof async == "undefined") async = true;
	this.currentItem = { m: method, u:url, a:async };
	
	this.onreadystatechange = function(){};
	this.readyState = 1;
};

DF1ListSync.tTestAjax_HttpRequest_body.send =
function(body)
{
	this.readyState = 4;
	if(currentItem == null) throw new DF1ListSync.cInvalidOperationException("tTestAjax_HttpRequest: Sending but never opened");
	
	var MI = this.mockList[this.mockIndex];
	
	if(
		this.mockIndex >= this.mockList.length ||
		(MI.m != this.currentItem.m && MI.m != null) ||
		(MI.u != this.currentItem.u && MI.u != null) ||
		(MI.a != this.currentItem.a && MI.a != null)
	)
		throw new DF1ListSync.cTestExpectationException("tTestAjax_HttpRequest: Unexpected Request - " + MI.m + " " + this.currentItem.m + " | " + MI.u + " " + this.currentItem.u + " | " + MI.a + " " + this.currentItem.a);
	
	this.status = MI.s;
	this.responseText = MI.t;
	
	this.mockIndex = this.mockIndex + 1;
	
	if(this.currentItem.a)
	{
		DF1ListSync.Utils.setTimeout(this, this.onreadystatechange, 1);
	}
};

DF1ListSync.tTestAjax_HttpRequest_body.registerAction =
function(method, url, async, responseCode, responseText)
{
	this.mockList.push({ m: method, u:url, a:async, s:responseCode, t:responseText });
};

DF1ListSync.tTestAjax_HttpRequest_body.currentItem = null;

DF1ListSync.tTestAjax_HttpRequest_body.readyState = 0;

DF1ListSync.tTestAjax_HttpRequest_body.mockIndex = 0;

DF1ListSync.tTestAjax_HttpRequest_body.status = null;

DF1ListSync.tTestAjax_HttpRequest_body.responseText = null;
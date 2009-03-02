//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.tTestAjax_Settings_body == 'undefined')
{
	DF1ListSync.cSettings_body = {};
}

DF1ListSync.tTestAjax_Settings_body.construct =
function()
{
	this.events = new Array();
};


DF1ListSync.tTestAjax_Settings_body.getUsername =
function()
{
	return this.Username;
};

DF1ListSync.tTestAjax_Settings_body.setUsername =
function(u)
{
	this.Username = u;
};


DF1ListSync.tTestAjax_Settings_body.getPassword =
function()
{
	return this.Password;
};

DF1ListSync.tTestAjax_Settings_body.setPassword =
function(p)
{
	this.Password = p;
};


DF1ListSync.tTestAjax_Settings_body.getAjaxMaxRetries =
function()
{
	return this.AjaxMaxRetries;
};

DF1ListSync.tTestAjax_Settings_body.setAjaxMaxRetries =
function(a)
{
	this.AjaxMaxRetries = a;
};


DF1ListSync.tTestAjax_Settings_body.getAjaxTimeout =
function()
{
	return this.AjaxTimeout;
};

DF1ListSync.tTestAjax_Settings_body.setAjaxTimeout =
function(a)
{
	this.AjaxTimeout = a;
};


DF1ListSync.tTestAjax_Settings_body.getAjaxPeriod =
function()
{
	return this.AjaxPeriod;
};

DF1ListSync.tTestAjax_Settings_body.setAjaxPeriod =
function(a)
{
	this.AjaxPeriod = a;
};



DF1ListSync.tTestAjax_Settings_body.Username = "";
DF1ListSync.tTestAjax_Settings_body.Password = "";
DF1ListSync.tTestAjax_Settings_body.AjaxMaxRetries = 1;
DF1ListSync.tTestAjax_Settings_body.AjaxTimeout = 5000;
DF1ListSync.tTestAjax_Settings_body.AjaxPeriod = 100;
//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.tTestAjax_HttpRequest == 'undefined')
{
	if (typeof DF1ListSync.tTestAjax_HttpRequest == 'undefined')
	{
		DF1ListSync.tTestAjax_HttpRequest = DF1ListSync.iXMLHttpRequest.extend(DF1ListSync.tTestAjax_HttpRequest_body);
	}
}
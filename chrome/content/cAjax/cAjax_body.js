//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cAjax_body == 'undefined')
{
	DF1ListSync.cAjax_body = {};
}

DF1ListSync.cAjax_body.construct =
function(HttpRequest)
{
	//Super
	arguments.callee.$.construct.call(this);
	
	if( !( HttpRequest instanceof XMLHttpRequest ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of XMLHttpRequest");
	}
	
	this.http = HttpRequest;
};
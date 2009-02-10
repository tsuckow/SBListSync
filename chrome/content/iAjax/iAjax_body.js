//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iAjax_body == 'undefined')
{
	DF1ListSync.iAjax_body = {};
}

DF1ListSync.iAjax_body.getUsername =
function()
{
	throw new DF1ListSync.cNotImplementedException("Abstract Function");
};
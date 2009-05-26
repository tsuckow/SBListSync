//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.DialogUtils == 'undefined')
{
	DF1ListSync.DialogUtils = {};
}

DF1ListSync.DialogUtils.getLogger =
function()
{
	if( typeof DF1ListSync.DialogUtils.m_logger == 'undefined' )
	{
		throw new DF1ListSync.cInvalidOperationException("Logger not set");
	}
	
	return DF1ListSync.DialogUtils.m_logger;
}
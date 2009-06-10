//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOCommand_body == 'undefined')
{
	DF1ListSync.iIOCommand_body = {};
}


DF1ListSync.iIOCommand_body.getName = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iIOCommand_body.getUrl = DF1ListSync.Utils.AbstractFunction;

DF1ListSync.iIOCommand_body.handleStatus =
function( status )
{
	var code = DF1ListSync.iIOCommand.ERROR_CODES.GENERAL_ERROR;
	switch( status )
	{
		case "OK":
			code = DF1ListSync.iIOCommand.ERROR_CODES.NO_ERROR;
			break;
		case "ERROR_SESSION":
		case "ERROR_LOGIN":
			code = DF1ListSync.iIOCommand.ERROR_CODES.LOGIN_ERROR;
			break;
		default:
			code = DF1ListSync.iIOCommand.ERROR_CODES.GENERAL_ERROR;
			break;
	}
	
	return code;
};

DF1ListSync.iIOCommand_body.callback = function(){};//Not required
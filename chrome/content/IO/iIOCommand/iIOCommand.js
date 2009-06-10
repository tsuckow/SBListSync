//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iIOCommand == 'undefined')
{
	if (typeof DF1ListSync.iIOCommand_body != 'undefined')
	{
		DF1ListSync.iIOCommand = DF1ListSync.cObject.extend(DF1ListSync.iIOCommand_body);
		
		DF1ListSync.iIOCommand.ERROR_CODES = 
		{//Enum
			NO_ERROR      : {str:"NO_ERROR"},
			AJAX_ERROR    : {str:"AJAX_ERROR"},
			LOGIN_ERROR   : {str:"LOGIN_ERROR"},
			CMD_ERROR     : {str:"CMD_ERROR"},
			GENERAL_ERROR : {str:"GENERAL_ERROR"},
		};
	}
}
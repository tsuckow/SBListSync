//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOCommandGetLists_body == 'undefined')
{
	DF1ListSync.cIOCommandGetLists_body = {};
}

DF1ListSync.cIOCommandGetLists_body.construct =
function( obj, func )
{
	arguments.callee.$.construct.call(this);
	
	this._obj = obj;
	this._func = func;
};

DF1ListSync.cIOCommandGetLists_body.getName =
function()
{
	return "IOCommand: GetLists";
};

DF1ListSync.cIOCommandGetLists_body.getUrl =
function()
{
	return "getLists.php";
}

DF1ListSync.cIOCommandGetLists_body.handleStatus =
function( status )
{
	var code = DF1ListSync.iIOCommand.ERROR_CODES.GENERAL_ERROR;
	switch( status )
	{
		//case "":
		//	code = this.ERROR_CODES.CMD_ERROR;
		//	break;
		default:
			code = arguments.callee.$.handleStatus.call(this,status);
			break;
	}
	
	return code;
};

DF1ListSync.cIOCommandGetLists_body.callback =
function( success, status, data )
{
	var callback = DF1ListSync.Utils.build( this._obj, this._func );

	if( success )
	{
		var status_code = this.handleStatus( status );
		
		callback( status_code );
	}
	else
	{
		callback( this.ERROR_CODES.AJAX_ERROR );
	}
	
	return false;
}
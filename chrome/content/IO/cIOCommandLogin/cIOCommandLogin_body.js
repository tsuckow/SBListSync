//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOCommandLogin_body == 'undefined')
{
	DF1ListSync.cIOCommandLogin_body = {};
}

DF1ListSync.cIOCommandLogin_body.construct =
function( obj, func, user, pass )
{
	arguments.callee.$.construct.call(this);
	
	this._obj = obj;
	this._func = func;
	
	this._helloDone = false;
	this._chall = "";
	this._username = user;
	this._passhash = sha1( pass + "sbLS$4!t" );
};

DF1ListSync.cIOCommandLogin_body.getName =
function()
{
	return "IOCommand: Login";
};

DF1ListSync.cIOCommandLogin_body.getUrl =
function()
{
	if( this._helloDone )
	{
		var passResponce = sha1( this._passhash + this._chall );
	
		var url = "login.php?username=" + encodeURIComponent( this._username ) + "&response=" + encodeURIComponent( passResponce );
		return url;
	}
	else
	{
		return "hello.php";
	}
}

DF1ListSync.cIOCommandLogin_body.handleStatus =
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

DF1ListSync.cIOCommandLogin_body.callback =
function( success, status, data )
{
	var callback = DF1ListSync.Utils.build( this._obj, this._func );

	if( success )
	{
		var status_code = this.handleStatus( status );
		
		if( this._helloDone )
		{
			callback( status_code );
		}
		else
		{
			this._helloDone = true;
			this._chall = data;
			return true;//We ain't done yet.
		}
	}
	else
	{
		callback( this.ERROR_CODES.AJAX_ERROR );
	}
	
	return false;
}
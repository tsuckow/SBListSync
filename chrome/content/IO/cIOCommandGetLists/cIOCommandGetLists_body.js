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

DF1ListSync.cIOCommandGetLists_body.callback =
function(success, data)
{

	var callback = DF1ListSync.Utils.build( this._obj, this._func );

	if(success)
	{
		var lines = data.split("\n");
			
		if( lines[0] == "OK" )
		{
			callback( true );
		}
		else
		{
			callback( false );
		}
	}
	else
	{
		callback( false );
	}
}
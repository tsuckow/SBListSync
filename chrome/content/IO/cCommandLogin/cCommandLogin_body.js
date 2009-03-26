//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cCommandLogin_body == 'undefined')
{
	DF1ListSync.cCommandLogin_body = {};
}

DF1ListSync.cCommandLogin_body.construct =
function(invoker, factory, ajax, chall)
{
	if( !( invoker instanceof DF1ListSync.iIOInvoker ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOInvoker");
	}
	
	if( !( factory instanceof DF1ListSync.iIOCommandExecuteFactory ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iIOCommandExecuteFactory");
	}
	
	if( !( ajax instanceof DF1ListSync.iAjax ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iAjax");
	}
	
	this.invoker = invoker;
	this.factory = factory;
	this.ajax = ajax;
	this.chall = chall;
};

DF1ListSync.cCommandLogin_body.getName =
function()
{
	return "IOCommand: Hello"
};

DF1ListSync.cCommandLogin_body.execute =
function()
{
	var username = "";
	var passhash = "";

	var passResponce = sha1( passhash + this.chall );

	var url = "login.php?username=" + encodeURIComponent( username ) + "&response=" + encodeURIComponent( passResponce );
	
	this.ajax.open( url , this.invoker, this.invoker.callback);
	
	return true;
}

DF1ListSync.cCommandLogin_body.callback =
function(success, data)
{
	if(success)
	{
	
		var lines = data.split("\n");
						
		if( lines[0] == "OK" )
		{
			//var call = item[2];
			
			this.invoker.pop();
			
			//if( call !== undefined )
			//{
			//	call(true);
			//}
		}
		else if( lines[0] == "ERROR_BADLOGIN" )
		{
			//var call = item[2];
			
			this.invoker.pop();
			
			//if( call !== undefined )
			//{
				call(false);
			//}
		}
		else
		{
			//this.invoker.pop();
			
			//Redo
			//this.login( item[2] );
			
			//WAIT! before retry
			this.factory.addWait();
			
		}
	}
	else
	{
		this.factory.addWait();
	}
}
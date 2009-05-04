//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cCommandHello_body == 'undefined')
{
	DF1ListSync.cCommandHello_body = {};
}

DF1ListSync.cCommandHello_body.construct =
function(invoker, factory, ajax, obj, func)
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
	this.obj = obj;
	this.func = func;
};

DF1ListSync.cCommandHello_body.getName =
function()
{
	return "IOCommand: Hello";
};

DF1ListSync.cCommandHello_body.execute =
function()
{
	this.ajax.open("hello.php", this.invoker, this.invoker.callback);
	
	return true;
}

DF1ListSync.cCommandHello_body.callback =
function(success, data)
{
	if(success)
	{
		var lines = data.split("\n");
						
		if( lines[0] == "OK" )
		{
			var chall = lines[1];
			
			this.invoker.pop();
		
			this.factory.addLogin(this.chall, this.obj, this.func);
		}
		else
		{
			this.factory.addWait();
		}
	}
	else
	{
		this.factory.addWait();
	}
}
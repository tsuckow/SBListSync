//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOManager_body == 'undefined')
{
	DF1ListSync.cIOManager_body = {};
}

DF1ListSync.cIOManager_body.construct =
function( queue, factory )
{

	this._queue = queue;
	this._factory = factory;
	this._commands =
	[
		{ sid: "getLists", callbacks: new Array(), factory: factory.newGetLists },
	];
	this._pending = new Array();
	this._currentLogin = {user: "", pass: ""};
	this._callbackNuke = false;
};

DF1ListSync.cIOManager_body.request =
function( command )
{
	if( command != "" )
	{
		for(var i = 0; i < this._commands.length; ++i )
		{
			var item = this._commands[i];
			if( item.sid === command )
			{			
				//
				var theCommand = DF1ListSync.Utils.build( this._factory, item.factory )( this, this.callback );
				//
				
				this.enqueueCommand( theCommand );
				
				return;
			}
		}
	}
	
	throw new DF1ListSync.cException("No Such Command");
};

DF1ListSync.cIOManager_body.newLogin =
function( user, pass )
{
	this._currentLogin.user = user;
	this._currentLogin.pass = pass;
	
	if( this._pending.length > 0 )
		this._callbackNuke = true;
};

DF1ListSync.cIOManager_body.enqueueCommand =
function( command )
{
	this._pending.push( { cmd: command } );
	
	if( this._pending.length === 1 )
	{
		this.pushCommand();
	}
};

DF1ListSync.cIOManager_body.pushCommand =
function()
{
	if( this._pending.length > 0 )
	{
		this._queue.append( this._pending[0].cmd );
	}
};

DF1ListSync.cIOManager_body.callback =
function( status_code )
{
	if( this._callbackNuke )
	{
		this._pending = new Array();
		this._callbackNuke = false;
		return;
	}
	
	var item = this._pending.shift();
	
	if( status_code == DF1ListSync.iIOCommand.ERROR_CODES.NO_ERROR )
	{
		alert("GOOD");
	}
	else if( status_code == DF1ListSync.iIOCommand.ERROR_CODES.LOGIN_ERROR )
	{
		//Log Login error
		var logincmd = this._factory.newLogin(this, this.callback, this._currentLogin.user, this._currentLogin.pass );
		this._pending.unshift( item ); //Put it Back
		this._pending.unshift( {cmd:logincmd} );
		//FIXME: On Login Error, This is an infinite loop. Remove everything?
	}
	else if( status_code == DF1ListSync.iIOCommand.ERROR_CODES.AJAX_ERROR )
	{
		//Log Ajax Error
		this._pending.unshift( item ); //Put it Back
		DF1ListSync.Utils.setTimeout( this, this.pushCommand, 5000 + DF1ListSync.Utils.rand( 25000 ) );//Delay
		return;
	}
	else
	{
		//Log Unrecoverable Error
	}
	
	this.pushCommand();
}

DF1ListSync.cIOManager_body.addListener =
function( command, obj, func )
{
	if( command != "" )
	{
		for(var i = 0; i < this._commands.length; ++i )
		{
			var item = this._commands[i];
			if( item.sid === command )
			{
				item.callbacks.push( {o: obj, f: func} );
				
				return;
			}
		}
	}
	
	throw new DF1ListSync.cException("No Such Listener");
};

DF1ListSync.cIOManager_body.removeListener =
function( command, obj, func )
{
	if( command != "" )
	{
		//Finc Command
		for(var i = 0; i < this._commands.length; ++i )
		{
			var item = this._commands[i];
			if( item.sid === command )
			{
				var cba = item.callbacks;
				
				//Find Callback to remove
				for( var j = 0; j < cba.length; ++j )
				{
					var cb = cba[j];
					
					if( cb.o === obj && cb.f === func )
					{
						cba.splice( j, 1 );
						return;
					}
				}
			}
		}
	}
	
	throw new DF1ListSync.cException("Not Found");
};

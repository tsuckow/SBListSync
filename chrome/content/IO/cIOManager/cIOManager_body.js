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
			
				for( var j = 0; j < this._pending.length; ++j )
				{
					if( i === this._pending[j].id )
					{
						return;
					}
				}
			
				//
				var theCommand = DF1ListSync.Utils.build( this._factory, item.factory )( this, function( success ){ this.callback( i, success ) } );
				//
				
				
				
				this._pending.unshift( {id: i} );
				this._queue.append( theCommand );
				
				return;
			}
		}
	}
	
	throw new DF1ListSync.cException("No Such Command");
};

DF1ListSync.cIOManager_body.callback =
function( id, success )
{
	alert("MgrCallback " + id + " " + success);
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

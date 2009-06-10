//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cIOPump_body == 'undefined')
{
	DF1ListSync.cIOPump_body = {};
}

DF1ListSync.cIOPump_body.construct =
function( ajax, queue )
{
	this._ajax = ajax;
	this._queue = queue;
	this._current = null;
	this._timer = null;
};

DF1ListSync.cIOPump_body.process =
function()
{
	this.start();
	
	if( this._current === null && !this._queue.isEmpty() ) 
	{
		this._current = this._queue.pop();
		
		this.doAjax();
	}
};

DF1ListSync.cIOPump_body.doAjax =
function()
{
	this._ajax.open( "http://sblistsync.novahost.org/Sync/" + this._current.getUrl(), this, this.callback );
};

DF1ListSync.cIOPump_body.callback =
function( success, result )
{
	var index = result.indexOf( "\n" );
	var status = "";
	var data = result;
	
	if( index != -1 )
	{
		status = result.substr( 0, index );
		data = result.substr( index + 1 );
	}
	
	var keep = this._current.callback( success, status, data );
	if( keep === true )
	{
		this.doAjax();
	}
	else
	{
		this._current = null;
	}
};

DF1ListSync.cIOPump_body.start =
function()
{
	this.stop();
	this._timer = DF1ListSync.Utils.setTimeout( this, this.process, 100 );
};

DF1ListSync.cIOPump_body.stop =
function()
{
	clearTimeout( this._timer );
	this._timer = null;
};

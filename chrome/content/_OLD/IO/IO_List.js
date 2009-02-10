// Make a namespace.
if (typeof Df1_listsync == 'undefined')
{
  var Df1_listsync = {};
}

// Make a namespace.
if (typeof Df1_listsync.IO == 'undefined')
{
  Df1_listsync.IO = {};
}

Df1_listsync.IO.ListGet_PHandler =
function(item)
{
	/*
	DATA FORMAT:
	listID
	*/
	var list = item[1][0];
	
	Df1_listsync.StatusHandler.setText("Retrieving List: " + list);
	
	this.ajaxSend( "listGet.php?id=" + encodeURIComponent( list ) );
};

Df1_listsync.IO.ListGet_CHandler =
function(item, data)
{
	var oThis = this;

	var lines = data.split("\n");
	
	var data = lines.slice(1);
					
	if( lines[0] == "OK" )
	{
		Df1_listsync.StatusHandler.setText( "List Recieved" );
		
		var call = item[2];
		
		this.queue.shift();//Delete Item
		
		if( call !== undefined )
		{
			call(true,data);
		}
	}
	else if( lines[0] == "ERROR_LOGIN" || lines[0] == "ERROR_SESSION" )
	{
		Df1_listsync.StatusHandler.setText( "Not Logged In" );
		
		this.login( function(success){ oThis.reLoginCallback(success); } );
		
		var call = item[2];
		
		if( call !== undefined )
		{
			call(false,data);
		}
	}
	else
	{
		Df1_listsync.StatusHandler.setText( "Unknown Error" );
		
		//RETRY
		
		//WAIT! before retry
		this.addWait();
		
	}
};

Df1_listsync.IO.ListHash_PHandler =
function(item)
{
	/*
	DATA FORMAT:
	listID
	*/
	var list = item[1][0];
	
	Df1_listsync.StatusHandler.setText("Retrieving List Hash: " + list);
	
	this.ajaxSend( "listHash.php?list=" + encodeURIComponent( list ) );
};

Df1_listsync.IO.ListHash_CHandler =
function(item, data)
{
	var oThis = this;

	var lines = data.split("\n");
	var data = lines[1];
					
	if( lines[0] == "OK" )
	{
		Df1_listsync.StatusHandler.setText( "List Hash Recieved" );
		
		var call = item[2];
		
		this.queue.shift();//Delete Item
		
		if( call !== undefined )
		{
			call(true,data);
		}
	}
	else if( lines[0] == "ERROR_LOGIN" || lines[0] == "ERROR_SESSION" )
	{
		Df1_listsync.StatusHandler.setText( "Not Logged In" );
		
		this.login( function(success){ oThis.reLoginCallback(success); } );
		
		var call = item[2];
		
		if( call !== undefined )
		{
			call(false,data);
		}
	}
	else
	{
		Df1_listsync.StatusHandler.setText( "Unknown Error" );
		
		//RETRY
		
		//WAIT! before retry
		this.addWait();
		
	}
};
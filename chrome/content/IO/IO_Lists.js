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

Df1_listsync.IO.getLists_PHandler =
function(item)
{
	Df1_listsync.StatusHandler.setText("Retrieving Lists");
	
	this.ajaxSend( "getLists.php" );
};

Df1_listsync.IO.getLists_CHandler =
function(item, data)
{
	var oThis = this;

	var lines = data.split("\n");
	var data = lines.slice(1);
					
	if( lines[0] == "OK" )
	{
		Df1_listsync.StatusHandler.setText( "Lists Recieved" );
		
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
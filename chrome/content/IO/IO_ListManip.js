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

Df1_listsync.IO.ListManip_PHandler =
function(item)
{
	/*
	DATA FORMAT:
	listID, checksum,op, file
	*/
	var list = item[1][0];
	var check = item[1][1];
	var op = item[1][2];
	var file = item[1][3];
	
	Df1_listsync.StatusHandler.setText("Manipulating List: " + list);
	
	if(op == Df1_listsync.IOmanipOps.ADD)
	{
		this.ajaxSend( "listAddItem.php?id=" + encodeURIComponent( list ) + "&hash=" + encodeURIComponent( check ) + "&item=" + encodeURIComponent( file ) );
	}
	else if(op == Df1_listsync.IOmanipOps.REMOVE)
	{
		this.ajaxSend( "listRemoveItem.php?id=" + encodeURIComponent( list ) + "&hash=" + encodeURIComponent( check ) + "&item=" + encodeURIComponent( file ) );
	}
	else
	{
		Df1_listsync.StatusHandler.setText("Unknown List Manipulation");
	}
};

Df1_listsync.IO.ListManip_CHandler =
function(item, data)
{
	var oThis = this;

	var lines = data.split("\n");
	var data = lines.slice(1);
					
	if( lines[0] == "OK" )
	{
		Df1_listsync.StatusHandler.setText( "List Modified" );
		
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
	else if( lines[0] == "ERROR_BADHASH" )
	{
		Df1_listsync.StatusHandler.setText( "Out of Sync with server." );
		
		var call = item[2];
		
		this.queue.shift();//Delete Item
		
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
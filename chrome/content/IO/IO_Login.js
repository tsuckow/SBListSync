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

Df1_listsync.IO.LoginSet_PHandler =
function(item)
{
	/*
	DATA FORMAT:
	username, passhash
	*/
	
	Df1_listsync.StatusHandler.setText("Setting Login.");
	
	this.username = item[1][0];
	this.passhash = item[1][1];
	
	this.queue.shift();//Delete Item.
	
	this.queue.unshift(
		[
			Df1_listsync.IOops.LOGIN_HELLO,
			[],
			item[2]
		]
	);
};

Df1_listsync.IO.Logout_PHandler =
function(item)
{
	Df1_listsync.StatusHandler.setText("Logout.");
	
	this.loggedIn = false;
	
	this.ajaxSend("hello.php");
};

Df1_listsync.IO.LoginHello_PHandler =
function(item)
{
	Df1_listsync.StatusHandler.setText("Doing Hello.");
	
	this.loggedIn = false;
	
	if(this.username == "")
	{
		var call = item[2];
		
		this.queue.shift();//Delete Item
		
		if( call !== undefined )
		{
			call(false);
		}
		
		return;
	}
	
	this.ajaxSend("hello.php");
};

Df1_listsync.IO.LoginHello_CHandler =
function(item, data)
{
	var lines = data.split("\n");
					
	if( lines[0] == "OK" )
	{
		var chall = lines[1];
		
		this.queue.shift();//Delete Item
		
		this.queue.unshift(
			[
				Df1_listsync.IOops.LOGIN_DO,
				[chall],
				item[2]
			]
		);
	}
	else
	{
		//WAIT! before retry
		this.queue.unshift(
			[
				Df1_listsync.IOops.WAIT,
				[new Date().getTime() + this.IOERROR_WAITTIME],
				undefined
			]
		);
	}
};

Df1_listsync.IO.LoginDo_PHandler =
function(item)
{
	/*
	DATA FORMAT:
	chall
	*/
	
	var chall = item[1][0];
	
	Df1_listsync.StatusHandler.setText("Doing Login. " + chall);
	
	var passResponce = sha1( this.passhash + chall );
	
	this.ajaxSend( "login.php?username=" + encodeURIComponent( this.username ) + "&response=" + encodeURIComponent( passResponce ) );
};

Df1_listsync.IO.LoginDo_CHandler =
function(item, data)
{
	var lines = data.split("\n");
					
	if( lines[0] == "OK" )
	{
		Df1_listsync.StatusHandler.setText( "Login Success" );
		
		this.loggedIn = true;
		
		var call = item[2];
		
		this.queue.shift();//Delete Item
		
		if( call !== undefined )
		{
			call(true);
		}
	}
	else if( lines[0] == "ERROR_BADLOGIN" )
	{
		Df1_listsync.StatusHandler.setText( "Login Failed" );
		
		var call = item[2];
		
		this.queue.shift();//Delete Item
		
		if( call !== undefined )
		{
			call(false);
		}
	}
	else
	{
		Df1_listsync.StatusHandler.setText( "Login Error: " + lines[0] );
		
		this.queue.shift();//Delete Item
		
		//Redo
		this.login( item[2] );
		
		//WAIT! before retry
		this.addWait();
		
	}
};

/**
Callback to solve the problem of perorming an operation on a bad login.
If the login is bad, the operation is discarded. 
*/
Df1_listsync.IO.reLoginCallback =
function(good)
{
	if( !good )
	{
		//Login Failed. Discard Operation.
		this.queue.shift();//Delete Item
	}
};
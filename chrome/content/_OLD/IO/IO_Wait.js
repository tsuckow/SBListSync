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

Df1_listsync.IO.Wait_PHandler =
function(item)
{
	/*
	DATA FORMAT:
	end time
	*/
	
	var now = new Date().getTime();
	
	if( now > item[1][0] )
	{
		this.queue.shift();//Delete Item. (Cancel Wait)
		Df1_listsync.StatusHandler.setText( "Waiting Done" );
	}
	else
	{
		var displayTime = (item[1][0] - now);
		displayTime = Math.ceil(displayTime/100) / 10;
		Df1_listsync.StatusHandler.setText("Waiting " + displayTime.toFixed(1) );
	}
};
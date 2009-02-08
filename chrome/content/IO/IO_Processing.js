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

/*
QUEUE FORMAT:
Type, Data[], Callback
*/

Df1_listsync.IO.process = function()
{
	var oThis = this;
	
	if( !this.busy && (this.queue.length > 0) )
	{
		var item = this.queue[0]; //Next Item, Peek dont pop
		
		if( item[0] == Df1_listsync.IOops.LOGIN_SET )
		{
			this.LoginSet_PHandler(item);
		}
		else if( item[0] == Df1_listsync.IOops.LOGOUT )
		{
			this.Logout_PHandler(item);
		}
		else if( item[0] == Df1_listsync.IOops.LOGIN_HELLO )
		{
			this.LoginHello_PHandler(item);
		}
		else if( item[0] == Df1_listsync.IOops.LOGIN_DO )
		{
			this.LoginDo_PHandler(item);
		}
		else if( item[0] == Df1_listsync.IOops.LIST_GET )
		{
			this.ListGet_PHandler(item);
		}
		else if( item[0] == Df1_listsync.IOops.LIST_HASH )
		{
			this.ListHash_PHandler(item);
		}
		else if( item[0] == Df1_listsync.IOops.LIST_MANIP )
		{
			this.ListManip_PHandler(item);
		}
		else if( item[0] == Df1_listsync.IOops.LISTS_GET )
		{
			this.getLists_PHandler(item);
		}
		else if( item[0] == Df1_listsync.IOops.GET_INFO )
		{
			this.listInfo_PHandler(item);
		}
		else if( item[0] == Df1_listsync.IOops.WAIT )
		{
			this.Wait_PHandler(item);
		}
		else
		{//WTF
			Df1_listsync.StatusHandler.setText( "Unknown Command: " + item[0] );
			this.queue.shift();//Delete Item.
		}
	}
	
	//Do it all again
	this.timer = setTimeout(function(){ oThis.process(); },100);
};
	
Df1_listsync.IO.handleCallback = function(success,data)
	{
		var oThis = this;
		
		if( (this.queue.length > 0) )
		{
			if(success)
			{
				var item = this.queue[0]; //Next Item, Peek dont pop
				
				if( item[0] == Df1_listsync.IOops.LOGIN_HELLO )
				{
					this.LoginHello_CHandler(item, data);
				}
				else if( item[0] == Df1_listsync.IOops.LOGIN_DO )
				{
					this.LoginDo_CHandler(item, data);
				}
				else if( item[0] == Df1_listsync.IOops.LIST_GET )
				{
					this.ListGet_CHandler(item, data);
				}
				else if( item[0] == Df1_listsync.IOops.LIST_HASH )
				{
					this.ListHash_CHandler(item, data);
				}
				else if( item[0] == Df1_listsync.IOops.LIST_MANIP )
				{
					this.ListManip_CHandler(item, data);
				}
				else if( item[0] == Df1_listsync.IOops.LISTS_GET )
				{
					this.getLists_CHandler(item, data);
				}
				else if( item[0] == Df1_listsync.IOops.GET_INFO )
				{
					this.listInfo_CHandler(item, data);
				}
				else
				{
					//Item does not have CHandler
					this.queue.shift();//Delete Item.
				}
			}
			else
			{//Failed
				//WAIT! before retry
				this.addWait();
			}
		}
		
		this.busy = false;
	};

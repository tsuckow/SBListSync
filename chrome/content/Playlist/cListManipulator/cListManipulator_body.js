//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cListManipulator_body == 'undefined')
{
	DF1ListSync.cListManipulator_body = {};
}

DF1ListSync.cListManipulator_body.construct = 
function( localListID, db )
{
	if(	!( db instanceof DF1ListSync.iDB ) )
	{
		throw new DF1ListSync.cInvalidParameterException("Not an instance of iDB");
	}
	
	this._localListID = localListID;
	this._db = db;
};

DF1ListSync.cListManipulator_body.add = 
function( url )
{
	var ListData = _db.getList( this._localListID; );
	
	if( ListData == undefined || ListData == "" )
	{
		ListData = url;
	}
	else
	{
		ListData = ListData + "\n" + url;
	}
	
	_db.setList( this._localListID, ListData );
};

DF1ListSync.cListManipulator_body.remove = 
function( url )
{
	var Items = this.getList();
	
	//Remove Entry
	Items.splice( Items.indexOf( url ), 1 );
	
	//Commit
	var newLocalList = Items.join("\n");
	_db.setList( this._localListID, newLocalList );
};

DF1ListSync.cListManipulator_body.getList = 
function()
{
	var ListData = _db.getList( this._localListID );
		
	//Split data into array
	if( ListData == undefined || ListData == "" )
	{
		return new Array();
	}
	else
	{
		return ListData.split("\n");
	}
};

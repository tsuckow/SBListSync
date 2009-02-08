// Make a namespace.
if (typeof Df1_listsync == 'undefined')
{
  var Df1_listsync = {};
}

// Make a namespace.
if (typeof Df1_listsync.DB == 'undefined')
{
	Df1_listsync.DB = {};
}

Df1_listsync.DB.init =
function()
{
	// Setup our database
	this._db = Cc["@songbirdnest.com/Songbird/DatabaseQuery;1"]
			.createInstance(Ci.sbIDatabaseQuery);
	var ios = Cc["@mozilla.org/network/io-service;1"]
			.createInstance(Ci.nsIIOService);
	var dbdir = Cc["@mozilla.org/file/directory_service;1"]
			.createInstance(Ci.nsIProperties).get("ProfD", Ci.nsIFile);
	this.concertDbURI = ios.newFileURI(dbdir);
	this._db.databaseLocation = this.concertDbURI;
	this._db.setDatabaseGUID("df1_listsync");
	this._db.setAsyncQuery(false);
	this._db.resetQuery();
	
	//TABLE 
	this._db.addQuery("CREATE TABLE IF NOT EXISTS lists( listID INTEGER, localList TEXT, data TEXT)");
				
	this._db.addQuery("CREATE UNIQUE INDEX IF NOT EXISTS uniqueID ON lists (listID)");
	//this._db.addQuery("CREATE UNIQUE INDEX IF NOT EXISTS uniqueLocal ON lists (localList)");
	this._db.addQuery("DROP INDEX IF EXISTS uniqueLocal");
	
	this._db.addQuery("CREATE TEMP TABLE IF NOT EXISTS remoteLists( listID INTEGER, data TEXT, time INTEGER)");
	
	this._db.addQuery("CREATE UNIQUE INDEX IF NOT EXISTS uniqueID ON remoteLists (listID)");
	this._db.execute();
	this._db.resetQuery();
	
};

Df1_listsync.DB.getLists =
function()
{
	this._db.resetQuery();
	this._db.addQuery("SELECT listID, localList FROM lists");
	var ret = this._db.execute();
	if (ret == 0)
	{
		var result = this._db.getResultObject();
		var ret = new Array();
		
		for( i = 0 ; i < result.getRowCount(); i++ )
		{
			var id = result.getRowCellByColumn(i, "listID");
			var name = result.getRowCellByColumn(i, "localList");
			ret.push({"remote": id, "local": name});
		}
		
		return ret;
	}
	else
	{
		return new Array();
	}
	
};

/**
Returns the remote list contents.

@param id Remote List ID #
*/
Df1_listsync.DB.getRemoteList =
function( id )
{
	this._db.resetQuery();
	this._db.addQuery("SELECT data, time FROM remoteLists WHERE listID = '" + id + "'");
	var ret = this._db.execute();
	if (ret == 0)
	{
		var result = this._db.getResultObject();
		if(result.getRowCount() == 1)
		{
			var d = new Date();
			var timeN= d.getTime();
			var time = result.getRowCellByColumn(0, "time");
			if( (timeN - time) < 60*1000 )
			{
				return result.getRowCellByColumn(0, "data");
			}
			else
			{
				return undefined;
			}
		}
		else
		{
			return undefined;
		}
	}
	else
	{
		return undefined;
	}
	
};

Df1_listsync.DB.setRemoteList =
function( id, data )
{
	var list = "" + data;
	list = list.replace(/'/g, "''");
	
	var d = new Date();
	var time = d.getTime();

	this._db.resetQuery();
	this._db.addQuery("INSERT OR REPLACE INTO remoteLists (listID, data, time) VALUES ('" + id + "','" + list + "','" + time + "')");
	this._db.execute();
};

/**
Removes a synced list from database. (Aka. Stops syncing it.)
*/
Df1_listsync.DB.removeList =
function( id )
{
	this._db.resetQuery();
	this._db.addQuery("DELETE FROM lists WHERE listID='" + id + "'");
	this._db.execute();
};


Df1_listsync.DB.addList =
function(listID, localList)
{
	var list = "" + localList;
	list = list.replace(/'/g, "''");
	this._db.resetQuery();
	this._db.addQuery("INSERT INTO lists (listID, localList) VALUES ('" + listID + "', '" + list + "') ");
	this._db.execute();
};

/**
Returns the local list contents.

@param id Remote List ID #
*/
Df1_listsync.DB.getList =
function( id )
{
	this._db.resetQuery();
	this._db.addQuery("SELECT data FROM lists WHERE listID = '" + id + "'");
	var ret = this._db.execute();
	if (ret == 0)
	{
		var result = this._db.getResultObject();
		
		if(result.getRowCount() == 1)
		{
			return result.getRowCellByColumn(0, "data");
		}
		else
		{
			return undefined;
		}
	}
	else
	{
		return undefined;
	}
	
};

/**
Returns the local list URL.

@param id Remote List ID #
*/
Df1_listsync.DB.getListURL =
function( id )
{
	this._db.resetQuery();
	this._db.addQuery("SELECT localList FROM lists WHERE listID = '" + id + "'");
	var ret = this._db.execute();
	if (ret == 0)
	{
		var result = this._db.getResultObject();
		
		return result.getRowCellByColumn(0, "localList");
	}
	else
	{
		return null;
	}
	
};

Df1_listsync.DB.setList =
function( id, data )
{
	this._db.resetQuery();
	this._db.addQuery("UPDATE lists SET data = '" + data.replace(/'/g, "''") + "' WHERE listID = '" + id + "'");
	this._db.execute();
};
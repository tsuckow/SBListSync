//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cDB_body == 'undefined')
{
	DF1ListSync.cDB_body = {};
}

DF1ListSync.cDB_body.construct = 
function( dbGUID )
{
	// Setup our database
	this._db = Cc["@songbirdnest.com/Songbird/DatabaseQuery;1"]
			.createInstance(Ci.sbIDatabaseQuery);
	var ios = Cc["@mozilla.org/network/io-service;1"]
			.createInstance(Ci.nsIIOService);
	var dbdir = Cc["@mozilla.org/file/directory_service;1"]
			.createInstance(Ci.nsIProperties).get("ProfD", Ci.nsIFile);
	this._db.databaseLocation = ios.newFileURI(dbdir);
	this._db.setDatabaseGUID( dbGUID );
	this._db.setAsyncQuery(false);
	this._db.resetQuery();
	
	//TABLE 
	this._db.addQuery("CREATE TABLE IF NOT EXISTS lists( listID INTEGER, localList TEXT, data TEXT)");
				
	this._db.addQuery("CREATE UNIQUE INDEX IF NOT EXISTS uniqueID ON lists (listID)");

	this._db.addQuery("CREATE TEMP TABLE IF NOT EXISTS remoteLists( listID INTEGER, data TEXT, time INTEGER)");
	
	this._db.addQuery("CREATE UNIQUE INDEX IF NOT EXISTS uniqueID ON remoteLists (listID)");
	
	this._db.execute();
	this._db.resetQuery();
};
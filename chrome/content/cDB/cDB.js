//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cDB == 'undefined')
{
	if (typeof DF1ListSync.cDB_body != 'undefined')
	{
		DF1ListSync.cDB = DF1ListSync.iDB.extend(DF1ListSync.cDB_body);
	}
}
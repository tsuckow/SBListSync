//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iDB == 'undefined')
{
	if (typeof DF1ListSync.iDB_body != 'undefined')
	{
		DF1ListSync.iDB = DF1ListSync.cObject.extend(DF1ListSync.iDB_body);
	}
}
//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.iUnitTest == 'undefined')
{
	if (typeof DF1ListSync.iUnitTest == 'undefined')
	{
		DF1ListSync.iUnitTest = DF1ListSync.cObject.extend(DF1ListSync.iUnitTest_body);
	}
}
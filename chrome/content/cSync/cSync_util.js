//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cSync_body == 'undefined')
{
	DF1ListSync.cSync_body = {};
}

Df1_listsync.cSync_body.uniqueArrayMerge =
function(ar1, ar2)
{
	var newlist = ar1.slice();
	for( var i = 0; i < ar2.length; i=i+1 )
	{
		var found = false;
		for( var j = 0; j < newlist.length; j=j+1 )
		{
			if( ar2[i] == newlist[j] )
			{
				found = true;
				break;
			}
		}
		if(!found)
		{
			newlist.push( ar2[i] );
		}
	}
	return newlist;
};
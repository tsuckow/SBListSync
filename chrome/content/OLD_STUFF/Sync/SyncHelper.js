// Make a namespace.
if (typeof Df1_listsync == 'undefined')
{
  var Df1_listsync = {};
}

// Make a namespace.
if (typeof Df1_listsync.Sync == 'undefined')
{
	Df1_listsync.Sync = {};
}

Df1_listsync.Sync.ListEnumerator =
{
	onEnumerationBegin: function(aMediaList)
	{
		this.list = new Array();
	},
	
	onEnumeratedItem: function(aMediaList, aMediaItem)
	{
		this.list.push( aMediaItem.getProperty(SBProperties.contentURL) );
	},  

	onEnumerationEnd: function(aMediaList, aStatusCode)
	{},
	
	getList: function()
	{
		return this.list;
	},
};

Df1_listsync.Sync.uniqueArrayMerge =
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
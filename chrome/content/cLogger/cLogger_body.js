//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cLogger_body == 'undefined')
{
	DF1ListSync.cLogger_body = {};
}

DF1ListSync.cLogger_body.type = 
{
Generic: 0,
Warning: 1,
Error: 2,
}

DF1ListSync.cLogger_body.construct =
function()
{
	this.data = new Array();
};

DF1ListSync.cLogger_body.logGeneric =
function(brief, extended)
{
	this.data.push({type:this.type.Generic,sm:brief,lg:extended});
};

DF1ListSync.cLogger_body.getLogs =
function(level)
{
	var filtered = new Array();
	
	for(var i = 0; i < this.data.length; ++i)
	{
		if( this.data[i].type >= level )
		{
			filtered.push( this.data[i] );
		}
	}

	return filtered;
};
var testRunner = null;

var load =
function()
{
	testRunner = new DF1ListSync.cUnitRunner(this, add, callback );
};

var run =
function()
{
	document.getElementById("tests").buttons="accept";
	testRunner.init();
};

var add =
function(name)
{
	append(name);
	sizeToContent();
};

var callback =
function(id, s, m)
{
	replace(id, s);
};

var append =
function(name)
{
	var list = document.getElementById("List");
	var item = list.appendItem(name,name);
	
	var cell = document.createElement('listcell');
	cell.setAttribute('label', "Pending..." );
	//cell.setAttribute('value', "ii" );
	item.appendChild( cell );
	
};

var replace =
function(id, success)
{
	var list = document.getElementById("List");
	
	var name = list.getItemAtIndex( id ).value;
	list.removeItemAt( id );
	
	var item = list.insertItemAt(id,name,name);
	
	var cell = document.createElement('listcell');
	if(success)
	{
		cell.setAttribute('label', "Passed" );
		cell.setAttribute('class', "Rgood" );
	}
	else
	{
		cell.setAttribute('label', "Failed" );
		cell.setAttribute('class', "Rbad" );
	}
	item.appendChild( cell );
	
	list.ensureElementIsVisible( item );
};
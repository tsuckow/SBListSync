// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

// Make a namespace.
if (typeof Df1_listsync.Options == 'undefined')
{
  Df1_listsync.Options = {};
}

Df1_listsync.Options.clearList =
function(list)
{
	while(list.itemCount > 0)
	{
		list.removeItemAt(0);
	}
}

Df1_listsync.Options.getSelection =
function(list)
{
	if(list.selectedItem == null) return null;
	return list.selectedItem.getAttribute("value");
}

Df1_listsync.Options.setSelection =
function(list, id)
{
	if(id != null)
	{
		var num = list.itemCount;
		for(var i = 0; i < num; i++)
		{
			if( id == list.getItemAtIndex(i).getAttribute("value") )
			{
				list.selectItem( list.getItemAtIndex(i) );
				break;
			}
		}
	}
}

Df1_listsync.Options.removeNumber =
function(list, number)
{
	var num = list.itemCount;
	for(var i = 0; i < num; i++)
	{
		if( (""+number) == list.getItemAtIndex(i).value )
		{
			list.removeItemAt(i);
			break;
		}
	}
};
	
Df1_listsync.Options.insertSorted =
function(list, enabled, error, number, remotename, localname)
{
	this.removeNumber(list, number);
	var num = list.itemCount;
	var i = 0;
	for(i = 0; i < num; i++)
	{
		if( (""+remotename) < list.getItemAtIndex(i).getAttribute("sort") )
			break;
	}
	var elem = list.insertItemAt( i, "DeleteMe", ""+number );
	this.makeListItem(elem, enabled, error, number, remotename, localname);
};
	
Df1_listsync.Options.makeListItem =
function(item, enabled, error, number, remotename, localname)
{
	/*
	<richlistitem style="height:48px; margin:0px; padding:0px;">
		<vbox flex="1">
			<hbox flex="1">
				<html:object xmlns:html="http://www.w3.org/1999/xhtml" type="image/svg+xml" data="chrome://df1_listsync/skin/list_enabled.svg" style="width:48px;height:48px;margin:0px;padding:0px;border:0px;">
					Image Error.
				</html:object>
				<vbox flex="1">
					<grid style="margin-left:5px;">
						
						<columns>
							<column flex="0"/>
							<column flex="3"/>
						</columns>
						
						<rows>
							<row>
								<label value="Remote: " style="margin:0px; padding:0px;" />
								<label value="(12344) TJ's Fav's" style="margin:0px; padding:0px;" />
							</row>
							<row>
								<label value="Local: " style="margin:0px; padding:0px;" />
								<label value="Favorites" style="margin:0px; padding:0px;" />
							</row>
						</rows>
					</grid>
					<hbox pack="end">
						<image src="chrome://df1_listsync/skin/busy.png" tooltiptext="TEst" />
					</hbox>
				</vbox>
			</hbox>
		</vbox>
	</richlistitem>
	*/
	
	item.style.height = "48px";
	item.style.margin = "0px";
	item.style.padding = "0px";
	
	if(enabled && !error) 
	{
		item.removeAttribute("disabled");
	}
	else
	{
		item.setAttribute("disabled","true");
	}
	
	item.setAttribute("sort", "" + remotename );
	
	//Get rid of existing
	var children = item.childNodes;
	while( children.length > 0 )
	{
		var child = children.item(0);
		item.removeChild( child );
	}
	
	
	//Make new stuff
	var mainvbox = document.createElement('vbox');
	mainvbox.setAttribute("flex","1");
	item.appendChild(mainvbox);
	
	var mainhbox = document.createElement('hbox');
	mainhbox.setAttribute("flex","1");
	mainvbox.appendChild(mainhbox);
	
	var imagebox = document.createElement('box');//Needed to corral the image. It does "odd" things
	imagebox.setAttribute("style","width:48px;height:48px;margin:0px;padding:0px;border:0px;overflow:hidden;");
	mainhbox.appendChild(imagebox);
	
	var image = document.createElementNS("http://www.w3.org/1999/xhtml",'html:object');
	image.setAttribute("type","image/svg+xml");
	image.setAttribute("style","width:48px;height:48px;margin:0px;padding:0px;border:0px;");
	var imasrc = enabled?"chrome://df1_listsync/skin/list_enabled.svg":"chrome://df1_listsync/skin/list_disabled.svg";
	imasrc = error?"chrome://df1_listsync/skin/list_error.svg":imasrc;
	image.setAttribute( "data", imasrc );
	imagebox.appendChild(image);
	
	var childvbox = document.createElement('vbox');
	childvbox.setAttribute("flex","1");
	mainhbox.appendChild(childvbox);
	
	//GRID
	var textgrid = document.createElement('grid');
	textgrid.setAttribute("style","margin-left:5px;");
	childvbox.appendChild(textgrid);
	
	//COLUMNS
	var columns = document.createElement('columns');
	textgrid.appendChild(columns);
	
	var column = document.createElement('column');
	column.setAttribute("flex","0");
	columns.appendChild(column);
	
	column = document.createElement('column');
	column.setAttribute("flex","3");
	columns.appendChild(column);

	//ROWS
	var rows = document.createElement('rows');
	textgrid.appendChild(rows);
	
	//First Row
	var row = document.createElement('row');
	rows.appendChild(row);
	
	var label = document.createElement('label');
	label.setAttribute("style","margin:0px; padding:0px;");
	label.setAttribute("value","Remote: ");
	row.appendChild(label);
	
	label = document.createElement('label');
	label.setAttribute("style","margin:0px; padding:0px;");
	label.setAttribute("value","(" + number + ") " + remotename);
	row.appendChild(label);
	
	//Next Row
	row = document.createElement('row');
	rows.appendChild(row);
	
	label = document.createElement('label');
	label.setAttribute("style","margin:0px; padding:0px;");
	label.setAttribute("value","Local: ");
	row.appendChild(label);
	
	label = document.createElement('label');
	label.setAttribute("style","margin:0px; padding:0px;");
	label.setAttribute("value",localname);
	row.appendChild(label);
	if(remotename == "" && !error)
	{
		var childhbox = document.createElement('hbox');
		childhbox.setAttribute("pack","end");
		childvbox.appendChild(childhbox);
		
		var image2 = document.createElement('image');
		image2.setAttribute("src","chrome://df1_listsync/skin/busy.png");
		image2.setAttribute("tooltiptext","Woot.");
		childhbox.appendChild(image2);
	}
};

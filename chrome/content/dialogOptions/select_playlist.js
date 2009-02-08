	/*export_03.js
	Playlist export script for the Songbird 0.3/0.4
	version of the Playlist Export Tool
	Last updated on November 7, 2007 by compugeek32
	CONTRIBUTORS:
	-goofy <locale support>
	*/
	/*
	var gplaylistexportBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
	var mystrings = gplaylistexportBundle.createBundle("chrome://playlistexport/locale/export.properties");
	var petplaylistexporttool = mystrings.GetStringFromName("petplaylistexporttool");
	var petyoudidnotcheckat3 = mystrings.GetStringFromName("petyoudidnotcheckat3");
	var pettheplaylistexport4 = mystrings.GetStringFromName("pettheplaylistexport4");
	var petexportofplaylists5 = mystrings.GetStringFromName("petexportofplaylists5");
	var petplsplaylist = mystrings.GetStringFromName("petplsplaylist");
	var petm3uplaylist = mystrings.GetStringFromName("petm3uplaylist");
	var petexportplaylist = mystrings.GetStringFromName("petexportplaylist");
	var petto = mystrings.GetStringFromName("petto");
	var petexportallselected7 = mystrings.GetStringFromName("petexportallselected7");
	var petnotitle = mystrings.GetStringFromName("petnotitle");
	var petexperrp1 = mystrings.GetStringFromName("petexperrorp1");
	var petexperrp2 = mystrings.GetStringFromName("petexperrorp2");
	var petexperr2p1 = mystrings.GetStringFromName("petexperror2p1");
	var petexperr2p2 = mystrings.GetStringFromName("petexperror2p2");
	var petchangepath = mystrings.GetStringFromName("petchangepath");
	var petstatus_exporting = mystrings.GetStringFromName("petstatusexporting");
	var petstatus_failed = mystrings.GetStringFromName("petstatusfailed");
	var petstatus_done = mystrings.GetStringFromName("petstatusdone");
	var pet_error_title = mystrings.GetStringFromName("peterrtitle");
	var petclose = mystrings.GetStringFromName("petclose");

	const pb=Components.classes["@mozilla.org/preferences;1"].createInstance(Components.interfaces.nsIPrefBranch);


	
	var exts=new Array("m3u","pls");
	var prompt_srv=Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);*/
	
	function load()
	{
		var sbILibraryManager=Components.classes["@songbirdnest.com/Songbird/library/Manager;1"].getService(Components.interfaces.sbILibraryManager);
		var libraries=sbILibraryManager.getLibraries();
		var foundLibrary;
		var libraryResource;
		var libraryPlList;
		var tempView;
		var filters;
		//Main Library goes first...
		foundLibrary=sbILibraryManager.mainLibrary;
		libraryPlList=foundLibrary.QueryInterface(Components.interfaces.sbIMediaList);
		
		//Look for the playlists
		tempView=libraryPlList.createView();
		filters=tempView.cascadeFilterSet;
		filters.clearAll();
		filters.appendSearch(new Array("*"),1);
		filters.appendFilter("http://songbirdnest.com/data/1.0#isList");
		filters.set(1,new Array("1"),1);
		
		//Iterate through the lists
		for(i=0;i<tempView.length;i++)
		{
			//Get the list
			plList=tempView.getItemByIndex(i).QueryInterface(Components.interfaces.sbIMediaList);
			//Is the list completely full of shit?
			if(plList.name!=""&&plList.name!=" "&&plList.name!="undefined"&&plList.name!=null)
			{
				//alert( plList.contentSrc.prePath + plList.contentSrc.path )
				//We cannot sync it if it is not editable (Like a Smart Playlist)
				if( plList.userEditableContent )
				{
					addPlaylistToBox(plList.guid,foundLibrary.guid,plList.name,false,false);
				}
			}
		}
		
		/*
		addPlaylistToBox(libraryPlList.guid,libraryPlList.guid,libraryPlList.name,true,libraryPlList.isEmpty);
		tempView=libraryPlList.createView();
		filters=tempView.cascadeFilterSet;
		filters.clearAll();
		filters.appendSearch(new Array("*"),1);
		filters.appendFilter("http://songbirdnest.com/data/1.0#isList");
		filters.set(1,new Array("1"),1);
		for(i=0;i<tempView.length;i++){
			try{
				plList=tempView.getItemByIndex(i);
				plList.QueryInterface(Components.interfaces.sbIMediaList);
				if(plList.name!=" "&&plList.name!=" "&&plList.name!="undefined"&&plList.name!=null){
					addPlaylistToBox(plList.guid,foundLibrary.guid,plList.name,false,plList.isEmpty);
				}
			}catch(e){
				if(e.name=="NS_NOINTERFACE"){
					//alert("An invalid playlist was found.");
				}
			}
		}
		while(libraries.hasMoreElements()){
			foundLibrary=libraries.getNext();
			if(foundLibrary.guid!=sbILibraryManager.mainLibrary.guid){
				libraryPlList=foundLibrary.QueryInterface(Components.interfaces.sbIMediaList);
				addPlaylistToBox(libraryPlList.guid,libraryPlList.guid,libraryPlList.name,true,libraryPlList.isEmpty);
				tempView=libraryPlList.createView();
				filters=tempView.cascadeFilterSet;
				filters.clearAll();
				filters.appendSearch(new Array("*"),1);
				filters.appendFilter("http://songbirdnest.com/data/1.0#isList");
				filters.set(1,new Array("1"),1);
				for(i=0;i<tempView.length;i++){
					plList=tempView.getItemByIndex(i).QueryInterface(Components.interfaces.sbIMediaList);
					if(plList.name!=""&&plList.name!=" "&&plList.name!="undefined"&&plList.name!=null){
						addPlaylistToBox(plList.guid,foundLibrary.guid,plList.name,false,plList.isEmpty);
					}
				}
			}
		}*/
	}
	function addPlaylistToBox(GUID,libGUID,plName,isLibrary,isEmpty)
	{
		var pl_list=document.getElementById("PlaylistList");
		var pl_listItem=document.createElement("listitem");
		
		pl_listItem.setAttribute( "label", plName );
		pl_listItem.setAttribute( "value", GUID );
		
		pl_list.appendChild(pl_listItem);
		
		/*var pl_picker=document.getElementById("playlistpicker3");
		var pl_listItem=document.createElement("listitem");
		pl_listItem.setAttribute("allowevents",true);
		var pl_cell1=document.createElement("listcell");
		var li_num=document.getElementsByClassName("pathText").length;

		var theCheckBox=document.createElement("checkbox");
		theCheckBox.setAttribute("class","pl_checkbox");
		theCheckBox.setAttribute("id","pl_"+GUID+"_"+libGUID);
		theCheckBox.setAttribute("label",plName);	
		if(isEmpty) theCheckBox.setAttribute("disabled","true");
		if(isLibrary) theCheckBox.style.fontWeight="bold";
		else	theCheckBox.style.paddingLeft="15px";
		
		var pl_cell2=document.createElement("listcell");
		var pl_button=document.createElement("textbox");
		var pl_button2=document.createElement("button");
		pl_button2.setAttribute("class","changePath");
		pl_button2.setAttribute("label","...");
		pl_button.setAttribute("class","pathText");
		var pl_path=Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
		//pl_path.initWithPath(def_exp_loc);
		//pl_path.appendRelativePath(plName+"."+exts[defext]);
		pl_button.setAttribute("value",pl_path.path);
		pl_button2.setAttribute("tooltiptext",petchangepath);
		pl_button2.addEventListener("command",function(){eval("var chgd_path=changeExportPath("+li_num+");if(chgd_path){document.getElementsByClassName(\"pathText\")[li_num].setAttribute(\"value\",chgd_path);}");},true);
		pl_cell2.appendChild(pl_button);
		pl_cell2.appendChild(pl_button2);
		var pl_cell3=document.createElement("listcell");
		pl_cell3.setAttribute("class","pl_export_status");
		pl_cell3.setAttribute("id","status_"+GUID);
		pl_cell1.appendChild(theCheckBox);
		pl_listItem.appendChild(pl_cell1);
		pl_listItem.appendChild(pl_cell2);
		pl_listItem.appendChild(pl_cell3);	
		pl_picker.appendChild(pl_listItem);*/
	}
	function accept()
	{
		var pl_list=document.getElementById("PlaylistList");
		var pl_listItem = pl_list.selectedItem;
		window.arguments[0].result = pl_listItem.value;
		return pl_listItem != null;
	}
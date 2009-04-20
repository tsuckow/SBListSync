//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cStatus_body == 'undefined')
{
	DF1ListSync.cStatus_body = {};
}

DF1ListSync.cStatus_body.StatusIcons = {
  busy:         'chrome://df1_listsync/skin/busy.png',
  disabled:     'chrome://df1_listsync/skin/bad.png',
  idle:         'chrome://df1_listsync/skin/bad.png',
  sending:      'chrome://df1_listsync/skin/bad.png',
  recieving:    'chrome://df1_listsync/skin/bad.png',
  error:        'chrome://df1_listsync/skin/bad.png',
  login_error:  'chrome://df1_listsync/skin/bad.png'
};

DF1ListSync.cStatus_body.construct =
function()
{
	var statusIcon = document.getElementById('df1_listsync-StatusIcon');
	
	var click = DF1ListSync.Utils.build(this, this.onClick);
	var rclick = DF1ListSync.Utils.build(this, this.onRClick);
	
	statusIcon.addEventListener("click", 
		function(event)
		{
			// only the left button
			if (event.button != 0) return;
				
			click();
			
		}, false);
		
	statusIcon.addEventListener("contextmenu", 
        function(event)
		{
			rclick();
			
		}, false);
		
	this.setIcon(this.StatusIcons.busy);
	this.setTooltip("ListSync");
	this.setText("");
};

DF1ListSync.cStatus_body.onClick =
function()
{
};

DF1ListSync.cStatus_body.onRClick =
function()
{
};

DF1ListSync.cStatus_body.setIcon =
function(icon)
{
	var statusIcon = document.getElementById('df1_listsync-StatusIcon');
	statusIcon.setAttribute('src', icon);
},

DF1ListSync.cStatus_body.setTooltip =
function(string)
{
	var statusIcon = document.getElementById('df1_listsync-StatusIcon');
	statusIcon.setAttribute('tooltiptext', string);
},

DF1ListSync.cStatus_body.setText =
function(string)
{
	var statusIcon = document.getElementById('df1_listsync-StatusIcon');
	statusIcon.setAttribute('label', string);
}

DF1ListSync.cStatus_body.setStatus =
function()
{
	
};

DF1ListSync.cStatus_body.clearStatus =
function()
{
	
};
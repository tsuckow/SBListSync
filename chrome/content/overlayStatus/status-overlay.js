// Make a namespace.
if (typeof Df1_listsync == 'undefined') {
  var Df1_listsync = {};
}

Df1_listsync.StatusHandler =
{
	onClick : function()
	{
		Df1_listsync.Controller.doHelloWorld();
	},
	
	onRClick : function()
	{
		Df1_listsync.Controller.doHelloWorld();
	},
	
	registerListener : function()
	{
		this._statusIcon = document.getElementById('df1_listsync-StatusIcon');
		
		this._statusIcon.addEventListener("click", 
			function(event)
			{
				// only the left button
				if (event.button != 0) return;
				
				Df1_listsync.StatusHandler.onClick();
			}, false);
		
		this._statusIcon.addEventListener("contextmenu", 
         function(event)
		 {
	        Df1_listsync.StatusHandler.onRClick();
		}, false);
	},
	
	setIcon : function(icon)
	{
		var statusIcon = document.getElementById('df1_listsync-StatusIcon');
		statusIcon.setAttribute('src', icon);
	},
	
	setTooltip : function(string)
	{
		var statusIcon = document.getElementById('df1_listsync-StatusIcon');
		statusIcon.setAttribute('tooltiptext', string);
	},
	
	setText : function(string)
	{
		var statusIcon = document.getElementById('df1_listsync-StatusIcon');
		statusIcon.setAttribute('label', string);
	}
};

Df1_listsync.StatusIcons = {
  busy:         'chrome://df1_listsync/skin/busy.png',
  disabled:     'chrome://df1_listsync/skin/disabled.png',
  idle:         'chrome://df1_listsync/skin/as.png',
  sending:      'chrome://df1_listsync/skin/disabled.png',
  recieving:    'chrome://df1_listsync/skin/disabled.png',
  error:        'chrome://df1_listsync/skin/error.png',
  login_error:  'chrome://df1_listsync/skin/error.png'
};
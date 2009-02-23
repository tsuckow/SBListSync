var load =
function()
{
	var testRunner = new DF1ListSync.cUnitRunner(this, function(){}, function(id, s, m){alert("Callback: " + id + " " + s + " " + m);} );
	testRunner.init();
};
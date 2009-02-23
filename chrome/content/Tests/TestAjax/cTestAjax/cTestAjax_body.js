//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

if (typeof DF1ListSync.cTestAjax_body == 'undefined')
{
	DF1ListSync.cTestAjax_body = {};
}

DF1ListSync.cTestAjax_body.getTests =
function()
{
	var tests = new Array();
	
	tests.push( { name: "Ajax: Send", obj: this, func: this.testSend } );
	
	return tests;
};
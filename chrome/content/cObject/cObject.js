//Make Namespace.
if (typeof DF1ListSync == 'undefined')
{
	var DF1ListSync = {};
}

//Gives us rich Polymorphic class capabilities.

if(typeof DF1ListSync.cObject == 'undefined')
{
	//Thank You
	//http://truecode.blogspot.com/2006/08/object-oriented-super-class-method.html
	
	//Defines the top level Class
	DF1ListSync.cObject = function() {};
	DF1ListSync.cObject.prototype.construct = function() {};
	DF1ListSync.cObject.extend = function(def) {
	  var classDef = function() {
	      if (arguments[0] !== DF1ListSync.cObject) { this.construct.apply(this, arguments); }
	  };

	  var proto = new this(DF1ListSync.cObject);
	  var superClass = this.prototype;

	  for (var n in def) {
	      var item = def[n];                      
	      if (item instanceof Function) item.$ = superClass;
	      proto[n] = item;
	  }

	  classDef.prototype = proto;

	  //Give this new class the same static extend method    
	  classDef.extend = this.extend;      
	  return classDef;
	};

}
//Gives us rich Polymorphic class capabilities.

if(typeof PolyClass == 'undefined')
{
	//Thank You
	//http://truecode.blogspot.com/2006/08/object-oriented-super-class-method.html
	
	//Defines the top level Class
	function PolyClass() { }
	PolyClass.prototype.construct = function() {};
	PolyClass.extend = function(def) {
	  var classDef = function() {
	      if (arguments[0] !== PolyClass) { this.construct.apply(this, arguments); }
	  };

	  var proto = new this(PolyClass);
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
-(function(){
	var dependencies = {
		functions : [],
		variables : []
	};
	
	
	var tracker = function(fn){
		dependencies.functions.push(fn);
		dependencies.variables.push([]);
		dependencies.tracker = true;
		
		fn();
		
		dependencies.tracker = false;
	};
	
	var reactive = function(init, id){
		
		this.value = init;
		var that = this;
		tracker(function() {
		  var curTime = that.get(); // начинаем отслеживание изменений переменной
		  document.querySelector(id).innerHTML = curTime; // изменяем DOM в связи с изменением нашей переменной
		});
	};
	
	reactive.prototype.get = function(){
		if(dependencies.tracker){
			dependencies.variables[dependencies.variables.length-1].push(this);
		}
		
		return this.value;
	}
	
	reactive.prototype.set = function(val){
		var i = 0;
		var that = this;
		this.value = val;
		
		dependencies.variables.forEach(function(arr){
			if(arr.indexOf(that) > -1){
				dependencies.functions[i]();
			}
			i+=1;
		});
	};
	window.Tracker = tracker;
	window.Reactive = reactive;
	
})();
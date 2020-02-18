/**
 * Date format 
 */
(function() {
	"use strict";
	
	angular.module("itaca.component").component("chDateFormat", {
		bindings: {
			date: "<",
        	offset: "@",
        	timeZoneId: "@",
        	format: "@"
    	},
		controller: DateFormatCtrl,
		template: "<span ng-bind=\"$ctrl.$$date\"></span>"
	});

	/* @ngInject */
	function DateFormatCtrl($scope, $filter) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.format = ctrl.format || "medium";
			
			ctrl.$calculate();
		};
		
		this.$onChange = function() {
			if((changesObj.date  && !changesObj.date.isFirstChange()) || (changesObj.offset  && !changesObj.offset.isFirstChange()) || (changesObj.timeZoneId  && !changesObj.timeZoneId.isFirstChange())){
        		ctrl.$calculate();
        	}
		};
    	
		this.$calculate = function(){
    		var _offset = null, _tz;
    		var _date = ctrl.date ? moment(ctrl.date) : null;
    		
    		if(_date && _date.isValid()){
    		
	    		if(ctrl.timeZoneId){
	    			
	    			_date = moment(_date).tz(ctrl.timeZoneId);
	    			_date = moment(_date).utcOffset(0,true).local();
	    			
	    		} else if(ctrl.offset){
					// se è una stringa ed è UTC il valore è 0 altrimenti è la stringa passata senza ulteriori controlli
					if(isNaN(ctrl.offset)){
						_offset = ctrl.offset.toLowerCase() == "UTC" ? 0 : ctrl.offset;
						
					} else {
						// Se è un numero controllo se sia in minuti oppure se è in secondi lo converto in minuti
						_offset = (ctrl.offset / 60) <= 24 ? ctrl.offset : (ctrl.offset / 60);
					}
					
					_date = _offset ? _date.utcOffset(_offset, true).local() : _date;
				}
    			
    			ctrl.$$date = $filter("date")(_date.toDate(), ctrl.format);
    			
    		}
    	};
	}
})();
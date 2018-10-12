/**
 * Time ago from now
 */
(function() {
	'use strict';
	
	angular.module("itaca.component").component("chTimeAgo", {
		bindings: {
			date: "<",
        	offset: "@"
    	},
		controller: TimeAgoCtrl,
		template: "<span ng-bind=\"$ctrl.$$timeAgo\"></span>"
	});

	/* @ngInject */
	function TimeAgoCtrl($scope) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.$calculate();
		};
		
		this.$onChange = function() {
			if((changesObj.date  && !changesObj.date.isFirstChange()) || (changesObj.offset  && !changesObj.offsetisFirstChange())){
        		ctrl.$calculate();
        	}
		};
    	
    	this.$calculate = function(){
    		var _offset = null;
    		
			if(ctrl.offset){
				// se è una stringa ed è UTC il valore è 0 altrimenti è la stringa passata senza ulteriori controlli
				if(isNaN(ctrl.offset)){
					_offset = ctrl.offset.toLowerCase() == 'UTC' ? 0 : ctrl.offset;
					
				} else {
					// Se è un numero controllo se sia in minuti oppure se è in secondi lo converto in minuti
					_offset = (ctrl.offset / 60) <= 24 ? ctrl.offset : (ctrl.offset / 60);
				}
			}
			
			ctrl.$$timeAgo = ctrl.date ? moment(ctrl.date) : null;
    		if(ctrl.$$timeAgo && ctrl.$$timeAgo.isValid()){
    			
    			ctrl.$$timeAgo = _offset ? ctrl.$$timeAgo.utcOffset(0, true).local().fromNow() : ctrl.$$timeAgo.fromNow();
    		}
    	};
	}
})();
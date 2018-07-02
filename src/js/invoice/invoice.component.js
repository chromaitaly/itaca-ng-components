(function() {
	'use strict';
	
	angular.module("itaca.components").component("chInvoice", {
		transclude: true,
		bindings: {
			invoice: "<",
			onSave: "&?"
    	},
		controller: InvoiceCtrl,
		template: "<div flex layout-fill ng-transclude></div>"
	});
	
	 /* @ngInject */
	 function InvoiceCtrl($scope, $q) {
		 var ctrl = this;
		
		this.$onInit = function() {
		};
		
		this.$save = function() {
			var deferred = $q.defer();
			
			if (ctrl.onSave && angular.isFunction(ctrl.onSave)) {
				$q.when(ctrl.onSave({$invoice: ctrl.invoice})).then(function(data) {
					deferred.resolve(data);
					
				}, function(error) {
					deferred.reject(error);
				});
				
			} else {
				deferred.resolve();
			}
			
			return deferred.promise;
		};
	}
})();
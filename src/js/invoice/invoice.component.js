(function() {
	'use strict';
	
	angular.module("itaca.components").component("chInvoice", {
		transclude: true,
		bindings: {
			invoice: "<"
    	},
		controller: InvoiceCtrl,
		template: "<div flex layout-fill ng-transclude></div>"
	});
	
	 /* @ngInject */
	 function InvoiceCtrl($scope) {
		 var ctrl = this;
		
		this.$onInit = function() {
		};
	}
})();
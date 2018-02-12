(function() {
	'use strict';
	
	angular.module("itaca.components").component("chInvoice", {
		bindings: {
			invoice: "<"
    	},
		controller: InvoiceCtrl,
		templateUrl: "/tpls/invoice/invoice.tpl"
	});
	
	 /* @ngInject */
	 function InvoiceCtrl($scope) {
		 var ctrl = this;
		
		this.$onInit = function() {
		};
	}
})();
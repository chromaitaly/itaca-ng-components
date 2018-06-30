(function() {
	'use strict';
	
	angular.module("itaca.components").component("chInvoiceItems", {
		require: {
			chInvoiceCtrl: "^^chInvoice"
		},
		controller: InvoiceItemsCtrl,
		templateUrl: "/tpls/invoice/invoice-items.tpl"
	});
	
	 /* @ngInject */
	 function InvoiceItemsCtrl($scope) {
		 var ctrl = this;
		
		this.$onInit = function() {
			ctrl.invoice = ctrl.chInvoiceCtrl.invoice;
		};
	}
})();
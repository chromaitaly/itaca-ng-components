(function() {
	'use strict';
	
	angular.module("itaca.components").component("chInvoiceHeader", {
		require: {
			chInvoiceCtrl: "^^chInvoice"
		},
		controller: InvoiceHeaderCtrl,
		templateUrl: "/tpls/invoice/invoice-header.tpl"
	});
	
	 /* @ngInject */
	 function InvoiceHeaderCtrl($scope) {
		 var ctrl = this;
		
		this.$onInit = function() {
			ctrl.invoice = ctrl.chInvoiceCtrl.invoice;
		};
	}
})();
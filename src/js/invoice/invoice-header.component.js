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
	 function InvoiceHeaderCtrl($scope, REGEXP, FormUtils) {
		 var ctrl = this;
		 
		 this.REGEXP = REGEXP;
		
		 this.$onInit = function() {
			ctrl.invoice = ctrl.chInvoiceCtrl.invoice;
		 };
		 
		 this.$editInvoiceDetails = function() {
			 ctrl.$$tempInvoice = angular.copy(ctrl.invoice);
			 ctrl.$$invoiceDetailsEdit = true; 
		 };
		 
		 this.$cancelEditInvoiceDetails = function() {
			 ctrl.$$tempInvoice = null;
			 ctrl.$$invoiceDetailsEdit = false;
		 };
		 
		 this.$saveInvoiceDetails = function() {
			 var form = $scope.chInvoiceForm;
			 
			 form.$setSubmitted();
			 
			 if (form.$invalid) {
				 FormUtils.focusFirstInvalid(form.$name);
				 return false;
			 }
			 
			 ctrl.chInvoiceCtrl.$save().then(function(data) {
				 ctrl.$cancelEditInvoiceDetails();
			 });
		 };
		 
		 this.$editCustomerBillingData = function() {
			 ctrl.$$tempInvoice = angular.copy(ctrl.invoice);
			 ctrl.$$customerBillingDataEdit = true; 
		 };
		 
		 this.$cancelEditCustomerBillingData = function() {
			 ctrl.$$tempInvoice = null;
			 ctrl.$$customerBillingDataEdit = false; 
		 };
		 
		 this.$saveCustomerBillingData = function() {
			 var form = $scope.chInvoiceForm;
			 
			 form.$setSubmitted();
			 
			 if (form.$invalid) {
				 FormUtils.focusFirstInvalid(form.$name);
				 return false;
			 }
			 
			 ctrl.chInvoiceCtrl.$save().then(function(data) {
				 ctrl.$cancelEditCustomerBillingData();
			 });
		 };
	}
})();
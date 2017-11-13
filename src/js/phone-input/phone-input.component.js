(function() {
	'use strict';
	
	angular.module("itaca.components").component('chPhoneInput', {
		require: {
			ngModelCtrl: 'ngModel',
		},
		bindings: {
			ngModel: "=",
			inputName: "@",
			label: "@",
			placeholder: "@",
			prefixLabel: "@",
			prefixPlaceholder: "@",
			searchPlaceholder: "@",
			ngPattern: "<",
			ngRequired: "=?",
			ngDisabled: "=?",
			errorMessages: "<",
			prefixErrorMessages: "<",
			noAsterisk: "<"
		},
		controller: PhoneInputCtrl,
		template: 
	    	"<ng-form name=\"chPhoneInputForm\" ng-class=\"{\'text-gray-light cursor-disabled\': $ctrl.ngDisabled}\" layout>" +
		    	"<div>"+
		    		"<md-input-container class=\"md-block\">"+
				 		"<label ng-show=\"$ctrl.prefixLabel\">{{$ctrl.prefixLabel}}</label>"+
				 		"<md-select name=\"prefix\" placeholder=\"{{$ctrl.prefixPlaceholder}}\" ng-model=\"phone.prefix\" ng-required=\"$ctrl.ngRequired\" ng-disabled=\"$ctrl.ngDisabled\" " +
				 			"ng-attr-md-no-asterisk=\"$ctrl.noAsterisk\" md-container-class=\"selectHeader\" aria-label=\"prefix\" md-on-close=\"$ctrl.$clearSearchTerm()\">"+
							"<md-subheader class=\"no-padding\">"+
								"<md-select-header class=\"select-header bg-white\">"+
						            "<input ng-model=\"$ctrl.$$searchTerm.value\" type=\"search\" ng-keydown=\"$event.stopPropagation()\" placeholder=\"{{$ctrl.searchPlaceholder}}\""+
					                   "class=\"header-searchbox md-text\" autofocus>"+
					        	"</md-select-header>"+
				        	"</md-subheader>"+
				        	"<md-option ng-repeat=\"prefix in $ctrl.prefixes | filter:searchTerm.value\" ng-value=\"prefix\" ng-selected=\"prefix.dial_code == $ctrl.$$phone.prefix.dial_code\">"+
				          		"<span class=\"flag-icon flag-icon-{{::prefix.code}}\"></span>"+
				              	"<strong>&nbsp;{{::prefix.name}}</strong>"+
				              	"<span>&nbsp;({{::prefix.dial_code}})</span>"+
				            "</md-option>"+
				    	"</md-select>"+
				        "<div ng-if=\"$ctrl.prefixErrorMessages\" ng-messages=\"chPhoneInputForm.prefix.$error\">"+
				        "<div ng-repeat=\"errMsg in $ctrl.prefixErrorMessages track by $index\" ng-message=\"{{errMsg.error}}\">{{errMsg.message}}</div>"+
					    "</div>"+
				    "</md-input-container>"+
			    "</div>"+
			    "<div flex>"+
				    "<md-input-container class=\"md-block no-padding-important\">"+
				     	"<label ng-if=\"$ctrl.label\">{{$ctrl.label}}</label>"+
				     	"<input type=\"text\" name=\"{{$ctrl.inputName}}\" placeholder=\"{{$ctrl.placeholder}}\" ng-model=\"$ctrl.$$phone.number\" ng-pattern=\"$ctrl.ngPattern\" " +
				     	"	ng-required=\"$ctrl.ngRequired\" ng-disabled=\"$ctrl.ngDisabled\" aria-label=\"{{$ctrl.label || $ctrl.placeholder}}\">"+
						"<div ng-if=\"$ctrl.errorMessages\" ng-messages=\"chPhoneInputForm[$ctrl.inputName].$error\">"+
							"<div ng-repeat=\"errMsg in $ctrl.errorMessages track by $index\" ng-message=\"{{errMsg.error}}\">{{errMsg.message}}</div>"+
						"</div>"+
					"</md-input-container>"+
				"</div>"+
			"</ng-form>"
	});
	
	/* @ngInject */
	function PhoneInputCtrl($scope, $log, REGEXP, PhoneList) {
	   var ctrl = this;
	   
	   this.$onInit = function() {
		   ctrl.noAsterisk = _.isBoolean(ctrl.noAsterisk) ? ctrl.noAsterisk : false;
		   ctrl.inputName = ctrl.inputName || "phone";
		   ctrl.ngPattern = ctrl.ngPattern || REGEXP.phone;
		   
		   ctrl.$$phone = {};
		   ctrl.$$searchTerm = {value: ""};
		   
		   // decompile given phone number
		   ctrl.$decompilePhone();
		   ctrl.$loadPrefixes();
		   
		   ctrl.$initWatches();
	   };
	   
	   this.$loadPrefixes = function() {
			PhoneList.all().then(function(data) {
				_.forEach(data.content, function(value) {
					value.code = value.code.toLowerCase();
				});
				
				ctrl.prefixes = data.content;
				
			}, function(error) {
				$log.error(error);
			});
		};
		
		this.$decompilePhone = function() {
			ctrl.$$phone = ctrl.$$phone || {};
			
			if (!ctrl.ngModel) {
				return;
			}
			
			PhoneList.decompile(ctrl.ngModel).then(function(data) {
				_.assign(ctrl.$$phone, data);
				
				if (!_.isObject(data.prefix)) {
					ctrl.$$phone.prefix = {dial_code: data.prefix};
				}
				
			}, function(error) {
				_.assign(ctrl.$$phone, PhoneList.decompileSimple(ctrl.ngModel));
				ctrl.$$phone.prefix = {dial_code: ctrl.$$phone.prefix};
			});
		};
		
		this.$clearSearchTerm = function() {
	    	ctrl.$$searchTerm.value = '';
	    };
		
	    this.$updateModel = function() {
			ctrl.ngModel = ctrl.$$phone && ctrl.$$phone.prefix && ctrl.$$phone.prefix.dial_code ? PhoneList.compile(ctrl.$$phone.prefix.dial_code, ctrl.$$phone.number) : ctrl.ngModel;
		};
		
		this.$initWatches = function() {
			$scope.$watchCollection(function(){ 
				return ctrl.$$phone;
				
			}, function(newVal, oldVal) {
			   ctrl.$updateModel();
			});
		};
   }
})();
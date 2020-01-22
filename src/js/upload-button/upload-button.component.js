(function() {
	'use strict';
	
	angular.module("itaca.component").component("chUploadButton", {
		require: {
			ngModelCtrl: 'ngModel'
		},
		bindings: {
			ngModel: "<",
			label: "@",
			inputName: "@",
			accept: "@",
			pattern: "@",
			maxFiles: "@",
			maxSize: "@",
			maxTotalSize: "@",
			allowDir: "<?",
			fixOrientation: "<?",
			isMultiple: "<?",
			isRequired: "<?",
			isDisabled: "<?",
			onSelect: "&?",
			
		},
		controller: UploadButtonCtrl,
		template : 
			"<ng-form name=\"uploadForm\" layout=\"column\" flex=\"100\">" +
				"<div layout layout-wrap layout-padding layout-align=\"center center\">" +
					"<md-button layout-padding class=\"bg-opaque-5 md-square-button\" ng-click=\"$ctrl.$onclick()\" aria-label=\"upload\" ng-disabled=\"$ctrl.isDisabled\">" +
						"<div layout=\"column\" flex=\"100\" layout-align=\"center center\" class=\"text-white\">" +
							"<md-icon class=\"mdi mdi-camera md-48 text-white\"></md-icon>" +
							"<div class=\"row-1 text-initial text-small\"><span ng-bind=\"$ctrl.label\"></span></div>" +
						"</div>" +
						"<md-tooltip><span ng-bind=\"$ctrl.label\"></span></md-tooltip>" +
					"</md-button>" +
					"<input id=\"{{$ctrl.$uid}}\" type=\"file\"" +
						" ngf-select=\"$ctrl.$uploadPhotos($newFiles, $invalidFiles)\"" +
						" name=\"{{$ctrl.inputName}}\" accept=\"{{$ctrl.accept}}\"" +
						" ngf-pattern=\"{{$ctrl.pattern}}\" ngf-max-files=\"{{$ctrl.maxFiles}}\"" +
						" ngf-max-size=\"{{$ctrl.maxSize}}\" ngf-max-total-size=\"{{$ctrl.maxTotalSize}}\"" +
						" ng-model=\"$ctrl.ngModel\" ngf-model-invalid=\"invalidFiles\"" +
						" ngf-multiple=\"$ctrl.isMultiple\" multiple=\"{{$ctrl.isMultiple ? 'multiple' : ''}}\"" +
						" ng-required=\"$ctrl.isRequired\" ng-disabled=\"$ctrl.isDisabled\"" +
						" aria-label=\"Add photo\" tabindex=\"-1\"" +
						" style=\"visibility: hidden; width: 0; height: 0; opacity: 0.01; padding: 0; margin: 0;\">" +
				"</div>" +
				"<div ng-show=\"uploadForm.$dirty\" ng-messages=\"uploadForm[$ctrl.inputName].$error\" class=\"text-danger text-center\">" +
					"<small ng-message=\"pattern\"><span translate=\"error.photo.not.image\"></span></small>" +
					"<small ng-message=\"maxFiles\"><span translate=\"error.photo.max.count\" translate-values=\"{count: $ctrl.maxFiles}\"></span></small>" +
					"<small ng-message=\"maxSize\"><span translate=\"error.photo.max.size\" translate-values=\"{size: $ctrl.maxSize}\"></span></small>" +
					"<small ng-message=\"maxTotalSize\"><span translate=\"error.photo.max.size.total\" translate-values=\"{size: $ctrl.maxTotalSize}\"></span></small>" +
					"<small ng-message=\"required\"><span translate=\"error.required\"></span></small>" +
				"</div>" +
			"</ng-form>",
	});
	
	 /* @ngInject */
	function UploadButtonCtrl($scope, $translate, $mdMedia, NumberUtils) {
		var ctrl = this;
		
		this.$uid  = NumberUtils.uniqueNumber();
		
	   	this.$onInit = function(){
	   		ctrl.$mdMedia = $mdMedia;
	   		
	   		ctrl.ngModel = _.isPlainObject(ctrl.ngModel) ? ctrl.ngModel : {};
	   		
	   		ctrl.label = ctrl.label || $translate.instant('photo.add');
	   		ctrl.maxFiles = ctrl.maxFiles || 10;
	   		ctrl.maxSize = ctrl.maxSize || "50MB";
	   		ctrl.maxTotalSize = ctrl.maxTotalSize || "500MB";
	   		
	   		ctrl.allowDir = ctrl.allowDir && _.isBoolean(ctrl.allowDir) ? ctrl.allowDir : false;
	   		ctrl.fixOrientation = ctrl.fixOrientation && _.isBoolean(ctrl.fixOrientation) ? ctrl.fixOrientation : false;
	   		ctrl.isMultiple = ctrl.isMultiple && _.isBoolean(ctrl.isMultiple) ? ctrl.isMultiple : false;
	   		ctrl.isRequired = ctrl.isRequired && _.isBoolean(ctrl.isRequired) ? ctrl.isRequired : false;
	   		ctrl.isDisabled = ctrl.isDisabled && _.isBoolean(ctrl.isDisabled) ? ctrl.isDisabled : false;
	   	};
	   	
	   	this.$onclick = function(){
	   		document.getElementById(ctrl.$uid).click();
	   	};
	   	
	   	this.$uploadPhotos = function(newFiles, invalidFiles){
	   		ctrl.onSelect && ctrl.onSelect({'$newFiles': newFiles, '$invalidFiles': invalidFiles});
	   	};
	   	
	}
})();
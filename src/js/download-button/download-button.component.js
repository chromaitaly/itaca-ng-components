(function() {
	'use strict';
	
	angular.module("itaca.components").component('chDownloadButton', {
		bindings: {
			url: "<",
			btnClass: "@",
			label: "@",
			labelClass: "@",
			iconClass: "@",
			downloadingLabel: "@",
			downloadingClass: "@",
			downloadReadyLabel: "@",
			downloadLabel: "@",
			maxRetry: "<?",
			retryDelay: "<?",
			onError: "&?"
    	},
		controller: DownloadButtonCtrl,
		template: 
			"<span class=\"no-padding no-margin\">" +
		    	"<md-button class=\"{{$ctrl.btnClass}}\" ng-click=\"$ctrl.$download($event)\" aria-label=\"{{$ctrl.label}}\" ng-disabled=\"$ctrl.$$downloading\">" +
		    		"<span ng-if=\"!$ctrl.$$downloading\" class=\"layout-row layout-align-center-center\">"+
		    			"<md-icon ng-show=\"$ctrl.iconClass\" class=\"material-icons {{$ctrl.iconClass}}\"></md-icon>" +
						"<span style=\"margin-left: 5px\" class=\"{{$ctrl.labelClass}}\">{{$ctrl.label}}</span>" +
					"</span>"+
					"<span ng-if=\"$ctrl.$$downloading\" class=\"layout-row layout-align-center-center\">"+
						"<md-progress-circular class=\"{{$ctrl.downloadingClass}}\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular>" +
						"<span style=\"margin-left: 5px\" class=\"{{$ctrl.labelClass}}\">{{$ctrl.downloadingLabel || $ctrl.label}}</span>" +
					"</span>"+
				"</md-button>" +
				"<a class=\"ch-download-button-link\" download target=\"_blank\"></a>" +
			"</span>"
	});
			
	/* @ngInject */
	function DownloadButtonCtrl($scope, $element, $http, $timeout, $log, Dialog) {
		var ctrl = this;	
		
		this.$onInit = function() {
			ctrl.btnClass = ctrl.btnClass || "md-raised md-primary";
			ctrl.downloadingClass = ctrl.downloadingClass || "md-accent md-hue-2";
			ctrl.maxRetry = ctrl.maxRetry || 1;
			ctrl.retryDelay = ctrl.retryDelay || 5000;
		};
			
		this.$download = function(ev){
			ctrl.$$attempt = 1;
			ctrl.$doDownload(ev);
		};
			
		this.$doDownload = function(ev){
			ctrl.$$downloading = true;
			
			var finallyFn = function(){
				ctrl.$$attempt++;
			};
			
			$http.get(ctrl.url).then(function(response) {
				if (!response.data.file) {
					ctrl.$manageRetry(true);
					
				} else {
					if (bowser.ios) {
						var data = {
							file: response.data.file, 
							filename: response.data.filename,
							contentType: response.data.contentType,
							title: ctrl.downloadReadyLabel,
							downloadLabel: ctrl.downloadLabel
						};
						
						Dialog.downloadFile(ev, data);
						
					} else {
						var linkEl = ctrl.$getLinkEl();
						linkEl.href = 'data:' + (response.data.contentType || "application/octet-stream") + ';base64,' + encodeURI(response.data.file);
						linkEl.setAttribute('download', response.data.filename);
//							linkEl.click();
						
						if(document.createEvent) {
							var eventObj = new MouseEvent("click", {
								view: window,
							    bubbles: true,
							    cancelable: true
							});
							
							linkEl.dispatchEvent(eventObj);
						
						} else {
							linkEl.fireEvent('click');
						}
					}
					
					ctrl.$$downloading = false;
				}
				 
            }, function(response){
            	if (response.status == 412 || !ctrl.$manageRetry(response.status == 507)){
            		$log.error("Error downloading file: " + response.data && response.data.message ? response.data.message : "");
            		ctrl.onError && ctrl.onError({response: response});
            		ctrl.$$downloading = false;
            	}
            	
            }).finally(finallyFn, finallyFn);
		};
		
		this.$manageRetry = function(longWait) {
			if (ctrl.$$attempt < ctrl.maxRetry) {
        		$timeout(ctrl.$doDownload, longWait ? ctrl.retryDelay : 1000);
        		return true;
			}
				
			return false;
		};
		
		this.$getLinkEl = function() {
			var linkEl = $element[0].querySelector(".ch-download-button-link");
			
			if (linkEl == null) {
				// se non esiste, viene creato
				linkEl = document.createElement('a');
				linkEl.setAttribute('target', '_blank');
				linkEl.className = "ch-download-button-link";
			
				element[0].appendChild(linkEl);
			}
			
			return linkEl;
		};
	}
})();
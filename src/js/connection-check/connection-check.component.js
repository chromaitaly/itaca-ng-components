(function() {
	"use strict";
	
	angular.module("itaca.components").component("chConnectionCheck", {
		bindings: {},
		controller: ConnectionCheckCtrl,
		template: "<span></span>"
	});

	/* @ngInject */
	function ConnectionCheckCtrl($scope, $mdDialog, $window) {
		var ctrl = this;
		
		this.$onInit = function() {
			$window.addEventListener("offline", ctrl.$showDialog);
		};
		
		this.$showDialog = function() {
			$mdDialog.show({
				controller: ConnectionCheckDialogCtrl,
			    escapeToClose: false,
			    template: 
			    	"<md-dialog flex=\"70\" aria-label=\"offline dialog\">"+
			    		"<md-dialog-content class=\"md-padding text-center\">"+
							"<div>"+
								"<md-icon class=\"mdi mdi-close-network md-160\"></md-icon>"+
							"</div>"+
							"<h1 class=\"md-display-1 no-margin\"><span translate=\"alerts.offline.title\"></span></h1>"+
							"<h4 class=\"md-subhead no-margin-top\"><span translate=\"alerts.offline.text\"></span></h4>"+
						"</md-dialog-content>"+
					"</md-dialog>"
			});
			
			/* @ngInject */
			function ConnectionCheckDialogCtrl($mdDialog, $window) {
		    	
		    	var hideFunc = function(){
		    		$mdDialog.hide();
		    	};
		    	
		    	this.$onInit = function() {
		    		$window.addEventListener("online", hideFunc);
				};
				
				this.$onDestroy = function(){
					$window.removeEventListener("online", hideFunc);
				};
		    }
		};
		
		this.$onDestroy = function() {
			$window.removeEventListener("offline", ctrl.$showDialog);
		};		
	}
})();
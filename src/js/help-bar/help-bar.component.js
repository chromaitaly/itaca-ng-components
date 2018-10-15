(function() {
	'use strict';
	
	angular.module("itaca.components").component("chHelpBar", {
		bindings: {
			faqUrl: "@",
			showHelpBtn: "<?",
			bgClass: "@",
			bgButton: "@",
			bgSecondaryButton: "@",
			containerId: "@",
			onContactMeClick: "&?"
		},
		controller: HelpBarCtrl,
		templateUrl: "/tpls/help-bar/help-bar.tpl"
			
	});
	
	angular.module("itaca-ai").controller('helpBarDialogCtrl', HelpBarDialogCtrl); 
	
	 /* @ngInject */
	function HelpBarCtrl($scope, $element, $mdMedia, AppOptions, Navigator, $mdDialog) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.$mdMedia = $mdMedia;
    		ctrl.appOptions = AppOptions;
    		ctrl.navigator = Navigator;
    		
    		//Aggiungo una classe al container
    		if(ctrl.containerId){
    			angular.element(document.querySelector("#"+ ctrl.containerId)).addClass('ch-margin-helper-container');
    		}
    		
    		ctrl.bgClass = ctrl.bgClass || "bg-gray-lighter text-gray-5";
    		ctrl.bgButton = ctrl.bgButton || "bg-blue-sea md-raised text-white layout-padding";
    		ctrl.bgSecondaryButton  = ctrl.bgSecondaryButton || "only-border-important";
    		
    		ctrl.showHelpBtn = _.isBoolean(ctrl.showHelpBtn) ? ctrl.showHelpBtn : true;
    		
    		ctrl.faqUrl = ctrl.faqUrl || '/faq';
    	};
    	
    	this.$recallDialog = function(ev){
    		var opts = {
				templateUrl: "/tpls/help-bar/help-bar-dialog.tpl",
				controller:  'helpBarDialogCtrl',
				controllerAs: "$ctrl",
				locals: {data:{confirmFn : ctrl.onContactMeClick}}, 
				targetEvent: ev, 
				fullscreen: false,
				escapeToClose: true,
				clickOutsideToClose: true,
				disableParentScroll: true,
				hasBackdrop: true,
			};
			
	    	$mdDialog.show(opts);
    	};
	}
	
	/* @ngInject */
	function HelpBarDialogCtrl($mdDialog,  $q, REGEXP, $translate, Loading, Notification, AppOptions, data) {
		 var ctrl = this;
		 
		 this.REGEXP = REGEXP;
		 this.data = data;
		 this.appOptions = AppOptions;
		 
		 this.message = {type: 'PHONE', hours: '10-11'};
		 
		 this.$hourArray = ["10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17", "17-18"];
		 
		 this.close = function(){
			 $mdDialog.cancel();
		 };
    		 
		 this.confirm = function(){
			 ctrl.contactForm.$setSubmitted();
			 if(ctrl.contactForm.$invalid){
				$translate("error.validation.fields.text").then(function(message) {
					Notification.error(message);
				});
				return;
			 }
			 
			 ctrl.message.sender = ctrl.message.type == 'PHONE' ? ctrl.message.phone : ctrl.message.email;
			 
			 if(angular.isFunction(data.confirmFn)){
				 Loading.start();
				 
				 $q.when(data.confirmFn({data: ctrl.message})).then(function(data){
					 Notification.message(data.message);
					 $mdDialog.hide();
					 
				 },function(error){
					 Notification.error(error);
				 }).finally(Loading.stop, Loading.stop);
			 }
		 };
    }
})();
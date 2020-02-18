(function() {
	"use strict";
	
	angular.module("itaca.components").component("chHotelContactEdit", {
		bindings: {
			type: "<",
			hotel: "<",
			isDisabled: "<?",
		},
		controller: HotelContactEditCtrl,
		templateUrl : "/tpls/hotel-contact-edit/hotel-contact-edit.tpl",
	});
	
	 /* @ngInject */
	function HotelContactEditCtrl($scope, $mdMedia, Notification, REGEXP, $translate, FormUtils) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.$mdMedia = $mdMedia;
    		ctrl.navigator = Navigator;
    		ctrl.REGEXP = REGEXP;
    		
    		ctrl.isDisabled = _.isBoolean(ctrl.isDisabled) ? ctrl.isDisabled : false;
    		
    		ctrl.$show = false;
    		
    		ctrl.list = [];
    		if(ctrl.type && ctrl.type.value){
    			ctrl.list = _.filter(ctrl.hotel.contactInfos,["type",ctrl.type.value]);
    		}
    	};
    	
    	this.$add = function(){
    		ctrl.contactForm.$setSubmitted();
    		if(ctrl.contactForm.$invalid){
    			$translate("error.validation.fields.text").then(function(message) {
					Notification.error(message);
					FormUtils.focusFirstInvalid(ctrl.contactForm.$name);
				});
    			return;
    		}
    		
    		ctrl.oriList = !_.isNil(ctrl.oriList) ? ctrl.oriList : angular.copy(ctrl.list);
    		
    		ctrl.list.push({type: ctrl.type.value});
    	};
    	
    	this.$remove = function(el){
    		_.pull(ctrl.hotel.contactInfos, el);
    		_.pull(ctrl.list, el);
    	};
    	
    	this.$close = function(){
    		ctrl.list = angular.copy(ctrl.oriList);
    		ctrl.oriList =  [];
    		ctrl.$show = false;
    	};
    	
    	this.$save = function(){
    		ctrl.contactForm.$setSubmitted();
    		if(ctrl.contactForm.$invalid){
    			$translate("error.validation.fields.text").then(function(message) {
					Notification.error(message);
					FormUtils.focusFirstInvalid(ctrl.contactForm.$name);
				});
    			return;
    		}
    		
    		ctrl.oriList =  [];
    		ctrl.$show = false;
    		
    		ctrl.hotel.contactInfos = _.union(ctrl.hotel.contactInfos, ctrl.list);
    	};
    	
    	this.$toggle = function(){
    		ctrl.$show = !ctrl.$show;
    		
    		if(ctrl.$show){
    			ctrl.oriList =  angular.copy(ctrl.list);
    			
	    		if(_.isEmpty(ctrl.list)){
	    			ctrl.contactForm.$setPristine();
	    			ctrl.list.push({type: ctrl.type.value});
	    		}
    		}
    		
    	};
	}
})();
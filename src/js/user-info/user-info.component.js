(function() {
	'use strict';
	
	angular.module("itaca.component").component("chUserInfo", {
		bindings: {
			user: "<",
			isDisabled: "<?",
			isClickable: "<?",
		},
		controller: UserInfoCtrl,
		templateUrl : "/tpls/user-info/user-info.tpl",
	});
	
	 /* @ngInject */
	function UserInfoCtrl($scope, $mdMedia, AppOptions, Navigator, REGEXP, CountryAPI) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.$mdMedia = $mdMedia;
    		ctrl.appOptions = AppOptions;
    		ctrl.navigator = Navigator;
    		ctrl.REGEXP = REGEXP;
    		ctrl.user = ctrl.user || {};
    		
    		ctrl.isDisabled = _.isBoolean(ctrl.isDisabled) ? ctrl.isDisabled : false;
    		ctrl.isClickable = _.isBoolean(ctrl.isClickable) ? ctrl.isClickable : false;
    		
    		ctrl.$adeguateUser();
    	};
    	
    	this.$onChanges = function(changesObj){
        	if(changesObj.user){
        		ctrl.$adeguateUser();
        	}
    	};
    	
    	this.$adeguateUser = function(){
    		if(!ctrl.user){
    			return;
    		}
    		
    		if(ctrl.user.name == "$name$"){
    			ctrl.user.name = null;
    		}
    		
    		if(ctrl.user.surname == "$surname$"){
    			ctrl.user.surname = null;
    		}
    		
    		//Adeguo il countryIso
    		if(ctrl.user.nationality && !ctrl.user.countryIso){
    			CountryAPI.getByName(ctrl.user.nationality).then(function(response){
    				if(response && !_.isEmpty(response)){
    					ctrl.user.countryIso = response[0] && response[0].alpha2Code ? response[0].alpha2Code : null;
    				}
        		});
    		}
    	};
	}
})();
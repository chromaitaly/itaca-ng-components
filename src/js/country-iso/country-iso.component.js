(function() {
	'use strict';
	
	angular.module("itaca.component").component('chCountryIso', {
		bindings: {
			iso: '<',
			currentLang: "<?",
		},
		controller: CountryCtrl,
		template : 
			"<div>" +
				"<img ng-src=\"{{$ctrl.country.flag}}\" class=\"ch-country-autocomplete-flag\">" +
				"<span>{{$ctrl.country.text}}</span>" +
			"</div>"
	});
    
	 /* @ngInject */
    function CountryCtrl(CountryAPI, AppOptions) {
		var ctrl = this;
		
    	this.$onInit = function(){
			ctrl.currentLang = ctrl.currentLang || AppOptions.currentLang;
			
			ctrl.$getCountry();
			
		};
		
		this.$getCountry = function(){
			CountryAPI.getByIso(ctrl.iso).then(function(response){
				if(!response){
					return;
				}
				
				ctrl.country = response;
				ctrl.country.text = response.translations[ctrl.currentLang] ? response.translations[ctrl.currentLang] : response.name;
    		});
		};
		
		this.$onChanges = function(changesObj){
    		if(changesObj.iso && !changesObj.iso.isFirstChange()){
    			ctrl.$getCountry();
    		}
    	};
		
    }
})();
(function() {
	'use strict';
	
	angular.module("itaca.components").component("chCountryAutocomplete", {
		require: {
        	ngModelCtrl: 'ngModel' 
        },
		bindings: {
			ngModel: '<',
			isDisabled: "<?",
			isRequired: "<?",
			noCache: "<?",
			minLength: "<?",
			placeholder: "@",
			dropdownPosition: "@",
			clearButton: "<?",
			currentLang: "<?",
		},
		controller: CountryAutocompleteCtrl,
		template : 
			"<ng-form class=\"flex\" name=\"autocompleteForm\">" +
				"<md-autocomplete " +
					" class=\"ch-contry-autocomplete\" " +
					" md-input-name=\"country\" " +
          			" ng-disabled=\"$ctrl.isDisabled\" "+
          			" ng-required=\"$ctrl.isRequired\" "+
          			" md-no-cache=\"$ctrl.noCache\" "+
          			" md-selected-item=\"$ctrl.selectedItem\" "+
          			" md-search-text=\"$ctrl.searchText\" "+
          			" md-require-match=\"true\" " +
          			" md-match-case-insensitive=\"true\" " +
          			" md-selected-item-change=\"$ctrl.$selectedItemChange(item)\"  "+
          			" md-items=\"item in $ctrl.$querySearch($ctrl.searchText)\" "+
          			" md-item-text=\"item.translations[$ctrl.currentLang] ? item.translations[$ctrl.currentLang] : item.name\"  "+
          			" md-min-length=\"$ctrl.minLength\"  " +
          			" md-floating-label=\"{{'common.nationality'|translate}}\" " +
          			" md-dropdown-position=\"$ctrl.dropdownPosition\" " +
          			" md-clear-button=\"$ctrl.clearButton\" " +
          			" placeholder=\"$ctrl.placeholder\">  "+
  					"<md-item-template>" +
  						"<img ng-src=\"{{item.flag}}\" class=\"ch-country-autocomplete-flag\">" + 
  						"<strong md-highlight-text=\"ctrl.searchText\" md-highlight-flags\=\"^i\">{{item.name}}</strong>" +
  						"<span class=\"text-gray-light\">,&nbsp;{{item.nativeName}}</span>" +
  						"<md-divider></md-divider>" +
					"</md-item-template>" +
					"<div ng-messages=\"autocompleteForm.country.$error\">" +
						"<div ng-message=\"required\"><span translate=\"error.required\"></span></div>" +
						"<div ng-message=\"minlength\"><span translate=\"error.field.generic.minlength\" translate-values=\"{count: $ctrl.minLength}\"></span></div>" +
						"<div ng-message=\"connection\"><span translate=\"error.country.not.found\"></span></div>" +
						"<div ng-message=\"md-require-match\"><span translate=\"error.country.not.match\"></span></div>" +
					"</div>" +
				"</md-autocomplete>" +
			"</ng-form>"
	});
	
	 /* @ngInject */
	function CountryAutocompleteCtrl($scope, $mdMedia, AppOptions, $translate, CountryAPI) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.isDisabled = ctrl.isDisabled || false;
    		ctrl.isRequired = ctrl.isRequired || false;
    		ctrl.noCache = ctrl.noCache || false;
    		
    		ctrl.currentLang = ctrl.currentLang || AppOptions.currentLang;
    		
    		ctrl.clearButton =  _.isBoolean(ctrl.clearButton) ? ctrl.clearButton : false;
    		
    		ctrl.minLength = ctrl.minLength && Number.isFinite(ctrl.minLength) ? parseInt(ctrl.minLength) : 3;
    		
    		if(!ctrl.placeholder){
    			$translate('').then(function(translate){
    				ctrl.placeholder = translate;
    			});
    		}
    		
    		ctrl.selectedItem  = null;
    		
    		ctrl.precopileSearchText();
    	};
    	
    	this.precopileSearchText = function(){
    		if(ctrl.ngModel){
    			
    			if(ctrl.ngModel.length > 2){
    				CountryAPI.getByName(ctrl.ngModel).then(function(response){
    					var country = response;
    					if(_.isArray(response)){
	    					country = _.find(response, function(item){
	    						return item && !_.isEmpty(item.translations) && item.translations[ctrl.currentLang];
	        				});
    					} 
        				
        				if(country){
        					ctrl.searchText = country.translations[ctrl.currentLang] ? country.translations[ctrl.currentLang] : country.name;
        				}
    	    		});
    			} else if(ctrl.ngModel.length == 2){
    				CountryAPI.getByIso(ctrl.ngModel).then(function(response){
						var country = response;
    					if(_.isArray(response)){
	    					country = _.find(response, function(item){
	    						return item && !_.isEmpty(item.translations) && item.translations[ctrl.currentLang];
	        				});
    					} 
    					
        				if(country){
        					ctrl.searchText = country.translations[ctrl.currentLang] ? country.translations[ctrl.currentLang] : country.name;
        				}
    	    		});
    			} else {
    				ctrl.searchText = angular.copy(ctrl.ngModel);
    			}
    		} 
    	};
    	
    	
    	this.$querySearch = function(query){
    		return CountryAPI.getByName(query).then(function(response){
    			ctrl.$setError(false);
    			return response;
    		},function(error){
    			ctrl.$setError(true);
    			return [];
    		});
	    };
	    
	    this.$selectedItemChange = function(country){
	    	if(!country){
    			ctrl.ngModelCtrl.$setViewValue(null);
	    		return;
	    	}
	    	ctrl.ngModelCtrl.$setViewValue(country.alpha2Code);
	    	ctrl.$setError(false);
	    };
	    
	    this.$setError = function(bool){
	    	$scope.autocompleteForm.country.$setValidity('connection', !bool);
	    	ctrl.$$error = bool;
	    	
	    	if(bool){
	    		ctrl.ngModel = null;
    			ctrl.selectedItem  = null;
	    	}
	    };
	}
})();
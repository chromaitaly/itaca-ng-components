(function() {
	'use strict';
	
	angular.module("itaca.components").component("chCityAutocomplete", {
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
		},
		controller: CityAutocompleteCtrl,
		template : 
			"<ng-form class=\"flex\" name=\"cityAutocompleteForm\">" +
				"<md-autocomplete " +
					" class=\"ch-city-autocomplete\" " +
					" md-input-name=\"city\" " + 
          			" ng-disabled=\"$ctrl.isDisabled\" "+
          			" ng-required=\"$ctrl.isRequired\" "+
          			" md-no-cache=\"$ctrl.noCache\" "+
          			" md-selected-item=\"$ctrl.selectedItem\" "+
          			" md-search-text=\"$ctrl.searchText\" "+
          			" md-selected-item-change=\"$ctrl.$selectedItemChange(item)\"  "+
          			" md-items=\"item in $ctrl.$querySearch($ctrl.searchText)\" "+
          			" md-item-text=\"item.description\"  "+
          			" md-min-length=\"$ctrl.minLength\"  " +
          			" md-floating-label=\"{{'common.city'|translate}}\" " +
          			" md-dropdown-position=\"$ctrl.dropdownPosition\" " +
          			" md-clear-button=\"$ctrl.clearButton\" " +
          			" placeholder=\"$ctrl.placeholder\">  "+
  					"<md-item-template>" +
  						"<md-icon class=\"mdi mdi-map-marker-outline material-icons md-24\"></md-icon>" +
  						"<strong md-highlight-text=\"ctrl.searchText\" md-highlight-flags\=\"^i\">{{item.structured_formatting.main_text}}</strong>" +
  						"<span class=\"text-gray-light\">,&nbsp;{{item.structured_formatting.secondary_text}}</span>" +
  						"<md-divider></md-divider>" +
					"</md-item-template>" +
					"<div ng-messages=\"cityAutocompleteForm.city.$error\">" +
						"<div ng-message=\"required\"><span translate=\"error.required\"></span></div>" +
						"<div ng-message=\"minlength\"><span translate=\"error.field.generic.minlength\" translate-values=\"{count: $ctrl.minLength}\"></span></div>" +
						"<div ng-message=\"connection\"><span translate=\"error.city.not.found\"></span></div>" +
						"<div ng-message=\"md-require-match\"><span translate=\"error.city.not.match\"></span></div>" +
					"</div>" +
				"</md-autocomplete>" +
			"</ng-form>"
	});
	
	 /* @ngInject */
	function CityAutocompleteCtrl($scope, $mdMedia, AppOptions, $translate, GoogleAPI) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.isDisabled = ctrl.isDisabled || false;
    		ctrl.isRequired = ctrl.isRequired || false;
    		ctrl.noCache = ctrl.noCache || false;
    		
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
    		if(ctrl.ngModel && ctrl.ngModel.address){
	    			address += ctrl.ngModel.city ? ctrl.ngModel.city  + ", " : '';
	    			address += ctrl.ngModel.province ? ctrl.ngModel.province  + ", " : '';
	    			address += ctrl.ngModel.country ? ctrl.ngModel.country : '';
    			
    			ctrl.searchText = address;
    		} else if(ctrl.ngModel && ctrl.ngModel.addressComplete){
    			ctrl.searchText = ctrl.ngModel.addressComplete;
    		} else {
    			ctrl.searchText = null;
    		}
    	};
    	
    	this.$querySearch = function(query){
    		return GoogleAPI.cities(query).then(function(response){
    			ctrl.$setError(false);
    			return response;
    		},function(error){
    			ctrl.$setError(true);
    		});
	    };
	    
	    this.$selectedItemChange = function(place){
	    	if(!place){
	    		ctrl.ngModelCtrl.$setViewValue(null);
	    		return;
	    	}
	    		
	    	GoogleAPI.placeDetails(place.place_id).then(function(data){
	    		ctrl.$setError(false);

	    		var addressInfo = {};
	    	
	    		 for (var i = 0; i < data.address_components.length; i++) {
	    			 var address = data.address_components[i];
	    			 var type = address.types[0];
	    			 
		    		if(type == 'route'){
		    			addressInfo.street = address.long_name;
		    			continue;
		    		}
		    		
		    		if(type == 'street_number'){
		    			addressInfo.number = address.long_name;
		    			continue;
		    		}
		    		
		    		if(type == 'postal_code'){
		    			addressInfo.zipcode = address.long_name;
		    			continue;
		    		}
		    		
		    		if(type == 'country'){
		    			addressInfo.country = address.long_name;
		    			continue;
		    		}
		    		
		    		if(type == 'locality'){
		    			addressInfo.city = address.long_name;
		    			continue;
		    		}
		    		
		    		if(type == 'administrative_area_level_2'){
		    			addressInfo.province = address.short_name;
		    			continue;
		    		}
		    		
		    		if(type == 'neighborhood'){
		    			addressInfo.district = address.long_name;
		    			continue;
		    		}
		    	}
	    	
		    	addressInfo.lat = data.geometry.location.lat();
		    	addressInfo.lng = data.geometry.location.lng();
		    	addressInfo.offset = data.utc_offset ? parseInt(data.utc_offset)*60 : data.utc_offset;
		    	addressInfo.addressComplete = ctrl.selectedItem;
		    	
		    	ctrl.ngModelCtrl.$setViewValue(addressInfo);
	    	}, function(error){
	    		ctrl.$setError(true);
	    	});
	    };
	    
	    this.$setError = function(bool){
	    	$scope.cityAutocompleteForm.city.$setValidity('connection', !bool);
	    	ctrl.$$error = bool;
	    	
	    	if(bool){
	    		ctrl.ngModelCtrl.$setViewValue(null);
    			ctrl.selectedItem  = null;
	    	}
	    };
	    
	}
})();
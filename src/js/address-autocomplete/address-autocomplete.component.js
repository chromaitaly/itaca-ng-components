(function() {
	"use strict";
	
	angular.module("itaca.components").component("chAddressAutocomplete", {
		require: {
        	ngModelCtrl: "ngModel" 
        },
        bindings: {
			ngModel: '=',
			isDisabled: "<?",
			isRequired: "<?",
			noCache: "<?",
			minLength: "<?",
			label: "@",
			placeholder: "@",
			dropdownPosition: "@",
			clearButton: "<?",
		},
		controller: AddressAutocompleteCtrl,
		template : 
			"<ng-form class=\"flex\" name=\"autocompleteForm\">" +
				"<md-autocomplete " +
					" class=\"ch-address-autocomplete\" " +
					" md-input-name=\"address\" " + 
          			" ng-disabled=\"$ctrl.isDisabled\" "+
          			" ng-required=\"$ctrl.isRequired\" "+
          			" md-no-cache=\"$ctrl.noCache\" "+
          			" md-selected-item=\"$ctrl.selectedItem\" "+
          			" md-search-text=\"$ctrl.searchText\" "+
          			" md-require-match=\"true\" " +
          			" md-match-case-insensitive=\"true\" " +
          			" md-selected-item-change=\"$ctrl.$selectedItemChange(item)\"  "+
          			" md-items=\"item in $ctrl.$querySearch($ctrl.searchText)\" "+
          			" md-item-text=\"item.description\"  "+
          			" md-min-length=\"$ctrl.minLength\"  " +
          			" md-floating-label=\"{{$ctrl.label || ('common.address'|translate)}}\" " +
          			" md-dropdown-position=\"$ctrl.dropdownPosition\" " +
          			" md-clear-button=\"$ctrl.clearButton\" " +
          			" placeholder=\"$ctrl.placeholder\">  "+
  					"<md-item-template>" +
  						"<md-icon class=\"mdi mdi-map-marker-outline material-icons md-24\"></md-icon>" +
  						"<strong md-highlight-text=\"ctrl.searchText\" md-highlight-flags\=\"^i\">{{item.structured_formatting.main_text}}</strong>" +
  						"<span class=\"text-gray-light\">,&nbsp;{{item.structured_formatting.secondary_text}}</span>" +
  						"<md-divider></md-divider>" +
					"</md-item-template>" +
					"<div ng-messages=\"autocompleteForm.address.$error\">" +
						"<div ng-message=\"required\"><span translate=\"error.required\"></span></div>" +
						"<div ng-message=\"minlength\"><span translate=\"error.field.generic.minlength\" translate-values=\"{count: $ctrl.minLength}\"></span></div>" +
						"<div ng-message=\"connection\"><span translate=\"error.address.not.found\"></span></div>" +
						"<div ng-message=\"md-require-match\"><span translate=\"error.address.not.match\"></span></div>" +
					"</div>" +
				"</md-autocomplete>" +
			"</ng-form>"
	});
	
	 /* @ngInject */
	function AddressAutocompleteCtrl($scope, $mdMedia, AppOptions, $translate, GoogleAPI) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.isDisabled = ctrl.isDisabled || false;
    		ctrl.isRequired = ctrl.isRequired || false;
    		ctrl.noCache = ctrl.noCache || false;
    		
    		ctrl.clearButton =  _.isBoolean(ctrl.clearButton) ? ctrl.clearButton : false;
    		
    		ctrl.minLength = ctrl.minLength && Number.isFinite(ctrl.minLength) ? parseInt(ctrl.minLength) : 3;
    		
//    		if(!ctrl.placeholder){
//    			$translate("").then(function(translate){
//    				ctrl.placeholder = translate;
//    			});
//    		}
    		
    		ctrl.selectedItem  = null;
    		
//    		ctrl.precopileSearchText();
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (changesObj.ngModel) {
    			ctrl.precopileSearchText();
    		}
    	};
    	
    	this.precopileSearchText = function(){
    		if(ctrl.ngModel && ctrl.ngModel.address){
    			var address = ctrl.ngModel.address ? ctrl.ngModel.address  + ", " : "";
	    			address += ctrl.ngModel.city ? ctrl.ngModel.city  + ", " : "";
	    			address += ctrl.ngModel.province ? ctrl.ngModel.province  + ", " : "";
	    			address += ctrl.ngModel.country ? ctrl.ngModel.country : "";
    			
    			ctrl.searchText = address;
    		} else if(ctrl.ngModel && ctrl.ngModel.addressComplete){
    			ctrl.searchText = ctrl.ngModel.addressComplete;
    		} else {
    			ctrl.searchText = null;
    		}
    	};
    	
    	this.$querySearch = function(query){
    		return GoogleAPI.addresses(query).then(function(response){
    			ctrl.$setError(false);
    			return response;
    		},function(error){
    			ctrl.$setError(true);
    		});
	    };
	    
	    this.$selectedItemChange = function(place, deepSearch){
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
	    			 
	    			 switch(type){
		    			case "street_address":
		    				addressInfo.address = address.long_name;
		    				break;
		    				
						case "route":
							addressInfo.street = address.long_name;
							break;
						
						case "street_number":
							addressInfo.number = address.long_name;
							break;
							
						case "postal_code":
							addressInfo.zipcode = address.long_name;
							break;
							
						case "country":
							addressInfo.country = address.long_name;
							break;
							
						case "locality":
						case "administrative_area_level_3":
						case "postal_town": 
							addressInfo.city = address.long_name;
							break;
							
						case "administrative_area_level_1":
							addressInfo.region = address.short_name;
							break;
							
						case "administrative_area_level_2":
							addressInfo.province = address.short_name;
							break;
						
						case "neighborhood":
						case "sublocality":
						case "sublocality_level_1":
						case "sublocality_level_2":
						case "sublocality_level_3":
						case "sublocality_level_4":
						case "sublocality_level_5":
							addressInfo.district = address.long_name;
							break;
						}
		    	}
	    	
		    	// via e civico
		    	addressInfo.address = addressInfo.street + (addressInfo.number ? " " + addressInfo.number : "");
		    	
	    		// Place Id di google
	    		addressInfo.placeId = data.place_id;
	    		
	    		//GeoJson (long lat)
	    		addressInfo.geo = {type: "Point", coordinates: []};
	    		addressInfo.geo.coordinates.push(data.geometry.location.lng());
	    		addressInfo.geo.coordinates.push(data.geometry.location.lat());
	    		
	    		addressInfo.offset = parseInt(data.utc_offset_minutes);
		    	addressInfo.addressComplete = ctrl.selectedItem;
		    	
		    	ctrl.ngModelCtrl.$setViewValue(addressInfo);
	    	
	    	}, function(error){
	    		if(deepSearch){
		    		GoogleAPI.textSearch(ctrl.searchText).then(function(data){
		    			ctrl.$selectedItemChange(data[0], true);
		    		}, function(error){
		    			ctrl.$setError(true);
		    		});
	    		}else {
	    			ctrl.$setError(true);
	    		}
	    	});
	    };
	    
	    this.$setError = function(bool){
	    	$scope.autocompleteForm.address.$setValidity("connection", !bool);
	    	ctrl.$$error = bool;
	    	
	    	if(bool){
	    		ctrl.ngModelCtrl.$setViewValue(null);
    			ctrl.selectedItem  = null;
	    	}
	    };
	}
})();
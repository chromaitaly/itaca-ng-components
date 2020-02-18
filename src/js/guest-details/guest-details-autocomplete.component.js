(function() {
	"use strict";
	
	angular.module("itaca.components").component("guestDetailsAutocomplete", {
		require: {
        	ngModelCtrl: "ngModel" 
        },
		bindings: {
			ngModel:  "<",
			list: "<",
			isDisabled: "<?",
			isRequired: "<?",
			noCache: "<?",
			minLength: "<?",
			placeholder: "@",
			label: "@",
			hint: "@",
			dropdownPosition: "@",
			clearButton: "<?",
			currentLang: "<?",
		},
		controller: GuestDetailsAutocompleteCtrl,
		template : 
			"<ng-form class=\"flex\" name=\"autocompleteForm\">" +
				"<md-autocomplete " +
					" class=\"ch-json-autocomplete\" " +
					" md-input-name=\"jsonItem\" " +
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
          			" md-floating-label=\"{{$ctrl.label}}\" " +
          			" md-dropdown-position=\"$ctrl.dropdownPosition\" " +
          			" md-clear-button=\"$ctrl.clearButton\" " +
          			" placeholder=\"$ctrl.placeholder\">  "+
  					"<md-item-template>" +
						"<span md-highlight-text=\"$ctrl.searchText\" md-highlight-flags=\"^i\">{{item.description}}</span>" +
					"</md-item-template>" +
					"<div ng-if=\"$ctrl.hint\" class=\"text-gray-light\">" +
						"<md-icon class=\"mdi mdi-alert-circle-outline text-gray-light md-14\"></md-icon>&nbsp;" +
						"<small ng-bind=\"$ctrl.hint\"></small>" +
					"</div>" +
					"<div ng-messages=\"autocompleteForm.jsonItem.$error\">" +
						"<div ng-message=\"required\"><span translate=\"error.required\"></span></div>" +
						"<div ng-message=\"minlength\"><span translate=\"error.field.generic.minlength\" translate-values=\"{count: $ctrl.minLength}\"></span></div>" +
						"<div ng-message=\"connection\"><span translate=\"error.element.not.found\"></span></div>" +
						"<div ng-message=\"md-require-match\"><span translate=\"error.element.not.match\"></span></div>" +
					"</div>" +
				"</md-autocomplete>" +
			"</ng-form>"
	});
	
	 /* @ngInject */
	function GuestDetailsAutocompleteCtrl($scope, $q, $mdMedia, $timeout, $translate, AppOptions) {
		var ctrl = this;
		
		this.$onInit = function(){
    		ctrl.isDisabled = ctrl.isDisabled || false;
    		ctrl.isRequired = ctrl.isRequired || false;
    		ctrl.noCache = ctrl.noCache || false;
    		ctrl.clearButton =  _.isBoolean(ctrl.clearButton) ? ctrl.clearButton : false;
    		ctrl.minLength = ctrl.minLength && Number.isFinite(ctrl.minLength) ? parseInt(ctrl.minLength) : 0;
    		
    		ctrl.$$all = ctrl.$querySearch(null);
    		
    		ctrl.selectedItem  = null;
    		
    		ctrl.precopileSearchText();
    	};
    	
    	this.precopileSearchText = function(){
			ctrl.searchText = null;
    		
    		if(!_.isNil(ctrl.ngModel)){
	    		var item = _.find(ctrl.list, function(item){
	    			return _.isNumber(ctrl.ngModel) ? (item.code == ctrl.ngModel) : (item.code == ctrl.ngModel || item.description.toLowerCase() == ctrl.ngModel.toLowerCase());
	    		});
	    		
	    		ctrl.searchText = item ? item.description : angular.copy(ctrl.ngModel);
			} 
    		
    	};
		
    	this.$querySearch = function(query){
    		var deferred = $q.defer();
    		var result = null;
    		
    		if(!query && ctrl.$$all){
    			deferred.resolve(ctrl.$$all);
    		}
    		
    		if(!ctrl.list){
    			deferred.reject("error");
    		}
    		
			deferred.resolve(query ? ctrl.list.filter(ctrl.$createFilterFor(query)) : ctrl.list);
			
	        return deferred.promise;
	    };
	    
    	this.$createFilterFor = function(query){
    		var lowercaseQuery = query.toLowerCase();
    		
    		return function filterFn(item) {
    	        return (item.description.toLowerCase().indexOf(lowercaseQuery) === 0);
    	    };
	    };
	    
	    this.$selectedItemChange = function(item){
	    	if(!item){
    			ctrl.ngModelCtrl.$setViewValue("");
	    		return;
	    	}
	    	ctrl.ngModelCtrl.$setViewValue(item.code);
	    };
	    
	    this.$setError = function(bool){
	    	$scope.autocompleteForm.jsonItem.$setValidity("connection", !bool);
	    	ctrl.$$error = bool;
	    	
	    	if(bool){
	    		ctrl.ngModel = null;
    			ctrl.selectedItem  = null;
	    	}
	    };
	}
})();
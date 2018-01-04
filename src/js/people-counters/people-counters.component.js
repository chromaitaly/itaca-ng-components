(function() {
    'use strict';
    
    angular.module("itaca.components").component("chPeopleCounters", {
    	require: {
    		ngModelCtrl: "ngModel"
    	},
    	bindings: {
    		people: "<ngModel",
    		maxPeople: "<",
    		min: "<",
    		max: "<",
    		limits: "<",
    		ageRanges: "<",
    		onChange: "&?"
    	},
		controller: PeopleCountersCtrl,
		templateUrl: "/tpls/people-counters/people-counters.tpl"
    });
    
    function PeopleCountersCtrl($scope, $translate, ReservationUtils) {
    	var ctrl = this;
    	
    	$scope.$on("$localeChanged", ctrl.$generateAgeHints);
    	
    	this.$onInit = function() {
    		// init ngModel
    		ctrl.ngModelCtrl.$overrideModelOptions({allowInvalid: true});
    		ctrl.ngModelCtrl.$formatters.push(ReservationUtils.peopleSummary);
    		ctrl.ngModelCtrl.$validators.min = ctrl.$checkMin;
    		ctrl.ngModelCtrl.$validators.max = ctrl.$checkMax;
    		
    		ctrl.$initWatchers();
    	};
    	
    	this.$onChanges = function(changesObj) {
			if (_.isEmpty(changesObj)) {
				return;
			}
			
			if (changesObj.people || changesObj.maxPeople || changesObj.max || changesObj.limits) {
				ctrl.$manageLimits();
			}
			
			if (changesObj.ageRanges) {
				ctrl.$generateAgeHints();
			}
		};
	
		this.$checkMin = function(modelValue) {
			if (!ctrl.min) {
				return true;
			} 
			
			ctrl.$$guestsCount = ReservationUtils.guestsCount(modelValue);
			
			return ctrl.$$guestsCount.standard >= _.toInteger(ctrl.min);
		};
		
		this.$checkMax = function(modelValue) {
			if (!ctrl.max) {
				return true;
			} 
			
			ctrl.$$guestsCount = ReservationUtils.guestsCount(modelValue);
			
			return ctrl.$$guestsCount.standard <= _.toInteger(ctrl.max);
		};
    	
    	this.$manageLimits = function() {
    		ctrl.limits = ctrl.limits || {};
    		ctrl.limits.adults = ctrl.$normalizeRange(ctrl.limits.adults);
    		ctrl.limits.boys = ctrl.$normalizeRange(ctrl.limits.boys);
    		ctrl.limits.children = ctrl.$normalizeRange(ctrl.limits.children);
    		ctrl.limits.kids = ctrl.$normalizeRange(ctrl.limits.kids);
    		
    		ctrl.$$peopleLimits = angular.copy(ctrl.limits);
    		
    		var maxPeople = ctrl.maxPeople || {
    			adults: ctrl.limits.adults.max, 
    			boys: ctrl.limits.boys.max, 
    			children: ctrl.limits.children.max, 
    			kids: ctrl.limits.kids.max
    		};
    		
    		var peopleAv = ReservationUtils.peopleAvailability(maxPeople, ctrl.people, ctrl.max);
    		ctrl.$$peopleLimits.adults.max = peopleAv.adults;
    		ctrl.$$peopleLimits.boys.max = peopleAv.boys;
    		ctrl.$$peopleLimits.children.max = peopleAv.children;
    		ctrl.$$peopleLimits.kids.max = peopleAv.kids;
    	};
    	
    	this.$generateAgeHints = function() {
    		$translate(["people.adults", "people.boys", "people.children", "people.kids"]).then(function(messages) {
    			ctrl.$$adultsHint = "<span>" + messages["people.adults"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.adults) + ")</small>" : "");
    			ctrl.$$boysHint = "<span>" + messages["people.boys"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.boys) + ")</small>" : "");
    			ctrl.$$childrenHints = "<span>" + messages["people.children"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.children) + ")</small>" : "");
    			ctrl.$$kidsHints = "<span>" + messages["people.kids"] + "</span>" + (ctrl.ageRanges ? "&nbsp;<small>(" + ctrl.$generateAgeRangeHtmlLabel(ctrl.ageRanges.kids) + ")</small>" : "");
    		});
    	};
    	
    	this.$generateAgeRangeHtmlLabel = function(ageRange) {
    		if (!ageRange || (!ageRange.min && !ageRange.max)) {
    			return;
    		}
    		
    		var label = "", key = ""; 
    		
    		if (!_.isNil(ageRange.min) && !_.isNil(ageRange.max)) {
    			// min e max
    			key = "date.years.range.abbr";
    			
    		} else if (!_.isNil(ageRange.min)) {
    			// solo min
    			key = "date.years.min.range.abbr";
    		
    		} else {
    			// solo max
    			key = "date.years.max.range.abbr";
    		}
    		
    		label = $translate.instant(key, ageRange);
    		
    		return label;
    	};
   
    	this.$normalizeRange = function(range) {
    		if (!range) {
    			range = {};
    		}
    		
    		range.min = range.min || 0;
    		
    		return range;
    	};
    	
    	this.$initWatchers = function() {
			$scope.$watchCollection(function() {
				return ctrl.people;
			}, function(newVal, oldVal) {
				if (_.isEqual(newVal, oldVal)) {
					return;
				}
				
				ctrl.$manageLimits();
				ctrl.ngModelCtrl.$setDirty();
				ctrl.ngModelCtrl.$validate();				
				ctrl.ngModelCtrl.$valid && ctrl.onChange && ctrl.onChange({$people: ctrl.people});
			});
			
//			$scope.$watchCollection(function() {
//				return ctrl.limits;
//				
//			}, function(newVal, oldVal) {
//				if (_.isEqual(newVal, oldVal)) {
//					return;
//				}
//				
//				ctrl.$manageLimits();
//			});
		};
    }
})();
/**
 * People Input
 */
(function() {
	"use strict";
	
	angular.module("itaca.components").component("chPeopleInput", {
        bindings: {
        	containerClass: "@",
        	inputLabel: "@",
        	inputName: "@",
        	people: "=",
        	ngRequired: "<?",
        	mdNoAsterisk: "<?",
        	hasClose: "<?"
        },
        controller: PeopleInputCtrl,
        template: 
        	"<ng-form name=\"chPeopleInputForm\">" +
	        	"<md-input-container class=\"{{$ctrl.containerClass}}\">" +
			        "<label><span ng-if=\"!$ctrl.inputLabel\" translate=\"people.people\"></span><span ng-if=\"$ctrl.inputLabel\" ng-bind=\"$ctrl.inputLabel\"></span></label>" +
			        "<input type=\"area\" name=\"{{$ctrl.inputName}}\" ng-model=\"$ctrl.$$peopleSummary\" class=\"clickable\" on-click-panel=\"\"/tpls/pax-counters.part\"\" has-backdrop=\"false\"" +  
			        	"disable-parent-scroll=\"true\" data=\"$ctrl.$$data\" readonly ng-required=\"$ctrl.ngRequired\" md-no-asterisk=\"mdNoAsterisk\" has-close=\"$ctrl.hasClose\">" +
			        "<div ng-messages=\"chPeopleInputForm[$ctrl.inputName].$error\">" +
		          		"<span ng-message=\"required\"><span translate=\"error.required\"></span></span>" +
		          	"</div>" +
		        "</md-input-container>" +
	        "</ng-form>"
	});

	/* @ngInject */
	function PeopleInputCtrl($scope, ReservationUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
			ctrl.containerClass = ctrl.containerClass || "md-block";
			ctrl.people = ctrl.people || {}; 
			ctrl.inputName = ctrl.inputName || "people";
			ctrl.mdNoAsterisk = _.isNil(ctrl.mdNoAsterisk) ? false : ctrl.mdNoAsterisk;
			
			ctrl.$$data = {people: ctrl.people};
			
			ctrl.$initWhatches();
		};
		
		this.$observeOriginal = function() {
			ctrl.$$data = ctrl.$$data || {};
			ctrl.$$data.people = ctrl.people;
		};
		
		this.$observeWorking = function() {
			_.assign(ctrl.people, ctrl.$$data.people);
			
			ReservationUtils.peopleSummary(ctrl.$$data.people).then(function(summary) {
				ctrl.$$peopleSummary = summary;
			});
		};
		
		this.$initWhatches = function() {
			$scope.$watchCollection(function() {
				return ctrl.people;
			}, ctrl.$observeOriginal);
			
			$scope.$watchCollection(function(){ 
				return ctrl.$$data.people;
			}, ctrl.$observeWorking);
		};
	}
})();
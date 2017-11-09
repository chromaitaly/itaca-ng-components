(function() {
	'use strict';
	
	angular.module("chroma.components").component('chPeoplePicker', {
		bindings: {
			buttonClass: "@",
        	wrapperClass: "@",
//        	counterBtnClass: "@",
//	  		counterBtnActiveClass: "@",
//	  		iconClass: "@",
//	  		iconActiveClass: "@",
        	label: "@",
        	labelClass: "@",
        	people: "=",
        	fieldName: "@",
        	ngRequired: "<?",
        	ngDisabled: "<?",
	    	hasBackdrop: "<?",
	    	hasConfirm: "<?",
	    	hasClose: "<?",
	    	disableParentScroll: "<?",
	    	disableBodyScroll: "<?",
	    	clickOutsideToClose: "<?",	    	
	    	onClose: "&?",
	    	zIndex: "@",
	    	fullscreen: "<?",
	    	maxCount: "<?",
	    	minCount: "<?",
	    	errorMessages: "<?",
	    	showErrorIcon: "<?"
    	},
		controller: PeoplePickerCtrl,
		template: 
			"<ng-form name=\"chPeoplePickerForm\" class=\"flex no-padding layout-column\">" +
			  	"<md-button class=\"ch-people-counter-button flex layout-padding no-padding minimal-button text-lowercase text-center {{$ctrl.buttonClass}}\" aria-label=\"Change people\" ng-disabled=\"$ctrl.ngDisabled\" ng-click=\"$ctrl.$openPanel($event)\">" +
			  		"<div class=\"{{$ctrl.wrapperClass}}\">" +
			  			"<div ng-if=\"$ctrl.label\" class=\"md-padding\">" +
							"<div class=\"{{$ctrl.labelClass}} text-initial text-wrap row-1\" ng-class=\"{\"text-small\": $ctrl.$$hasPeople}\"><span ng-bind-html=\"$ctrl.label\"></span></div>" +
						"</div>" +
						"<div ng-show=\"$ctrl.$$hasPeople\" class=\"md-subhead text-wrap row-mini\">" +
							"<strong><ch-people-summary people=\"$ctrl.people\"></ch-people-summary></strong>" +
						"</div>" +
					"</div>" +
					"<input type=\"hidden\" name=\"{{$ctrl.fieldName}}\" ng-model=\"$ctrl.people\" ng-required=\"$ctrl.ngRequired\">" +
					"<div ng-messages=\"chPeoplePickerForm[$ctrl.fieldName].$error\" ng-show=\"chPeoplePickerForm[$ctrl.fieldName].$dirty\" class=\"text-danger text-small text-center row-1 no-padding layout-column layout-padding-sm\">"+
						"<div ng-message=\"required\">"+
	          				"<md-icon ng-if=\"$ctrl.showErrorIcon\" class=\"mdi mdi-alert-outline material-icons md-18 text-danger\"></md-icon>"+
	          				"<span class=\"text-wrap\" translate=\"error.required\"></span>"+
	          			"</div>"+
	          			"<div ng-message=\"min\">"+
	          				"<md-icon ng-if=\"$ctrl.showErrorIcon\" class=\"mdi mdi-alert-outline material-icons md-18 text-danger\"></md-icon>"+
	          				"<span class=\"text-wrap\" ng-if=\"$ctrl.errorMessages.min\" ng-bind=\"$ctrl.errorMessages.min\">"+
	          				"</span><span class=\"text-wrap\" ng-if=\"!$ctrl.errorMessages.min\" translate=\"error.field.min\" translate-value-num=\"{{$ctrl.minCount}}\"></span>"+
	          			"</div>"+
			        "</div>"+
				"</md-button>" +
		    "</ng-form>"
	});

	/* @ngInject */
	function PeoplePickerCtrl($scope, $element, $mdPanel, ReservationUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
	    	ctrl.fieldName = ctrl.fieldName || "people";
	    	ctrl.clickOutsideToClose = ctrl.clickOutsideToClose || true;
	    	ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
	    	ctrl.buttonClass = ctrl.buttonClass || "no-margin";
//	    	ctrl.counterBtnClass = ctrl.counterBtnClass || "md-fab md-mini";
//        	ctrl.counterBtnActiveClass = ctrl.counterBtnActiveClass || "md-primary";
        	ctrl.labelClass = ctrl.labelClass || "text-gray-light";
        	
        	ctrl.$$xPosition = "CENTER";
	    	ctrl.$$yPosition = "BELOW";
	    	ctrl.$$panelClass = "bg-white md-whiteframe-15dp";
	    	
	    	var position = $mdPanel.newPanelPosition()
		        .relativeTo($element)
		        .addPanelPosition($mdPanel.xPosition[ctrl.$$xPosition], $mdPanel.yPosition[ctrl.$$yPosition]);
	    	
	    	ctrl.$$panelConfig = {
				attachTo: angular.element(document.body),
			    controller: "basePeopleCountPanelCtrl",
			    controllerAs: 'ctrl',
			    templateUrl: '/tpls/pax-counters.part',
			    position: position,
			    clickOutsideToClose: ctrl.clickOutsideToClose,
			    disableParentScroll: ctrl.disableParentScroll,
			    hasBackdrop: ctrl.hasBackdrop,
			    fullscreen: _.isBoolean(ctrl.fullscreen) ? ctrl.fullscreen : false,
			    panelClass: ctrl.$$panelClass,
			    locals: {data: ctrl.$$workingData, maxCount: ctrl.maxCount, hasConfirm: ctrl.hasConfirm, hasClose: ctrl.hasClose},
			    onCloseSuccess: function(panelRef, closeReason) {
			    	var tbc = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false;
			    	
			    	if (!tbc || (_.isBoolean(closeReason) && closeReason)) {
			    		_.assign(ctrl.people, ctrl.$$workingData.people);
			    		ctrl.onClose && ctrl.onClose({people: ctrl.people});
			    	}
			    	
			    	// sblocco scroll body
			    	(ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(false);
			    },
			    onOpenComplete: function() {
			    	// blocco scroll body
			    	(ctrl.hasBackdrop || ctrl.disableBodyScroll) && ctrl.$toggleBodyScroll(true);
			    }
	    	 };
	    	
	    	 if (ctrl.zIndex) {
	    		 ctrl.$$panelConfig.zIndex = ctrl.zIndex;
	    	 }
	    	
	    	ctrl.$initWatches();
		};
		
		this.$toggleBodyScroll = function(block) {
			angular.element(document.body).css({overflow: block ? "hidden" : "auto"});
    	};
        	
    	this.$openPanel = function(ev) {
    		 ctrl.people = ctrl.people || {};
    		 ctrl.$$workingData = {people: angular.copy(ctrl.people)};
    		  	    		 
    		 ctrl.$$panelConfig.openFrom = ev;
    		 ctrl.$$panelConfig.locals = {hasConfirm: ctrl.hasConfirm, hasClose: ctrl.hasClose};
    		 // riassegno il $$workingData
    		 ctrl.$$panelConfig.locals.data = ctrl.$$workingData;
    		 ctrl.$$panelConfig.locals.maxCount = ctrl.maxCount;
    		 
    		 // apro il pannello
    		 $mdPanel.open(ctrl.$$panelConfig);
    	};
	   
    	this.$checkPeople = function(){
    		ctrl.$$hasPeople = ctrl.people && (ctrl.people.adults || ctrl.people.boys || ctrl.people.children || ctrl.people.kids);
    		var mc = ctrl.chPeoplePickerForm[ctrl.fieldName];
    		
    		if (mc) {
    			ctrl.$$hasPeople && mc.$setDirty();
    			
	    		if (ctrl.minCount) {
	    			var count = ReservationUtils.guestsCount(ctrl.people);
	    			
	    			if (count && count.standard < ctrl.minCount) {
	    				mc.$setValidity("min", false);
	    				
	    			} else {
	    				mc.$setValidity("min", true);
	    			}
	    		}
    		}
    	};
    	 
    	this.$initWatches = function() {
	    	 $scope.$watchCollection(function() {
	    		 return ctrl.people;
	    		 
	    	 }, function(newVal, oldVal) {
	    		 ctrl.$checkPeople();
	    	 });
	    	 
	    	 $scope.$watchCollection(function() {
	    		 return ctrl.minCount;
	    		 
	    	 }, function(newVal, oldVal) {
	    		 ctrl.$checkPeople();
	    	 });
    	};
	}
})();
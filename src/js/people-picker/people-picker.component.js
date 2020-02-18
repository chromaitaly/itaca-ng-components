(function() {
	"use strict";
	
	angular.module("itaca.components").component("chPeoplePicker", {
		bindings: {
			buttonClass: "@",
        	wrapperClass: "@",
        	panelClass: "@",
        	iconClass: "@",
			iconFontSet: "@",
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
		controller: PeoplePickerTriggerCtrl,
		templateUrl: "/tpls/people-picker/people-picker-trigger.tpl"			
	});

	/* @ngInject */
	function PeoplePickerTriggerCtrl($scope, $element, $mdPanel, $mdMedia, ReservationUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
	    	ctrl.fieldName = ctrl.fieldName || "people";
	    	ctrl.clickOutsideToClose = ctrl.clickOutsideToClose || true;
	    	ctrl.hasBackdrop = _.isNil(ctrl.hasBackdrop) ? false : ctrl.hasBackdrop;
	    	ctrl.buttonClass = ctrl.buttonClass || "no-padding no-margin layout-padding";
	    	ctrl.wrapperClass = ctrl.wrapperClass || "md-padding";
        	ctrl.labelClass = ctrl.labelClass || "text-gray-light";
        	
	    	ctrl.panelClass =  ctrl.panelClass || "bg-white md-whiteframe-15dp";
	    	
	    	var position = $mdPanel.newPanelPosition()
		        .relativeTo($element)
		        .addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.BELOW);
	    	
	    	ctrl.$$panelConfig = {
				attachTo: angular.element(document.body),
			    controller: PeoplePickerCtrl,
			    controllerAs: "$ctrl",
			    templateUrl: "/tpls/people-picker/people-picker.tpl",
			    position: position,
			    clickOutsideToClose: ctrl.clickOutsideToClose,
			    disableParentScroll: ctrl.disableParentScroll,
			    hasBackdrop: ctrl.hasBackdrop,
			    fullscreen: _.isBoolean(ctrl.fullscreen) ? ctrl.fullscreen : false,
			    panelClass: ctrl.panelClass,
			    locals: {data: ctrl.$$workingData, maxCount: ctrl.maxCount, hasConfirm: ctrl.hasConfirm, hasClose: ctrl.hasClose},
			    onCloseSuccess: function(panelRef, closeReason) {
			    	var tbc = _.isBoolean(ctrl.hasConfirm) ? ctrl.hasConfirm : false;
			    	
			    	if (!tbc || (_.isBoolean(closeReason) && closeReason)) {
			    		ctrl.people = angular.copy(ctrl.$$workingData.people);
//			    		_.assign(ctrl.people, ctrl.$$workingData.people);
			    		
			    		ctrl.onClose && ctrl.onClose({$people: ctrl.people});
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
	    	
	    	ctrl.$initWatchers();
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
    		var mc = $scope.chPeoplePickerForm[ctrl.fieldName];
    		
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
    	 
    	this.$initWatchers = function() {
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
	
	/* @ngInject */
	function PeoplePickerCtrl($scope, mdPanelRef){
		var ctrl = this;
		
		this.$init = function(){
			ctrl.$peopleCount(ctrl.data.people);
		};
		
		this.$peopleCount = function(peopleObj){
			if(!ctrl.maxCount || !peopleObj){
				return;
			}
			
			var tot = 0;
			if(!_.isNil(peopleObj.adults) && peopleObj.adults > 0){
				tot += parseInt(peopleObj.adults);
			}
			if(!_.isNil(peopleObj.children) && peopleObj.children > 0){
				tot += parseInt(peopleObj.children);
			}
			if(!_.isNil(peopleObj.boys) && peopleObj.boys > 0){
				tot += parseInt(peopleObj.boys);
			}
			if(!_.isNil(peopleObj.kids) && peopleObj.kids > 0){
				tot += parseInt(peopleObj.kids);
			}
			
			ctrl.data.plusDisabled = tot >= ctrl.maxCount ? true: false;
		};
		
		$scope.$watchCollection(function() {
			return ctrl.data.people;
		}, ctrl.$init);
		
		// Init
		ctrl.$init();
		
		this.cancel = function() {
			mdPanelRef && mdPanelRef.close(false);
	    };
	    
	    this.confirm = function() {
			mdPanelRef && mdPanelRef.close(true);
	    };
	}
})();
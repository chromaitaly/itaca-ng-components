(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRatesheetRoomTypeRateLos", {
    	require: {
    		ratesheetRoomTypeCtrl: "^chRatesheetRoomType"
    	},
    	bindings: {
    		rate: "<",
    		ratePlan: "<",
    		losType: "@",
    		min: "<",
    		max: "<",
    		mode: "@",
    		placeholder: "@",
    		ngDisabled: "<",
    		onChange: "&?",
    		onOpenBulkEdit: "&?"
    	},
		controller: RatesheetRoomTypeRateLosCtrl,
    	templateUrl: "/tpls/ratesheet/ratesheet-room-type-rate-los.tpl"
    });
    
    /* @ngInject */
    function RatesheetRoomTypeRateLosCtrl($scope, $element, $timeout, $mdMedia, $mdPanel) {
    	
    	this.$mdMedia = $mdMedia;
    	
    	var ctrl = this;
    	
    	this.$onInit = function() {
    	};
    	
    	this.$onChanges = function(changesObj) {
    		if (changesObj.mode) {
    			this.mode = _.includes(["view", "edit"], this.mode) ? this.mode : "view";
    		}
    	};
    	
    	this.$openMenu = function(ev) {
    		if (ctrl.ngDisabled) {
    			return;
    		}
    		
			var el = angular.element(ev.srcElement);
    		 
    		var position = $mdPanel.newPanelPosition()
    			.relativeTo(el)
    			.addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);

    		var config = {
	    	    attachTo: angular.element(document.body),
	    	    controller: ["$scope", "mdPanelRef", function($scope, mdPanelRef) {
	    	    	this.mdPanelRef = mdPanelRef;
	    	    	
	    	    	var ctrl = this;
	    	    	
	    	    	this.$close = function(ev, action) {
	    	    		mdPanelRef.close().then(function() {
	    	    			ctrl.onClose(ev, action);
	    	    		});
	    	    	};
	    	    }],
	    	    controllerAs: '$ctrl',
	    	    locals: {
	    	    	onClose: ctrl.$manageMenuAction
    	    	},
    	    	templateUrl: "/tpls/ratesheet/ratesheet-cell-menu.tpl",
    	        panelClass: "md-whiteframe-z2 bg-white",
	    	    position: position,	    	   
	    	    openFrom: ev,
	    	    clickOutsideToClose: true,
	    	    escapeToClose: true
    		};
	
    		$mdPanel.open(config);
    	};
    	
    	this.$manageMenuAction = function(ev, action) {
    		switch(action) {
			case "edit":
				ctrl.mode = "edit";
				$timeout(ctrl.$focusInput);
				break;
			case "bulk-edit":
				ctrl.onOpenBulkEdit && ctrl.onOpenBulkEdit({$event: ev, $ratePlan: ctrl.ratePlan});
			};
    	};
    	
    	this.$focusInput = function() {
    		var el = $element[0].querySelector("input")
    		
    		if (el){
    			el.focus();
    		}   			
    	};
    }
})();
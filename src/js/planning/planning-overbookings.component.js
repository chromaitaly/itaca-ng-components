(function() {
	'use strict';

	angular.module("itaca-ai").component("chPlanningOverbookings", {
		require : {
			chPlanningCtrl : "^^chPlanning"
		},
		bindings : {
			date: "<",
			overbookings: "<",
			daySize: "<",
			onClick: "&?"
		},
		controller : PlanningOverbookingsCtrl,
		templateUrl : "/tpls/planning/planning-overbookings.tpl"
	});

	/* @ngInject */
	function PlanningOverbookingsCtrl($scope, $mdMedia, $mdPanel) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.$onInit = function() {
			ctrl.$$overbookingsPanelConfig = {
				attachTo: angular.element(document.body),
			    controller: PlanningOverbookingsPanelCtrl,
			    controllerAs: "$ctrl",
			    templateUrl: "/tpls/planning/planning-overbookings-panel.tpl",
			    clickOutsideToClose: true,
			    escapeToClose: true,
			    focusOnOpen: true,
			    trapFocus: true,
			    disableParentScroll: true,
			    hasBackdrop: true,
			    fullscreen: false,
			    panelClass: "ch-planning-overbookings-panel md-whiteframe-5dp",
			};
		};
		
		this.$showOverbookings = function(ev) {
			var targetEl = angular.element(ev.target);
			
			var position = $mdPanel.newPanelPosition()
		        .relativeTo(angular.element(targetEl))
		        .addPanelPosition($mdPanel.xPosition.CENTER, $mdPanel.yPosition.CENTER);
			
			var animation = $mdPanel.newPanelAnimation()
	          .openFrom(targetEl)
	          .duration(200)
	          .closeTo(targetEl)
	          .withAnimation($mdPanel.animation.SCALE);
					    	
			ctrl.$$overbookingsPanelConfig.position = position;
			ctrl.$$overbookingsPanelConfig.animation = animation;
			ctrl.$$overbookingsPanelConfig.targetEvent = ev;
			ctrl.$$overbookingsPanelConfig.openFrom = ev;
			ctrl.$$overbookingsPanelConfig.locals = {date: ctrl.date, overbookings: ctrl.overbookings, onClick: ctrl.onClick};
			 
			// apro il pannello 
			$mdPanel.open(ctrl.$$overbookingsPanelConfig);
		};
	}
	
	/* @ngInject */
	function PlanningOverbookingsPanelCtrl($scope, mdPanelRef) {
		var ctrl = this;
		
		this.$init = function() {
			ctrl.$$overbookings = _.map(ctrl.overbookings, function(overbooking) {
				var copy = angular.copy(overbooking); 
				copy.reservation.$style = {width: "100%", position: "initial"};
				return copy;
			});
		};
		
		this.$close = function() {
			mdPanelRef && mdPanelRef.close();
	    };
	    
	    this.$init();
	}
})();
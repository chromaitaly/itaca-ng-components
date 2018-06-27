(function() {
	'use strict';

	angular.module("itaca.components").component("chPlanningHeader", {
		require : {
			chPlanningCtrl : '^^chPlanning'
		},
		bindings : {},
		controller : PlanningHeaderCtrl,
		templateUrl : "/tpls/planning/planning-header.tpl"
	});

	/* @ngInject */
	function PlanningHeaderCtrl($scope) {
		var ctrl = this;

		this.$onInit = function() {
			ctrl.$$currentView = ctrl.chPlanningCtrl.$$currentView;
			ctrl.$$startDate = ctrl.chPlanningCtrl.$$startDate;
		};
		
		this.$onMonthChange = function() {
			// TODO cambiare sfondo in base al mese
			var month = moment(ctrl.$$startDate).month();
			
			var bgUrl = "resources/public/img/seasons/";
			
			if (month >= 3 && month <= 6) {
				// PRIMAVERA
				bgUrl += "spring.jpg";
				
			} else if (month >= 3 && month <= 6) {
				// ESTATE
				bgUrl += "summer.jpg";
				
			} else if (month >= 3 && month <= 6) {
				// AUTUNNO
				bgUrl += "autumn.jpg";
				
			} else {
				// INVERNO
				bgUrl += "winter.jpg";
			}
			
			ctrl.$$bgImage = "url(" + bgUrl + ")";
		};

		this.$goToToday = function() {
			ctrl.chPlanningCtrl.$setStartDate();
		};

		this.$dailyView = function() {
			ctrl.chPlanningCtrl.$setView("D");
		};

		this.$weeklyView = function() {
			ctrl.chPlanningCtrl.$setView("W");
		};

		this.$monthlyView = function() {
			ctrl.chPlanningCtrl.$setView("M");
		};
	}
})();
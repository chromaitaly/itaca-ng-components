(function() {
	'use strict';

	angular.module("itaca.components").component("chPlanningHeader", {
		require : {
			chPlanningCtrl : "^^chPlanning"
		},
		bindings : {
			imgBaseUrl: "@?"
		},
		controller : PlanningHeaderCtrl,
		templateUrl : "/tpls/planning/planning-header.tpl"
	});

	/* @ngInject */
	function PlanningHeaderCtrl($scope, $mdMedia) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		
		this.DEFAULT_IMG_BASE_URL = "resources/public/img/seasons/";

		this.$onInit = function() {
			ctrl.$initBaseUrl();
			ctrl.$changeBg();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.imgBaseUrl) {
				ctrl.$initBaseUrl();
			}
		};
		
		this.$initBaseUrl = function() {
			ctrl.imgBaseUrl = ctrl.imgBaseUrl || ctrl.DEFAULT_IMG_BASE_URL;
			// rimuovo eventuale / iniziale
			_.startsWith(ctrl.imgBaseUrl, "/") ? ctrl.imgBaseUrl.substr(1) : ctrl.imgBaseUrl;
			// aggiungo / finale se non c'è
			_.endsWith(ctrl.imgBaseUrl, "/") ? ctrl.imgBaseUrl : ctrl.imgBaseUrl + "/";
		};
		
		this.$onMonthChange = function() {
			ctrl.chPlanningCtrl.$setStartDate(ctrl.chPlanningCtrl.$$startDate);
			ctrl.$changeBg();
		};
		
		this.$getMonthLabel = function() {
			var months = ctrl.chPlanningCtrl.$getSelectedMonths();
			
			var label = "";
			
			_.forEach(months, function(month, idx) {
				var month = moment({month: months[idx], day: 1}).format("MMMM");
				label += idx > 0 ? " - " + month : month;
			});
			
			return label;
		};
		
		this.$changeBg = function() {
			var month = moment(ctrl.chPlanningCtrl.$$startDate).month();
			
			var bgImg = "";
			
			if (month >= 2 && month <= 4) {
				// PRIMAVERA
				bgImg = "spring.png";
				
			} else if (month >= 5 && month <= 7) {
				// ESTATE
				bgImg = "summer.png";
				
			} else if (month >= 8 && month <= 10) {
				// AUTUNNO
				bgImg = "autumn.png";
				
			} else {
				// INVERNO
				bgImg = "winter.png";
			}
			
			ctrl.$$bgImage = "url(" + ctrl.imgBaseUrl + bgImg + ")";
		};

		this.$goToToday = function() {
			ctrl.chPlanningCtrl.$setStartDate();
			ctrl.$changeBg();
		};
		
		this.$prevWeek = function() {
			ctrl.chPlanningCtrl.$setStartDate(moment(ctrl.chPlanningCtrl.$$startDate).subtract(1, "weeks"));
			ctrl.$changeBg();
		};
		
		this.$nextWeek = function() {
			ctrl.chPlanningCtrl.$setStartDate(moment(ctrl.chPlanningCtrl.$$startDate).add(1, "weeks"));
			ctrl.$changeBg();
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
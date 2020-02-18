(function() {
	"use strict";
	
	angular.module("itaca.components").component("chCancellationPolicySummary", {
		bindings: {
			policy: "<",
			hideTitle: "<",
			size: "@",
			mainClass: "@",
			titleClass: "@",
			contClass: "@"
		},
		controller: CancellationPolicySummaryCtrl,
		templateUrl: "/tpls/cancellation-policy-summary/cancellation-policy-summary.tpl"
	});
	
	 /* @ngInject */
	function CancellationPolicySummaryCtrl($scope, ReservationUtils) {
		var ctrl = this;
	
		this.$onInit = function() {
			ctrl.$checkType();
			ctrl.$checkGracePeriod();
			ctrl.$createDeadlineMessageKey();
		};
		
		$scope.$watchCollection(function() {
			return _.get(ctrl.policy, "deadline");
			
		}, function() { 
			ctrl.$createDeadlineMessageKey() 
		});
		
		$scope.$watchCollection(function() {
			return _.get(ctrl.policy, "reservationPenalty");
		
		}, function() { 
			ctrl.$checkGracePeriod() 
		});
		
		$scope.$watchCollection(function() {
			return _.get(ctrl.policy, "checkinPenalty");
		
		}, function() { 
			ctrl.$checkType();
		});
		
		this.$onChanges = function(changesObj) {
			if (changesObj.policy) {
				ctrl.$checkType();
				ctrl.$checkGracePeriod();
				ctrl.$createDeadlineMessageKey();
			}
		};
		
		this.$checkType = function() {
			if (ctrl.policy) {
				ctrl.$$type = ReservationUtils.isFreeCancellationPolicy(ctrl.policy) ? "FREE" : 
					ReservationUtils.isNotRefundablePolicy(ctrl.policy) ? "NOT_REFUNDABLE" : "CUSTOM";
			}
		};
		
		this.$checkGracePeriod = function() {
			ctrl.$$gracePeriod = !ctrl.policy || !ctrl.policy.reservationPenalty || (ctrl.policy.reservationPenalty.chargeNights == 0 && !ctrl.policy.reservationPenalty.percentage && (!ctrl.policy.reservationPenalty.chargeAmount || !ctrl.policy.reservationPenalty.chargeAmount.finalAmount));
		};
		
		this.$createDeadlineMessageKey = function() {
			ctrl.$$deadlineKey = ctrl.policy && ctrl.policy.deadline ? (ctrl.policy.deadline.unit == "DAYS" ? "date.day" : ctrl.policy.deadline.unit == "HOURS" ? "date.hour" : "date.month") + (ctrl.policy.deadline.count > 1 ? "s" : "") : null;
		};
	}
})();
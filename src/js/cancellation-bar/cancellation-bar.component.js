/**
 * Cancellation Bar
 */
(function() {
	"use strict";
	
	angular.module("itaca.components").component("chCancellationBar", {
        bindings: {
        	creationDate: "<",
        	checkinDate: "<",
        	limitDate: "<?",
        	feeAmount: "<?",
        	offsetSeconds: "<?",
        	timeZoneId: "@",
        	startLabel: "@",
        	endLabel: "@",
        	penaltyCancelLabel: "@",
        	freeCancelLabel: "@",
        	limitCancelLabel: "@"
        },
        controller: CancellationBarCtrl,
        template:
        	"<div class=\"ch-cancellation-bar-container\">"+
				"<div class=\"summary-label\">"+ 
	    			"<strong ng-if=\"!$ctrl.$$inPenalty\" class=\"text-success\">"+
	    				"<span ng-if=\"$ctrl.finalLimitDate\">"+
		    				"<span>{{$ctrl.limitCancelLabel}}</span>&nbsp;"+
							"<span ng-if=\"$ctrl.daysToLimit\">{{$ctrl.daysToLimit|amDurationFormat : \"days\"}}</span>&nbsp;"+
							"<span ng-if=\"!$ctrl.daysToLimit\" class=\"text-lowercase\" translate=\"date.today\"></span>"+
							"<span class=\"text-gray-light text-normal\">&nbsp;({{$ctrl.finalLimitDate|offsetDate:\"shortDate\":$ctrl.offsetSeconds}}&nbsp;<span class=\"text-lowercase\" translate=\"date.time.to\"></span>&nbsp;{{$ctrl.finalLimitDate|offsetDate:\"shortTime\":$ctrl.offsetSeconds}})</span>"+
						"</span>"+
						"<span ng-if=\"!$ctrl.finalLimitDate\">"+
							"<span>{{$ctrl.freeCancelLabel}}</span>"+
						"</span>"+						
					"</strong>"+
					"<strong ng-if=\"$ctrl.$$inPenalty\" class=\"text-danger\">{{$ctrl.penaltyCancelLabel}}</span></strong>"+
				"</div>"+
				"<div layout layout-padding-sm>"+
					"<div layout=\"column\" layout-align=\"center center\" class=\"no-padding-top no-padding-bottom cursor-help\">"+
						"<md-icon class=\"mdi mdi-book-plus md-18\"></md-icon>"+
						"<small class=\"text-gray-light\">{{$ctrl.$$startDate|utcDate:\"dd/MM\"}}</small>"+
						"<md-tooltip><span ng-if=\"!$ctrl.startLabel\" translate=\"reservation.insert.date\"></span><span ng-if=\"$ctrl.startLabel\">{{$ctrl.startLabel}}</span></md-tooltip>" +
					"</div>" +
					"<div flex class=\"progress-bar\">"+
						"<span ng-if=\"$ctrl.finalLimitDate\" class=\"limit-label cursor-help\" style=\"left:{{$ctrl.$$limitRate}}%\">"+
							"<span>{{$ctrl.finalLimitDate|offsetDate:\"d MMMM\":$ctrl.offsetSeconds}}</span>"+
							"<md-tooltip>{{$ctrl.limitCancelLabel}}&nbsp;{{$ctrl.finalLimitDate|offsetDate:\"shortDate\":$ctrl.offsetSeconds}}&nbsp;<span class=\"text-lowercase\" translate=\"date.time.to\"></span>&nbsp;{{$ctrl.finalLimitDate|offsetDate:\"shortTime\":$ctrl.offsetSeconds}}</md-tooltip>" +
						"</span>"+
						"<span ng-if=\"!$$hideToday\" class=\"today-label cursor-help\" style=\"left:{{$ctrl.$$todayPosition}}%\">"+
							"<span translate=\"date.today\"></span>"+
							"<md-tooltip><span translate=\"date.today\"></span>&nbsp;{{$ctrl.$$now|date:\"short\"}}</md-tooltip>" +
						"</span>"+
						"<div class=\"bar bg-success\" style=\"width:{{$ctrl.$$limitRate}}%;\"></div>"+
						"<div class=\"bar bg-danger\" style=\"left:{{$ctrl.$$limitRate}}%; width:{{100 - $ctrl.$$limitRate}}%;\"></div>"+
					"</div>"+
					"<div layout=\"column\" layout-align=\"center center\" class=\"no-padding-top no-padding-bottom cursor-help\">"+
						"<md-icon class=\"mdi mdi-debug-step-into md-18\"></md-icon>"+
						"<small class=\"text-gray-light\">{{$ctrl.$$endDate|utcDate:\"dd/MM\"}}</small>"+
						"<md-tooltip><span ng-if=\"!$ctrl.endLabel\" translate=\"date.checkin\"></span><span ng-if=\"$ctrl.endLabel\">{{$ctrl.endLabel}}</span></md-tooltip>" +
					"</div>" +
				"</div>"+
			"</div>"
    });

	/* @ngInject */
	function CancellationBarCtrl($scope, $element, $log, NumberUtils, DateUtils) {
		var ctrl = this;
		
		this.$onInit = function() {
			if (!ctrl.creationDate) {
				throw new Error("chCancellationBar: creationDate cannot be null");
			}
			
			if (!ctrl.checkinDate) {
				throw new Error("chCancellationBar: checkinDate cannot be null");
			}
			
			//se passo il timezone sovrascrivo l"offset
			if(ctrl.timeZoneId){
				var zone = moment.tz.zone(ctrl.timeZoneId);
				var _offset = zone.parse(ctrl.creationDate);
				ctrl.offsetSeconds = (_offset / 60) <= 24 ? _offset : (_offset / 60);
			}
			
			ctrl.$$startDate = moment(ctrl.creationDate).toDate();
			ctrl.$$endDate = DateUtils.absoluteDate(ctrl.checkinDate);
			ctrl.$$freeCancelDate = moment(ctrl.limitDate || ctrl.$$endDate).toDate();
			
			var startMoment = moment(ctrl.$$startDate);
			var endMoment = moment(ctrl.$$endDate);
			var limitMoment = ctrl.$$freeCancelDate ? moment(ctrl.$$freeCancelDate) : null;
			ctrl.$$inPenalty = false;
			
			if (limitMoment && limitMoment.isAfter(endMoment, "days")) {
		//		ctrl.$$freeCancelDate = endMoment.toDate();
		//		limitMoment = moment(ctrl.$$freeCancelDate);
				ctrl.$$endDate = limitMoment.toDate();
				endMoment = moment(ctrl.$$endDate);
			}
			
			if (startMoment.isAfter(endMoment, "days")) {
				$log.warn("chCancellationBar: creationDate is after checkinDate. Will be adjusted to checkinDate.");
				ctrl.$$startDate = endMoment.toDate();
				startMoment = moment(ctrl.$$startDate);
				ctrl.$$inPenalty = true;
			}
			
			if (limitMoment && limitMoment.isSame(endMoment, "days")) {
				ctrl.$$endDate = limitMoment.toDate();
				endMoment = moment(ctrl.$$endDate);
			}
			
		//	if (limitMoment && limitMoment.isBefore(startMoment)) {
		//		ctrl.$$freeCancelDate = startMoment.toDate();
		//		limitMoment = moment(ctrl.$$freeCancelDate);
		//	}
			
			var $$nowMoment = moment();
			
			if ($$nowMoment.isAfter(endMoment, "days")) {
				ctrl.$$hideToday = true;
				
			} else {
				ctrl.$$now = $$nowMoment.toDate();
			}
			
			// porto end alle 23:59 per disegnare correttamente la barra
			endMoment.endOf("day");
			
			var totalDays  = endMoment.diff(startMoment, "days") || 1;
			var daysToCheckin = moment.duration(endMoment.diff($$nowMoment)).asDays();
			ctrl.$$todayPosition = NumberUtils.fixedDecimals(100 - (daysToCheckin / totalDays * 100));
			ctrl.$$todayPosition = ctrl.$$todayPosition > 100 ? 100 : ctrl.$$todayPosition < 0 ? 0 : ctrl.$$todayPosition;
			
			// se non c"è la limitDate
			if(!ctrl.limitDate){
				// la cancellazione è a pagamento se è stata specificata un penale, altrimenti è gratuita
				ctrl.$$inPenalty = !_.isNil(ctrl.feeAmount) && ctrl.feeAmount > 0;
				
				if (ctrl.$$inPenalty) {        		
		    		ctrl.$$limitRate = 0;
		    		ctrl.finalLimitDate = startMoment.utcOffset(ctrl.offsetSeconds ? ctrl.offsetSeconds/60 : 0).toDate();
				
				} else {
					ctrl.$$limitRate = 100;
				}
				
			} else {
				ctrl.finalLimitDate = limitMoment.utcOffset(ctrl.offsetSeconds ? ctrl.offsetSeconds/60 : 0).toDate();
				ctrl.daysToLimit  = moment.duration(moment(ctrl.finalLimitDate).diff($$nowMoment)).asDays();
				
				var penaltyDays = moment.duration(endMoment.diff(moment(ctrl.finalLimitDate))).asDays();
				ctrl.$$limitRate = penaltyDays >= 0 ? NumberUtils.fixedDecimals(100 - (penaltyDays * 100 / totalDays)) : 0;
				ctrl.$$limitRate = ctrl.$$limitRate > 100 ? 100 : ctrl.$$limitRate < 0 ? 0 : ctrl.$$limitRate;
				
				ctrl.$$inPenalty = ctrl.daysToLimit <= 0;
			}
			
			//per evitare che sbordino le date
			var limitLabelEl = angular.element($element[0].querySelector(".limit-label"));
			
			if(ctrl.$$limitRate == 100){        		
				limitLabelEl.addClass("limit-label-full");
				limitLabelEl.removeClass("limit-label-empty");
				
			} else if(ctrl.$$limitRate == 0){
				limitLabelEl.addClass("limit-label-empty");
				limitLabelEl.removeClass("limit-label-full");
			}
		};
	}
})();
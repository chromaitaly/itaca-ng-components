(function() {
    "use strict";
    
    angular.module("itaca.components").component("chPaymentPolicyInfo", {
    	bindings: {
    		cancellationPolicy: "<",
    		city: "@",
			timeZoneId: "@",
			title: "@",
    		titleClass: "@",
    		room: "<?",
    		paymentMethod: "@"
    	},
		controller: PaymentPolicyCtrl,
		templateUrl: "/tpls/payment-policy-info/payment-policy-info.tpl"
    });
    
    /* @ngInject */
    function PaymentPolicyCtrl($scope){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		ctrl.titleClass = "md-body-1 no-margin-bottom";
    		
    		ctrl.$$charged = ctrl.$calculateTbp(ctrl.room);
    	};
    	
    	this.$calculateTbp = function(room){
    		if(!room){
    			return null;
    		}
    		
    		var payed = 0, total = 0, tbp = 0;
    		
    		payed = room.chargedAmount ? room.chargedAmount.finalAmount : 0;
    		total = room.totalRate && room.totalRate.amount ? room.totalRate.amount.finalAmount : 0;
    		
    		_.forEach(room.otherBeds, function(bed){
    			payed += bed.chargedAmount ? bed.chargedAmount.finalAmount : 0;
    			total += bed.amount ? bed.amount.finalAmount : 0;
    		});
    		
    		_.forEach(room.services, function(service){
    			if(service.bookability == "BOOKABLE"){
	    			payed += service.chargedAmount ? service.chargedAmount.finalAmount : 0;
	    			total += service.amount ? service.amount.finalAmount : 0;
    			}
    		});
    		
    		tbp = (total - payed);
    		
    		return {tbp: (tbp > 0 ? tbp : 0), payed: payed};
    	};
    }
})();
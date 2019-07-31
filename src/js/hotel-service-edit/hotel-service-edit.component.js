(function() {
	'use strict';
	
	angular.module("itaca.components").component("chHotelServiceEdit", {
		bindings: {
			list: "<",
			type: "<",
			service: "<?",
			isDisabled: "<?",
			saveFn: "&?",
			removeFn: "&?",
			editFn: "&?",
			counter: "<?",
			advanced: "<?",
		},
		controller: HotelServiceEditCtrl,
		templateUrl : "/tpls/hotel-service-edit/hotel-service-edit.tpl",
	});
	
	 /* @ngInject */
	function HotelServiceEditCtrl($scope, $mdMedia, $log, Notification, $translate, FormUtils, Services, Locale) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.$mdMedia = $mdMedia;
    		ctrl.navigator = Navigator;
    		ctrl.locales = Locale.supported();
    		
    		ctrl.advanced = _.isBoolean(ctrl.advanced) ? ctrl.advanced : false;
    		if(ctrl.advanced){
    			ctrl.richEditorToolbar = [
  				  ['bold', 'italic', 'underline', 'strike'],  
  				  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  				  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  				  [{ 'color': [] }],
  				  [{ 'align': [] }],
  				];
    		}
    		
    		
    		ctrl.counter = ctrl.counter || {actual:0};
    		
    		ctrl.baseService = {'category':'HOTEL', 'bookability': 'INCLUDED', 'paymentType': 'FREE', 'frequency': 'LUMP_SUM'};
    		
    		ctrl.$$check();
    		
	  	};
	  	
	  	this.$onChanges = function(changedObj){
			if(changedObj.list){
				ctrl.$$check();
			};
		};
	  	
	  	this.$$descriptionGenerator = function(service){

	  		$translate(['service.type.default', 'service.type.default.room', 'service.type.bookable.alt', 'service.type.included',
				'service.type.room', 'service.type.hotel', 'service.type.external', 'service.type.payment.free', 'service.type.room.for.fee',
				'service.type.payment.single.alt', 'service.type.payment.person',
				'service.type.payment.at.DAILY', 'service.type.payment.at.MONTHLY', 'service.type.payment.at.YEARLY']).then(function(translations){
				
				var desc = translations['service.type.default'];
				if(service.bookability == 'BOOKABLE' || (service.bookability == 'INCLUDED' && service.category == 'ROOM' && service.paymentType && service.paymentType != 'FREE')){
					
					if(service.bookability == 'INCLUDED' && service.category == 'ROOM' && service.paymentType && service.paymentType != 'FREE'){
						desc = translations['service.type.room.for.fee'].toLowerCase() + ' ';
					} else {
						desc = translations['service.type.' + service.category.toLowerCase()] + ' '+ translations['service.type.bookable.alt'].toLowerCase() + ' ';
					}
					
					if(service.paymentType == 'FREE'){
						desc += '('+translations['service.type.payment.free']+')';
						
					}else{
						
						desc +=  '('+ ((service.paymentOptions[0].amount.finalAmount == 0)?  translations['service.type.payment.free'].toUpperCase() : service.paymentOptions[0].amount.finalAmount +'€');
						
						if(service.paymentType != 'SINGLE'){
							desc +=  ' ' + translations['service.type.payment.person'].toLowerCase();
							if(service.frequency != "LUMP_SUM"){
								desc += ' /';
							}
						}
						
						if(service.frequency != "LUMP_SUM"){
							desc += ' ' + translations['service.type.payment.at.'+ service.frequency].toLowerCase();
						}
						
						desc += ')';
					}
				}
				if(service.bookability == 'INCLUDED' && service.category == 'ROOM' && (service.paymentType == 'FREE' || !service.paymentType)){
					desc = translations['service.type.default.room'];
				}
				service.$$description =  desc;
			});
		};
	  	
	  	this.$$check = function(){
	  		ctrl.isChecked = false;
	  		
		 	if(_.isEmpty(ctrl.list)){
		 		return;
		 	}
		 	
		 	var service =_.find(ctrl.list, function(srv){
		 		return srv.type.nameKey == ctrl.type.nameKey;
		 	});
		 	
		 	if(service){
		 		ctrl.isChecked = true;
		 		ctrl.service = ctrl.service ? ctrl.service : service;
		 		ctrl.$$descriptionGenerator(ctrl.service);
		 	}
	  	};
	  	
	  	this.$toggle = function(){
	  		if (!ctrl.isChecked) {
	    		// add
	    		ctrl.service = angular.copy(ctrl.baseService);
	    		ctrl.service.type = ctrl.type;
	    		
	    		ctrl.isChecked = true;
	    		ctrl.$$descriptionGenerator(ctrl.service);
	    		ctrl.counter.actual++;
	    		
	    		if(ctrl.saveFn){
	    			ctrl.saveFn({service: ctrl.service}).then(function(data){
	    				ctrl.service = data.service; 
	    				ctrl.$$descriptionGenerator(data.service);
	    				ctrl.counter.actual++;
	    				
	    			},function(error){
	    				Notification.error(error);
	    				ctrl.isChecked = false;    				
	    			});
	    		}
	    		
	    	} else {
	    		// remove
	    		ctrl.isChecked = false;
	    		
	    		if (ctrl.removeFn) {	
	    			ctrl.removeFn({service: ctrl.service}).then(function(data){
	    				ctrl.service = null;
	    				ctrl.counter.actual--;
	    				
	    			},function(error){
	    				Notification.error(error);
	    				ctrl.isChecked = true;
	    			});
	    		}
	    	}
	  	};
	  	
	  	this.$edit = function(){
  			ctrl.oldSerivce = angular.copy(ctrl.service);
	  		ctrl.service.inEdit = true;
	  		
	  		if(ctrl.service.paymentOptions){
	  			ctrl.service.pay = ctrl.service.pay || {};
				for(var i=0; i <  ctrl.service.paymentOptions.length; i++){
					var size = ctrl.service.paymentOptions[i].size;
					var amount = ctrl.service.paymentOptions[i].amount;
					ctrl.service.pay[size] =  {'price' : amount.finalAmount, 'vat' : amount.vatRate};
				}
			}
	  	};
	  	
	  	this.$cancel = function(){
	  		ctrl.service = angular.copy(ctrl.oldSerivce);
	  		ctrl.service.inEdit = false;
	  	};
	  	
	  	this.$save = function(){
	  		var form = $scope.serviceForm;
	  		form.$setSubmitted();
	  		
	  		if (form.$valid) {
				
				// check if service its free and included
	  			if(ctrl.service.bookability == 'INCLUDED' && ctrl.service.category != 'ROOM'){
					var service = angular.copy(ctrl.baseService);
					service.paymentType = 'FREE';
		    		service.type = ctrl.service.type;
		    		service.id = ctrl.service.id;
		    		service.category = ctrl.service.category;
		    		
		    		ctrl.service = service;
				}
				
				// add paymentOption
				ctrl.service.paymentOptions = [];
				for (var k in ctrl.service.pay) {
					if(ctrl.service.paymentType == k || ctrl.service.paymentType == 'PER_PERSON'){
						ctrl.service.paymentOptions.push({'size': k, 'amount':{'finalAmount': ctrl.service.pay[k].price , 'initialAmount': ctrl.service.pay[k].price , 'vatRate': ctrl.service.pay[k].vat}} );
					}
			    }
				
				if(ctrl.editFn){
	    			ctrl.editFn({service: ctrl.service}).then(function(data){
	    				ctrl.service = data.service;
	    				ctrl.$$descriptionGenerator(data.service);
	    				ctrl.service.inEdit = false;
	    				if(data.message){
	    					Notification.message(data.message);
	    				}
					},function(error){
						Notification.error(message);
					});
				}
			} else {
				$translate('error.validation.fields.text').then(function(message) {
					Notification.error(message);
					FormUtils.focusFirstInvalid(form.$name);
				});
			}
	  	};
	}
})();
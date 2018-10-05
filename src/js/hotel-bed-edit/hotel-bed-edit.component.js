(function() {
	'use strict';
	
	angular.module("itaca.components").component("chHotelBedEdit", {
		bindings: {
			bed: "<",
			list: "<?",
			isBookable: "<?",
			isEditable: "<?",
			updateFn: "&?",
		},
		controller: HotelBedEditCtrl,
		templateUrl : "/tpls/hotel-bed-edit/hotel-bed-edit.tpl",
	});
	
	 /* @ngInject */
	function HotelBedEditCtrl($scope, $mdMedia, NumberUtils, Notification, $translate, ReservationUtils, FormUtils) {
		var ctrl = this;
		
    	this.$onInit = function(){
    		ctrl.$mdMedia = $mdMedia;
    		
    		ctrl.isBookable = _.isBoolean(ctrl.isBookable) ? ctrl.isBookable : false;
    		
    		ctrl.isEditable = _.isBoolean(ctrl.isEditable) ? ctrl.isEditable : false;
    		
    		ctrl.list = ctrl.list || [];
    		
    		// tipologia di letti
    		ctrl.bedTypes = ['SINGLE', 'TWIN', 'DOUBLE', 'FRENCH', 'QUEEN', 'KING', 'POUF', 
    		                   'ARMCHAIR', 'COT', 'MURPHY', 'CRADLE', 'POSTER',
    			               'HALF_SQUARE', 'OVERSIZE', 'DIVAN', 'FUTON', 'BUNK', 'WATERBED'];
    		
    		// creo il letto e assegno l'uid
    		ctrl.bed = ctrl.bed || {people:{adults:1}, maxPerson:1, count: 1};
    		ctrl.bed.uid = NumberUtils.uniqueNumber();
    		
    		ctrl.$adeguatePeople();
    	};
    	
    	this.$adeguatePeople = function(){
    		if(!ctrl.bed.maxPerson  || ctrl.bed.maxPerson < 0){
    			ctrl.bed.maxPerson = 1;
    		}
    	
    		ctrl.bed.people = {
    			adults: ctrl.bed.maxPerson,
    			boys: ctrl.bed.maxPerson,
    			children: ctrl.bed.maxPerson,
    			kids: ctrl.bed.maxPerson,
    		};
    	};
    	
    	
    	this.$edit = function(){
    		ctrl.oriBed = angular.copy(ctrl.bed);
			ctrl.updateFn && ctrl.updateFn();
			
			ctrl.bed.inEdit = true;
    	};
    	
    	this.$save = function(){
    		ctrl.bedForm.$setSubmitted();
    		if (ctrl.bedForm.$invalid) {
	  			$translate("error.validation.fields.text").then(function(message) {
					Notification.error(message);
					FormUtils.focusFirstInvalid(ctrl.bedForm.$name);
				});
	  			return;
	  		}
    		
    		ctrl.bed.people = ctrl.bed.people || {
    			adults: ctrl.bed.maxPerson,
    			boys: ctrl.bed.maxPerson,
    			children: ctrl.bed.maxPerson,
    			kids: ctrl.bed.maxPerson,
    		};
    		
    		// verifico se sia stato inserita almeno una persona
    		if (ReservationUtils.guestsCount(ctrl.bed.people).standard <= 0) {
    			$translate("error.bed.no.people").then(Notification.error);
    			return;
    		}
    		
    		ctrl.bed.inEdit = false;
    		
    		ctrl.updateFn && ctrl.updateFn();
    	};
    	
    	this.$cancel = function(){
    		// se non c'è oriBed vuol dire che è stato appena creato
    		if(!ctrl.oriBed){
    			ctrl.$remove();
    			return;
    		}
    		
    		ctrl.bed = angular.copy(ctrl.oriBed);
    		ctrl.bed.inEdit = false;
    		
    		ctrl.updateFn && ctrl.updateFn();
    	};
    	
    	this.$remove = function(){
    		_.remove(ctrl.list, function(bed){
    			return bed.uid == ctrl.bed.uid;
    		});
    		
    		ctrl.bed = null;
    		
    		ctrl.updateFn && ctrl.updateFn();
    	};
	}
})();
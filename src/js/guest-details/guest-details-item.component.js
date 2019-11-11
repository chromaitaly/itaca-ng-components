(function() {
	'use strict';
	
	angular.module("itaca.components").component("guestDetailsItem", {
		bindings: {
			document: "<",
			action: "<?",
			adeguateGuestType: "&?",
			checkIsAnAdult: "&?",
			checkIsAnLeader: "&?",
		},
		controller: GuestDetailsItemCtrl,
		templateUrl: "/tpls/guest-details-item/guest-details-item.tpl"
	});
	
	 /* @ngInject */
	function GuestDetailsItemCtrl($scope, $element, $mdMedia, $translate, AppOptions, Navigator, Notification, NumberUtils, ObjectUtils, FormUtils) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		this.appOptions = AppOptions;
		
		this.$onInit = function(){
			ctrl.$$today = moment().toDate();
			
			ctrl.action = ctrl.action || {inEdit: false, anAdult: false, legalDate: moment(), today: moment().toDate()};
			ctrl.action.$$legalDate = ctrl.action.legalDate.toDate();
			
			ctrl.document.uuid = ctrl.document.uuid ? ctrl.document.uuid : NumberUtils.uniqueNumber();
			$element.attr("id", ctrl.document.uuid);
		};
		
		this.$checkLeastAnAdult = function(){
			ctrl.checkIsAnAdult && ctrl.checkIsAnAdult();
		};
		
		this.$adeguateGuestType = function(){
			ctrl.adeguateGuestType && ctrl.adeguateGuestType({$document: (!ctrl.$$temp || ctrl.document.guestType != ctrl.$$temp.guestType) ? ctrl.document : null});
		};
		
		this.$edit = function(create) {
			ctrl.$$temp = angular.copy(ctrl.document);
			
			ctrl.document.$$show = true;
			ctrl.action.inEdit = true;
			
			//controllo se esiste un capogruppo o un capofamiglia
			var leader = ctrl.checkIsAnLeader && ctrl.checkIsAnLeader();
			
			$scope.guestDetailsItemForm.$setPristine();
			
			// se esiste un leader e non si è impostato un tipo preseleziono il gruppo di appartenenza
			if(!ctrl.document.guestType && leader){
				ctrl.document.guestType = leader.guestType == 'GROUP_LEADER'? 'GROUP_MEMBER' : 'FAMILY_MEMBER';
			}
			
			ctrl.$checkLeastAnAdult();
		};
		
		this.$cancel = function(){
			ctrl.document.$$show = false;
			ctrl.document = angular.copy(ctrl.$$temp);
			ctrl.$$temp = null;
			ctrl.action.inEdit = false;
			
			Navigator.scrollToAnchor("#"+ctrl.document.uuid);
		};
		
		this.$confirm = function(){
			var form = $scope.guestDetailsItemForm;
			form.$setSubmitted();
			
			//controllo se è stato inserito almeno 1 adulto
			if(!ctrl.action.anAdult && !moment(ctrl.document.birthDate).isBefore(ctrl.legalDate)){
				$translate('error.room.guest.not.selected').then(function(translate){
					Notification.error(translate);
					FormUtils.focusFirstInput(form);
				});
				return;
			}
			
			ctrl.document.$$status = form.$valid ? 'COMPLETE' : 'PARTIAL';
			
			if (form.$valid) {
				
				//imposto la provincia
				if(ctrl.document.birthPlace && AppOptions.$$places){
					var _place = _.find(AppOptions.$$places, ['code', ctrl.document.birthPlace]);
					if(_place){
						ctrl.document.province = _place.province;
					}
				}
				
				//imposto come ospite singolo se non si inserisce nulla
				if(!ctrl.document.guestType){
					ctrl.document.guestType = 'SINGLE_GUEST';
				}
				
				ctrl.$checkLeastAnAdult();
				ctrl.$adeguateGuestType();
				
				ctrl.document.$$show = false;
				ctrl.$$temp = null;
				ctrl.action.inEdit = false;
				
				Navigator.scrollToAnchor("#"+ctrl.document.uuid);
				
			}else{
				$translate("message.reservation.error.form").then(function(translate) {
					Notification.error(translate);
					FormUtils.focusFirstInput(form);
				});
				return;
			}
		};
		
		this.$remove = function(){
			ObjectUtils.clearObject(ctrl.document, /^uuid$|^maxDate$|^roomId$/);
			ctrl.$$temp = null;
			ctrl.action.inEdit = false;
			
			ctrl.$checkLeastAnAdult();
			ctrl.$adeguateGuestType();
			
			Navigator.scrollToAnchor("#"+ctrl.document.uuid);
		};
		
		this.$setGuestType = function(type){
			type = type || 'SINGLE_GUEST';
			
			switch(type){
				case 'GROUP_LEADER'	: ctrl.document.guestType = 'GROUP_LEADER'; break;
				case 'HOUSEHOLDER'	: ctrl.document.guestType = 'HOUSEHOLDER'; break;
				default				: ctrl.document.guestType = 'SINGLE_GUEST'; break;
			}
		};
	}
})();
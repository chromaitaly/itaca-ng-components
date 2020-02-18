(function() {
    "use strict";
    
    angular.module("itaca.components").component("chRoomEditIdentityDocuments", {
    	bindings: {
    		room: "<",
    		reservation:"<",
    		legalAge: "<?"
    	},
		controller: RoomEditIdentityDocumentsCtrl,
		templateUrl: "/tpls/room-edit/room-edit-identity-documents.tpl"
    });
    
    /* @ngInject */
    function RoomEditIdentityDocumentsCtrl($scope, $mdMedia, $translate, AppOptions, Notification, Navigator, Loading, GuestDetailsAPI, NumberUtils, ReservationUtils){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	this.appOptions = AppOptions;
    	this.navigator = Navigator;
    	
    	this.$onInit = function(){
    		ctrl.$calculateGuestDocuments();
    		
    		ctrl.$initGuestPlaceList();
    		
    		_.forEach(ctrl.reservation.rooms, function(room){
    			_.forEach(room.identityDocuments, function(doc){
    				doc.uuid = doc.uuid ? doc.uuid : NumberUtils.uniqueNumber();
    			});
    		});
    		
    		ctrl.$$action = {
    			inEdit: false,
    			anAdult: false,
    			legalDate: moment().subtract((ctrl.legalAge || 18), "years"),
    			today: moment().toDate()
    		};
    		
    		ctrl.$checkLeastAnAdult();
    		ctrl.$adeguateGuestType();
    		
    	};
    	
    	this.$calculateGuestDocuments = function(){
    		ReservationUtils.calculateGuestDocuments(ctrl.room);
    	};
    	
    	
    	this.$initGuestPlaceList = function(){
    		
    		AppOptions.$$places = [];
    		if(_.isEmpty(AppOptions.$$municipalities)){
    			GuestDetailsAPI.municipalities().then(function(data){
    				AppOptions.$$municipalities = data;
    				AppOptions.$$places = _.concat(AppOptions.$$places, AppOptions.$$municipalities);
    			});
    		} else {
    			AppOptions.$$places = _.concat(AppOptions.$$places, AppOptions.$$municipalities);
    		}
    		
    		if(_.isEmpty(AppOptions.$$countries)){
    			GuestDetailsAPI.countries().then(function(data){
    				AppOptions.$$countries = data;
    				AppOptions.$$places = _.concat(AppOptions.$$places, AppOptions.$$countries);
    			});
    		} else {
    			AppOptions.$$places = _.concat(AppOptions.$$places, AppOptions.$$countries);
    		}
    		
    		if(_.isEmpty(AppOptions.$$documents)){
    			GuestDetailsAPI.documents().then(function(data){
    				AppOptions.$$documents = data;
    			});
    		}
    		
    		AppOptions.$$places = _.orderBy(AppOptions.$$places, ["description", "code"], ["asc", "asc"]);
    	};

    	this.$checkLeastAnAdult = function(){
    		ctrl.$$action.anAdult = false;
    		
    		_.forEach(ctrl.reservation.rooms, function(room){
	    		 _.forEach(room.identityDocuments, function(doc){
	    		
	    			//se si è maggiorenni
	    			 doc.isAdult = doc.birthDate &&  moment(doc.birthDate).isBefore(ctrl.$$action.legalDate);
	    			
	    			//setto il max date (limite di data del compleanno)
	    			 doc.maxDate = (doc.isAdult || (!ctrl.$$action.anAdult && doc.guestType != "FAMILY_MEMBER" && doc.guestType != "GROUP_MEMBER")) ? ctrl.$$action.legalDate.toDate() : moment().toDate();
	    			
	    			 ctrl.$$action.anAdult = ctrl.$$action.anAdult || doc.isAdult;
	    		});
    		});
    	};
    	
    	this.$checkIsAnLeader = function() {
    		var leader;
    		_.forEach(ctrl.reservation.rooms,function(room){
    			var _leader =  _.find(room.identityDocuments,function(doc){
        			return doc.guestType == "GROUP_LEADER" || doc.guestType == "HOUSEHOLDER";
        		});
    			if(_leader){
    				leader = _leader;
    			}
    		});
    		return leader;
    	};
    	
    	this.$adeguateGuestType = function(document) {
    		if(document && document.guestType){
    			var otherGuestsType = document.guestType == "GROUP_LEADER" ? "GROUP_MEMBER" : document.guestType == "HOUSEHOLDER" ? "FAMILY_MEMBER" : "SINGLE_GUEST";
    			_.forEach(ctrl.reservation.rooms, function(room){
	    			_.forEach(room.identityDocuments, function(doc){
	    				if(doc.uuid && document.uuid && doc.uuid != document.uuid){
	    					doc.guestType = otherGuestsType;
	    				}
	    			});
    			});
    		}
    		
    		//controllo che in caso non ci sia ne un leader di adeguare gli altri ospiti
    		if(_.isNil(ctrl.$checkIsAnLeader())){
    			_.forEach(ctrl.reservation.rooms, function(room){
    				_.forEach(room.identityDocuments, function(d){ d.guestType = "SINGLE_GUEST"});
    			});
    		}
    		
    		//riordino le persone in base al gruppo e al nome
    		ctrl.room.identityDocuments =_.orderBy(ctrl.room.identityDocuments, [function(doc) { return doc.guestType == "GROUP_LEADER" || doc.guestType == "HOUSEHOLDER" ? 0 : 1; }, "name", "surname"],["asc"]);
    		
    		//controllo se tutti gli ospiti sono stati inseriti
    		ctrl.$checkDoc();
    		
    	};
    	
    	this.$checkDoc = function(){
    		var isPartial = false;
    		_.forEach(ctrl.reservation.rooms, function(room){
	    		_.forEach(room.identityDocuments, function(doc){
	    			if(!doc.guestType) {
	    				doc.$$status = "PARTIAL";
	    				isPartial = true;
	    				
	    			} else {
	    				if(_.includes(["SINGLE_GUEST", "HOUSEHOLDER", "GROUP_LEADER"], doc.guestType)){
	    					//check
	    					doc.$$status = (doc.name && doc.surname && doc.gender && doc.birthDate && doc.birthPlace && doc.nationality && doc.citizenship && doc.type && doc.issuer && doc.number) ? "COMPLETE" : "PARTIAL";
	    					
	    				} else if(_.includes(["GROUP_MEMBER", "FAMILY_MEMBER"], doc.guestType)) {
	    					//check
	    					doc.$$status = (doc.name && doc.surname && doc.gender && doc.birthDate && doc.birthPlace &&  doc.nationality && doc.citizenship) ? "COMPLETE" : "PARTIAL";
	    				}
	    				
	    				isPartial = doc.$$status == "PARTIAL";
	    			}
	    		});
    		
	    		room.$$status = isPartial ? "PARTIAL": "COMPLETE";
    		});
    	};
    	
    }
})();
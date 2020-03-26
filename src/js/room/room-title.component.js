(function() {
    'use strict';
    
    angular.module("itaca.components").component("chRoomTitle", {
    	require: {
    		chRoomCtrl: '^chRoom'
		},
		controller: RoomTitleCtrl,
		template: 
			'<div layout="column" layout-padding class="no-padding-y-sides clickable bg-opaque-7" ng-click="$ctrl.$showInfo($event)" aria-label="Room info">' +
				'<div layout layout-wrap layout-align="center center" layout-align-gt-sm="start center" layout-padding-sm ng-class="{\'no-padding\': $ctrl.$mdMedia(\'gt-sm\'), \'text-center\': !$ctrl.$mdMedia(\'gt-sm\')}">' +
					'<div layout="column" flex class="row-1">' +
						'<div class="md-headline">' +
							'<strong translate="{{$ctrl.$$room.roomType.nameKey}}"></strong>&nbsp;' +
							'<md-icon class="material-icons md-14 mdi mdi-information-outline no-margin text-white"></md-icon>' +
						'</div>' +
						'<div><span translate="room.category.{{$ctrl.$$room.category}}"></span></div>' +
					'</div>' +
				'</div>' +
			'</div>',
    });
    
    /* @ngInject */
    function RoomTitleCtrl($scope, $mdMedia, $window, $location, $mdDialog){
    	var ctrl = this;
    	
    	this.$mdMedia = $mdMedia;
    	
    	this.$onInit = function() {
    		ctrl.$initRoom();
    	};
    	
    	this.$initRoom = function() {
    		ctrl.$$room = ctrl.chRoomCtrl.room;
    	};
    	
    	this.$showInfo = function(ev){
    		var opts = {
				templateUrl: '/tpls/room/room-info-dialog.tpl', 
				controller: RoomInfoDialogCtrl, 
				controllerAs: '$ctrl',
				locals: {
					room: ctrl.$$room, 
					localeIso: ctrl.chRoomCtrl.localeIso
				}, 
				bindToController: true,
				targetEvent: ev,
				fullscreen: !$mdMedia('gt-sm'),
				clickOutsideToClose: true,
				escapeToClose: true,
				onComplete: function(){
//					location.hash = 'room-info-' + ctrl.chRoomCtrl.$$index + '-' + Date.now();
//					history.pushState(null, null, location.href + '#room-info-' + ctrl.chRoomCtrl.$$index);
				}
			};
    		
			
			$mdDialog.show(opts).finally(function(){
//				history.replaceState(null, null, location.href.split('#')[0]);
//				$location.hash(null);
			});
    	};
    }    
    
    /* @ngInject */
	function RoomInfoDialogCtrl($scope, $mdDialog){
		var ctrl = this; 
		
		this.$close = function() {
			$mdDialog.hide();
		};
		
		this.$cancel = function() {
			$mdDialog.cancel();
		};
	}
})();
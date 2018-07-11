(function() {
	'use strict';
	
	angular.module("itaca-cp").component("chNotes", {
		bindings: {
			notes: "<?",
			ngDisabled: "<?",
			onEdit: "&?",
			onConfirm: "&?",
			onCancel: "&?",
			onRemove: "&?",
		},
		controller: NotesCtrl,
		templateUrl: "/tpls/notes/notes.tpl"
	});
	
	 /* @ngInject */
	function NotesCtrl($scope, $mdMedia, Locale, REGEXP, AppOptions, Navigator, Notification, Loading, TempHotels) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		this.appOptions = AppOptions;
		this.REGEXP = REGEXP;
		
		this.$onInit = function() {
			ctrl.notes = ctrl.notes || [];
			ctrl.today = moment().toDate();
			ctrl.$$temp = null;
		};
		
		//add
		this.$add = function(){
			ctrl.notes.push({createdNow: true, text: '', createdDate: ctrl.today, createdBy: AppOptions.user});
		};
		
		//edit
		this.$edit = function(note){
			ctrl.$$temp = {text : angular.copy(note.text)};
			note.edit = true;
			
			ctrl.onEdit && ctrl.onEdit();
		};
		
		//confirm
		this.$confirm = function(note){
			var form = this.hotelNotesForm[$scope.$index];
			form.$setSubmitted();
			
			if (form.$valid) {			
				note.text = angular.copy(ctrl.$$temp.text);
				note.edit = false;
				note.editedNow = !note.createdNow;
				note.createdNow = false;
				ctrl.$$temp = null;
				
				ctrl.onConfirm && ctrl.onConfirm();
			}
		};
		
		//cancel
		this.$cancel = function(note){
			if(note.createdNow){
				ctrl.$remove();
			}else{
				note.edit = false;
			}
			ctrl.$$temp = null;
			
			ctrl.onCancel && ctrl.onCancel();
		};
		
		//remove
		this.$remove = function(note){
			_.pull(ctrl.notes, note);
			
			ctrl.onRemove && ctrl.onRemove();
		};
	}
})();
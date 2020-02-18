(function() {
	"use strict";
	
	angular.module("itaca.component").component("chNotes", {
		bindings: {
			notes: "<?",
			ngDisabled: "<?",
			label: "@",
			onEdit: "&?",
			onConfirm: "&?",
			onCancel: "&?",
			onRemove: "&?",
		},
		controller: NotesCtrl,
		templateUrl: "/tpls/notes/notes.tpl"
	});
	
	 /* @ngInject */
	function NotesCtrl($scope, $mdMedia, $translate, REGEXP, AppOptions, Navigator, Notification, Loading, TempHotels) {
		var ctrl = this;
		
		this.$mdMedia = $mdMedia;
		this.appOptions = AppOptions;
		this.REGEXP = REGEXP;
		
		this.$onInit = function() {
			ctrl.notes = ctrl.notes || [];
			ctrl.today = moment().toDate();
			ctrl.label = ctrl.label || $translate.instant("common.notes.internal");
			ctrl.$$temp = null;
		};
		
		//add
		this.$add = function(){
			ctrl.notes.push({createdNow: true, edit: true, text: "", createdDate: ctrl.today, createdBy: AppOptions.user});
		};
		
		//edit
		this.$edit = function(note){
			ctrl.$$temp = {text : angular.copy(note.text)};
			note.edit = true;
			
			ctrl.onEdit && ctrl.onEdit();
		};
		
		//confirm
		this.$confirm = function(idx, note){
			var form = $scope.notesForm[idx];
			form.$setSubmitted();
			
			if (form.$valid) {			
				note.edit = false;
				note.editedNow = !note.createdNow;
				note.createdNow = false;
				ctrl.$$temp = null;
				
				ctrl.onConfirm && ctrl.onConfirm();
			}
		};
		
		//cancel
		this.$cancel = function(note){
			if(note.createdNow || !ctrl.$$temp || !ctrl.$$temp.text){
				ctrl.$remove(note);
			}else{
				note.text = angular.copy(ctrl.$$temp.text);
				note.edit = false;
				ctrl.onCancel && ctrl.onCancel();
			}
		};
		
		//remove
		this.$remove = function(note){
			_.pull(ctrl.notes, note);
			
			ctrl.$$temp = null;
			
			ctrl.onRemove && ctrl.onRemove();
		};
	}
})();
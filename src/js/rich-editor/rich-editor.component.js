/**
 * REQUIRE NG-QUILL && QUILL
 */
(function() {
	"use strict";
	angular.module("itaca.component").component("chRichEditor", {
		require: {
			ngModelCtrl: "ngModel"
		},
		bindings: {
			ngModel: "=",
			toolbar: "<?",
			ngRequired: "<?",
			ngDisabled: "<?",
			placeholder: "@",
			maxLength: "<",
			minLength: "<",
			onChange: "&?",
			onCreation: "&?",
			onSelect: "&?",
			hideCharsCounter: "<",
			hideWordsCounter: "<",
			minHeight: "@",
		},
		controller: RichEditorCtrl,
		templateUrl: "/tpls/rich-editor/rich-editor.tpl"
	});
	
	/* @ngInject */
	function RichEditorCtrl($scope, $element) {
		var ctrl = this;
		
		this.$onInit = function(){
			
			if(ctrl.maxLength && !ctrl.minLength){
				ctrl.minLength = 0;
			}
			
			var defaultToolbar =[
			  ["bold", "italic", "underline", "strike"],  
			  ["blockquote", "code-block"],
			  [{ "list": "ordered"}, { "list": "bullet" }],
			  [{ "script": "sub"}, { "script": "super" }], 
			  [{ "indent": "-1"}, { "indent": "+1" }],    
			  [{ "size": ["small", false, "large", "huge"] }], 
			  [{ "header": [1, 2, 3, 4, 5, 6, false] }],
			  [{ "color": [] }],
			  [{ "align": [] }],
			];
			
			ctrl.counter = {words : 0,chars: 0};
			
			ctrl.modules = {
                toolbar: ctrl.toolbar || defaultToolbar,
			};
			
		};
		
		this.updateCounter = function(editor){
			var text = editor.getText();
			text = text.trim();
			ctrl.counter.words = text.length > 0 ? text.split(/\s+/).length : 0;
			ctrl.counter.chars = text.length > 0 ? text.length : 0;
		};
		
		this.onEditorCreated = function(editor){
			ctrl.updateCounter(editor);
			
			//applico il min-height se presente
			if(ctrl.minHeight){
				angular.element($element[0].querySelector(".ql-container")).css("cssText", "min-height: "+ ctrl.minHeight + "px !important");
				angular.element($element[0].querySelector(".ql-editor")).css("cssText", "min-height: "+  ctrl.minHeight + "px !important");
			}
			
			//se viene eseguita anche una funzione esterna
			angular.isFunction(ctrl.onCreation) && ctrl.onCreation();
		};
		
		this.onEditorChanged = function(editor, html, text, delta, oldDelta, source){
			ctrl.updateCounter(editor);
			
			//se viene eseguita anche una funzione esterna
			angular.isFunction(ctrl.onChange) && ctrl.onChange();
		};
		
		this.onSelectionChanged = function(editor, range, oldRange, source){
			ctrl.updateCounter(editor);
			
			//se viene eseguita anche una funzione esterna
			angular.isFunction(ctrl.onSelect) && ctrl.onSelect();
		};
		
	}
})();
	
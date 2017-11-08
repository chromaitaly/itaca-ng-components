(function() {
	'use strict';
	
	angular.module("chroma.components").component('chTruncate', {
		bindings: {
			text: "@",
			maxLength: "<?",
			suffix: "@",
			hideTooltip: "<?"
		},
		controller: TruncateCtrl,
		template: 
			"<span>" +
				"<span>{{$ctrl.$$truncated}}</span><md-tooltip ng-if=\"$ctrl.$$showTooltip\">{{$ctrl.text}}</md-tooltip>" +
			"</span>"
	});
	
	function TruncateCtrl($scope, truncateFilter) {
		var ctrl = this;
		
		ctrl.$onInit = function() {
			$scope.$watchGroup([function(){
				return ctrl.text;
			}, function(){
				return ctrl.maxLength;
			}], ctrl.$truncate);
		};

		ctrl.$truncate = function() {
			ctrl.$$showTooltip = !ctrl.hideTooltip && ctrl.text.length > ctrl.maxLength;
			
			ctrl.$$truncated = truncateFilter(ctrl.text, ctrl.maxLength, ctrl.suffix);
		};
	}
})();
(function() {
	'use strict';
	
	angular.module("itaca.components").component("chIconSelect", {
		require: {
			ngModelCtrl: 'ngModel'
		},
		bindings: {
			ngModel: "<",
			label: "@",
			icons: "<?",
			hideFilter: "<?",
			iconsSourcesUrls: "<?",
			ngDisabled: "<?",
			ngReadonly: "<?"
		},
		controller: IconSelectCtrl,
		templateUrl: "/tpls/icon-select/icon-select.tpl"
	});
	
	 /* @ngInject */
	function IconSelectCtrl($scope, $http, $q, $log, InfinitePaging) {
		var ctrl = this;
		
		this.$$iconsSourcesUrls = ["/public/data/icon-classes.json"];
		
		this.$onInit = function() {
			ctrl.$initModel();
			ctrl.$initIcons();
		};
		
		this.$onChanges = function(changesObj) {
			if (changesObj.ngModel || changesObj.ngDisabled) {
				ctrl.$initModel();
			}
			
			if (changesObj.icons || changesObj.iconsSourcesUrls) {
				ctrl.$initIcons();
			}
		};
		
		this.$initModel = function() {
			if (ctrl.ngDisabled || (_.isPlainObject(ctrl.ngModel) && ctrl.ngModel.cssClass)) {
				ctrl.$$exists = true;
				ctrl.$cancelIconSelect();
				
			} else {
				ctrl.$$exists = false;
				ctrl.$showIconSelect();
			}
		};
		
		this.$initIcons = function() {
			if (_.isArray(ctrl.icons) & !_.isEmpty(ctrl.icons)) {
				ctrl.$initLoader(ctrl.icons);
				
			} else {
				ctrl.iconsSourcesUrls = _.isArray(ctrl.iconsSourcesUrls) ? ctrl.iconsSourcesUrls : ctrl.$$iconsSourcesUrls;
				
				var promises = [];
		        
	        	_.forEach(ctrl.iconsSourcesUrls, function(url) {
	        		var promise = $http.get(url).then(function(response) {
	        			return response.data;
	        		});
	        		promises.push(promise);
	        	});
				
	        	ctrl.$$error = undefined;
				
				$q.all(promises).then(function(datas) {
					var icons = [];
					
					_.forEach(datas, function(data) {
						icons = _.union(icons, data); 
					});
					
					ctrl.$initLoader(_.compact(icons));
				
				}, function(response){
					$log.error("Error loading icon list");
					ctrl.$$error = "Error loading icon list";
				});
			}
		};
		
		this.$initLoader = function(icons) {
			ctrl.$$loader = new InfinitePaging(icons, {
				size: 30,
				sort: [ 'cssClass' ]
			});
			
			// carico prima pagina
			ctrl.$$loader.nextPage();
			// init watch su filtro
			ctrl.$initFilterWatcher();
		};
		
		this.$initFilterWatcher = function() {
			if (!ctrl.$$stopFilterWatcher) {			
				ctrl.$$stopFilterWatcher = $scope.$watch(function(){
					if (ctrl.$$loader && ctrl.$$loader.params) {
						return ctrl.$$loader.params.filter;
					
					} else {
						return null;
					}
				}, function(newVal, oldVal) {
					ctrl.$$loader && ctrl.$$loader.reload();
				});
			}
		};
		
		this.$selectIcon = function(icon) {
			if (ctrl.ngDisabled || ctrl.ngReadonly || !icon || !icon.cssClass) {
				return false;
			}
			
			ctrl.$update(icon);
			
			ctrl.$cancelIconSelect();
		};
		
		this.$showIconSelect = function() {
			ctrl.$$showIcons = true;
			ctrl.$$loader && (ctrl.$$loader.params.filter = null);
		};
		
		this.$cancelIconSelect = function() {
			ctrl.$$showIcons = false;
			ctrl.$$loader && (ctrl.$$loader.params.filter = null);
		};
		
		this.$update = function(icon) {
			ctrl.ngModelCtrl.$setViewValue(icon);
		};
	}
})();
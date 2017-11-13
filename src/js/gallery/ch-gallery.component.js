(function() {
    'use strict';
    
    angular.module("itaca.components").component("chGallery", {
    	require: {
		},
    	bindings: {
    		gallery: "<?",
    		storageUrl: "<?",
    		galleryTitle: "@",
    		cols: "@",
    		rowspan: "@?",
    		ratio: "@?",
    		maxItems: "<?"
    	},
		controller: GalleryCtrl,
		template: 
			"<div ng-if=\"$ctrl.gallery.length\">" +
				"<md-grid-list md-cols=\"{{$ctrl.maxCols}}\" md-row-height=\"{{$ctrl.ratio}}\" md-gutter=\"6px\" md-gutter-gt-sm=\"4px\">" +
				 	"<md-grid-tile class=\"bg-black-light clickable\" ng-repeat=\"photo in $ctrl.previewGallery track by $index\" ng-click=\"$ctrl.openGallery($event, $index)\" aria-lable=\"open gallery\" " +
				 		"md-colspan=\"{{$ctrl.tilesConfig[$index].colspan}}\" md-rowspan=\"{{$ctrl.tilesConfig[$index].rowspan}}\" style=\"overflow: hidden;\">" +
						"<span ng-class=\"{'locked layout-row layout-align-start-center': $last && $ctrl.more}\">" +
							"<strong ng-if=\"$last && $ctrl.more\" class=\"locked-string locked-string-initial bg-opaque-7 text-uppercase\">" +
								"<span ng-if=\"($ctrl.gallery.length - $ctrl.previewGallery.length) == 1\" translate=\"photo.photo.other.count\"></span>" +
								"<span ng-if=\"($ctrl.gallery.length - $ctrl.previewGallery.length) != 1\" translate=\"photo.photos.other.count\" translate-value-count=\"{{$ctrl.gallery.length - $ctrl.previewGallery.length}}\"></span>" +
							"</strong>" +
							"<img ng-src=\"{{$ctrl.storageUrl + photo.path}}\" alt=\"{{photo.tags[0]}}\" lazy-image default-img-url=\"'/resources/public/img/no-gallery-image.png'\">" +
						"</span>" +
				    "</md-grid-tile>" +
				"</md-grid-list>" +
			"</div>" +
			"<div ng-if=\"!$ctrl.gallery.length\">" +
				"<img src=\"/resources/public/img/no-gallery-image.png\" class=\"full-width\">" +
			"</div>"
    });
    
    /* @ngInject */
    function GalleryCtrl($scope, AboutStorage, Dialog, NumberUtils){
    	var ctrl = this;
    	
    	this.$onInit = function(){
    		if(!ctrl.storageUrl){
	    		AboutStorage.get().then(function(data) {
	    			ctrl.storageUrl = data.url;
	    			ctrl.initGridList();
	    		});
	    	} else {
	    		ctrl.initGridList();
	    	}
    	};
    	
    	this.openGallery = function(ev, idx){
			Dialog.showGallery(ev, ctrl.galleryTitle, ctrl.gallery, {storageUrl: ctrl.storageUrl, initialSlide: idx || 0});
    	};
    	
    	this.initGridList = function(){
    		if(_.isEmpty(ctrl.gallery)){
    			return;
    		}
    		
    		ctrl.ratio = ctrl.ratio || "4:3";
    		
    		ctrl.maxCols = ctrl.gallery.length;
    		
    		if(ctrl.cols){
    			// creo l'array di colonne e ne calcolo il totale
    			ctrl.colsArray = [];
    			ctrl.totalCols = 0;
    			_.forEach(ctrl.cols.split(':'), function(col){
    				var parsed = Math.abs(parseInt(col));
    				ctrl.totalCols += parsed;
    				ctrl.colsArray.push(parsed);
    			});
    			
    			// prendo il minimo comune multiplo
    			ctrl.maxCols = NumberUtils.lcmArray(ctrl.colsArray);
    			
    			//se il numero della prima riga è minore del numero 
    			//dell totale delle foto allora max = gallery.length
    			ctrl.maxCols =  ctrl.gallery.length < ctrl.colsArray[0] ? ctrl.gallery.length : ctrl.maxCols;
    		}
    		
			ctrl.previewGallery = [];
			ctrl.more = false;		
			
			var size = _.size(ctrl.gallery);
			if (size <= 0) {
				return;
			}
			
			if (size >= ctrl.totalCols){
				var dropItemsCount = ctrl.maxItems ? (size - ctrl.maxItems) : (size - ctrl.totalCols);
				
				ctrl.previewGallery = _.dropRight(ctrl.gallery, dropItemsCount); 
				ctrl.more = size > ctrl.totalCols;
				
			} else {
				ctrl.previewGallery = ctrl.gallery;
			}
			
			if(ctrl.rowspan){
				ctrl.rowspanArray = [];
				_.forEach(ctrl.rowspan.split(':'), function(row){
    				ctrl.rowspanArray.push(Math.abs(parseInt(row)));
    			});
			}
			
			// configurazione img galleria
			ctrl.tilesConfig = [];
			
			// calcolo colspan
			_.forEach(ctrl.previewGallery, function(photo, index){
				if (_.isEmpty(ctrl.colsArray)) {
					ctrl.tilesConfig.push({colspan: 1});
					
				} else {
					_.forEach(ctrl.colsArray, function(col, row, collection){
		    			if((index < (row == 0 ? col : col + collection[row -1])) || (row+1) == collection.length){
		    				ctrl.tilesConfig.push({colspan: ctrl.maxCols / col});
		    				return false;
		    			}
		    		});
				}
			});
			
			// calcolo rowspan
			if(_.size(ctrl.tilesConfig) > 1){
				var colCount = 0;
				_.forEach(ctrl.tilesConfig, function(config, index){
					if (!_.isEmpty(ctrl.rowspanArray)) {
						colCount += config.colspan;
						config.rowspan = ctrl.rowspanArray[Math.ceil(colCount/ctrl.maxCols)-1] || 1;
						
					} else {
						config.rowspan = 1;
					}
				});
			} else {
				ctrl.tilesConfig[0].rowspan = 1;
			}
    	};
    }
    
})();
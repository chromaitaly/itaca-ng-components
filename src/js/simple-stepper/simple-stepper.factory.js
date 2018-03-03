(function() {
    'use strict';
    
    angular.module("itaca.components").factory('$chSimpleStepper', StepperFactory);
    
    /* @ngInject */
    function StepperFactory($mdComponentRegistry) {			
    	return function(stepperId) {
            var stepper = $mdComponentRegistry.get(stepperId);
            
            if (!stepper) {
                $mdComponentRegistry.notFoundError(stepperId);
            }
            
            return stepper;
        };
    }
})();

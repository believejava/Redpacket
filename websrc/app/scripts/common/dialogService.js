angular.module('npmtApp').factory('redPacketDialogService', ['$uibModal', '$rootScope',
	function($uibModal, $rootScope) {

		var self=this;
		var errorModalDefaults = {
			backdrop: true,
			keyboard: true,
			modalFade: true,
			templateUrl: 'views/dialog-error.html'
		};

		var warningModalDefaults = {
			backdrop: true,
			keyboard: true,
			modalFade: true,
			templateUrl: 'views/dialog-warning.html'
		};

		var modalOptions = {
			closeButtonText: 'Close',
			actionButtonText: 'OK',
			headerText: 'Proceed?',
			bodyText: 'Perform this action?',
			buttons:[]
		};

		this.showModal = function(customModalDefaults, customModalOptions) {
			if (!customModalDefaults) customModalDefaults = {};
			customModalDefaults.backdrop = 'static';
			return this.show(customModalDefaults, customModalOptions);
		};

		this.showError=function(options){
			var errorOptions={
				Type: 'Error',
				headerText:'Error',
				message:{},
				buttons:[{
					text:'Close',
					fn:function(){
						self.close();
					}
				}]
			};
			angular.extend(errorOptions, options);
			this.showModal({},errorOptions);
		};

		this.showWarning = function(options) {
			var warningOptions = {
				Type: 'Warning',
				headerText:'Warning',
				message:{},
				buttons:[{
					text:'Close',
					fn:function(){
						self.close();
					}
				}]
			};
			angular.extend(warningOptions, options);
			this.showModal({},warningOptions);
		};
		this.show = function(customModalDefaults, customModalOptions) {
			//Create temp objects to work with since we're in a singleton service
			var tempModalDefaults = {};
			var tempModalOptions = {};

			//Map angular-ui modal custom defaults to modal defaults defined in service
			if (customModalOptions.Type == "Error") {
				angular.extend(tempModalDefaults, errorModalDefaults, customModalDefaults);
			} else {
				angular.extend(tempModalDefaults, warningModalDefaults, customModalDefaults);
			}

			//Map modal.html $scope custom properties to defaults defined in service
			angular.extend(tempModalOptions, modalOptions, customModalOptions);

			if (!tempModalDefaults.controller) {
				tempModalDefaults.controller = function($scope, $uibModalInstance ) {
					self.$uibModalInstance=$uibModalInstance;
					$scope.modalOptions = tempModalOptions;
					this.$uibModalInstance=$uibModalInstance;
					$scope.modalOptions.ok = function(result) {
						$uibModalInstance.close(result);
					};
					$scope.modalOptions.close = function(result) {
						$uibModalInstance.dismiss('cancel');
					};
					$scope.close=function(){
						$uibModalInstance.dismiss('cancel');
					}
				}
			}else{
				tempModalDefaults.controller.$uibModalInstance=$uibModalInstance;
			}

			return $uibModal.open(tempModalDefaults).result;
		};
		
		this.close=function(){
			this.$uibModalInstance.dismiss('cancel');
			$rootScope.errorDialogCounter--;
		};
		return this;
	}
]);
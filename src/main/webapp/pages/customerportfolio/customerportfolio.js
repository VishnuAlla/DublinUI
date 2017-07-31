Application.$controller("customerportfolioPageController", ["$scope", "DialogService", function($scope, DialogService) {
    "use strict";

    /* perform any action on widgets/variables within this block */
    $scope.onPageReady = function() {
        /*
         * variables can be accessed through '$scope.Variables' property here
         * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
         * $scope.Variables.loggedInUser.getData()
         *
         * widgets can be accessed through '$scope.Widgets' property here
         * e.g. to get value of text widget named 'username' use following script
         * '$scope.Widgets.username.datavalue'
         */
        $scope.$root.refreshBC($scope.activePageName, "Customer Portfolio", true);
        document.title = "Customer Portfolio";
    };


    $scope.anc_exportToexcelClick = function($event, $isolateScope) {
        // var status = $scope.Widgets.grid_cutomerportfolio.datavalue;
        $scope.$root.exportData("Customer Portfolio", $scope.Widgets.grid_cutomerportfolio.fullFieldDefs, $scope.Variables.GetCustomerPortfolio.dataSet, $scope.activePageName, "excel");
    };

}]);

Application.$controller("grid_cutomerportfolioController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.expandRow = function(rowObj) {
            // console.log($rootScope.Variables.expandVariable.dataSet);
            $scope.$root.expandSelectedRow("Customer Portfolio", rowObj, $scope.Widgets.grid_cutomerportfolio.fullFieldDefs);
            DialogService.showDialog("Dialog_customerporfolio");
            $scope.Widgets.grid_cutomerportfolio.selectedItems.length = 0;
        };

        $scope.CustomerProfile = function(clientId) {
            debugger
            $scope.Variables.GetClientPolicyDetails.setInput("type", "clientId");
            $scope.Variables.GetClientPolicyDetails.setInput("id", clientId);
            $scope.Variables.GetClientPolicyDetails.update({}, function(data) {
                $scope.Variables.PolicyProfileDetails.dataSet = {};
                $scope.Variables.PolicyProfileDetails.dataSet.navpath = "customerportfolio1";
                $scope.Variables.PolicyProfileDetails.dataSet.policydetails = data.PolicyDetail;
                $scope.Variables.goToPage_CustomerProfile.navigate();
            });

        };
    }

]);
Application.$controller("Dialog_customerporfolioController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);
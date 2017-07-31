Application.$controller("clientListingPageController", ["$scope", function($scope) {
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
    };
}]);

Application.$controller("allPoliciesGridController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;

        $scope.navigateToClientDetailPage = function(row) {
            $scope.Variables.goToPage_clientDetail.setData({
                "ClientId": row.ClientId
            });

            $scope.Variables.goToPage_clientDetail.navigate();
        };

        $scope.navigateToPolicyDetailPage = function(row) {
            $scope.Variables.goToPage_policyDetail.setData({
                "PolicyId": row.PolicyId
            });

            $scope.Variables.goToPage_policyDetail.navigate();
        };
    }
]);
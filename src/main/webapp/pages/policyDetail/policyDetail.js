Application.$controller("policyDetailPageController", ["$scope", function($scope) {
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

        var policyId = $scope.Variables.goToPage_policyDetail.getData().PolicyId;

        // Page service variable, bound to query variable to get the policy details.
        var svGetPolicyDetails = $scope.Variables.getPolicyDetails;
        svGetPolicyDetails.setInput("policyId", policyId);
        svGetPolicyDetails.invoke();
    };

}]);
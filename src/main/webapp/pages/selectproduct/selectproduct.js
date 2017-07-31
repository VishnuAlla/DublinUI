Application.$controller("selectproductPageController", ["$scope", function($scope) {
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
        $scope.$root.refreshBC($scope.activePageName, "Select Product", true);
    };


    $scope.btn_iprotectplusClick = function($event, $isolateScope) {
        $scope.getpolicyid($scope.Widgets.lbl_iprotectplus.caption);
    };


    $scope.btn_iprotectsmartClick = function($event, $isolateScope) {
        $scope.getpolicyid($scope.Widgets.lbl_iprotectsmart.caption);
    };


    $scope.btn_wealthbuiderClick = function($event, $isolateScope) {
        $scope.getpolicyid($scope.Widgets.lbl_wealthbuilder.caption);
    };
    $scope.getpolicyid = function(policyname) {
        $scope.Variables.GetPolicyID.setInput("name", policyname);
        $scope.Variables.GetPolicyID.update({}, function(data) {
            $scope.Variables.PolicyDetails.dataSet.navpath = "selectproduct";
            $scope.Variables.PolicyDetails.dataSet.mode = "Add";
            $scope.Variables.PolicyDetails.dataSet.policyid = data.UniquePolicyId;
            $scope.Variables.PolicyDetails.dataSet.policyname = data.PlanName;
            $scope.Variables.PolicyDetails.dataSet.currentfundvalue = data.CurrentFundValue;
            $scope.Variables.PolicyDetails.dataSet.cashvalue = data.CashValue;
            $scope.Variables.Editableform.setData({
                "createquote": false,
                "customerdetails": false,
                "proposaldetails": false,
                "btn_continuecaption": "Continue",
                "btn_step2continuecaption": "Save & Continue",
                "btn_step3continuecaption": "Save & Continue"
            });
            // $scope.Variables.goToPage_createapolicy.navigate();
            $scope.Variables.goToPage_createaquote.navigate();
        });
    };
}]);
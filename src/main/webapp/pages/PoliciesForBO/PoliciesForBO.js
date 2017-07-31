Application.$controller("PoliciesForBOPageController", ["$scope", function($scope) {
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
        $scope.$root.refreshBC($scope.activePageName, "Applications", true);
        debugger
        // $scope.Variables.getApplicationForBO.da
        $scope.Variables.getApplicationForBO.setInput("status", "Pending Issuance");
        $scope.Variables.getApplicationForBO.update();
        $scope.Widgets.pendingIssuance.class = "activetile";
        $scope.Widgets.RFIPending.class = "bg-primary";
        $scope.Widgets.RFIReceived.class = "bg-primary";
        $scope.Widgets.Approved.class = "bg-primary";
        $scope.Widgets.Cancelled.class = "bg-primary";
    };


    $scope.RFIPendingClick = function($event, $isolateScope) {
        $scope.Variables.getApplicationForBO.setInput("status", "RFIPending");
        $scope.Variables.getApplicationForBO.update();
        $scope.Widgets.RFIPending.class = "activetile";
        $scope.Widgets.pendingIssuance.class = "bg-primary";
        $scope.Widgets.RFIReceived.class = "bg-primary";
        $scope.Widgets.Approved.class = "bg-primary";
        $scope.Widgets.Cancelled.class = "bg-primary";
    };


    $scope.RFIReceivedClick = function($event, $isolateScope) {

        $scope.Variables.getApplicationForBO.setInput("status", "RFIReceived");
        $scope.Variables.getApplicationForBO.update();
        $scope.Widgets.RFIReceived.class = "activetile";
        $scope.Widgets.RFIPending.class = "bg-primary";
        $scope.Widgets.pendingIssuance.class = "bg-primary";
        $scope.Widgets.Approved.class = "bg-primary";
        $scope.Widgets.Cancelled.class = "bg-primary";
    };


    $scope.ApprovedClick = function($event, $isolateScope) {
        $scope.Variables.getApplicationForBO.setInput("status", "Approved");
        $scope.Variables.getApplicationForBO.update();
        $scope.Widgets.Approved.class = "activetile";
        $scope.Widgets.RFIReceived.class = "bg-primary";
        $scope.Widgets.RFIPending.class = "bg-primary";
        $scope.Widgets.pendingIssuance.class = "bg-primary";
        $scope.Widgets.Cancelled.class = "bg-primary";
    };


    $scope.CancelledClick = function($event, $isolateScope) {
        $scope.Variables.getApplicationForBO.setInput("status", "Rejected");
        $scope.Variables.getApplicationForBO.update();
        $scope.Widgets.Cancelled.class = "activetile";
        $scope.Widgets.RFIReceived.class = "bg-primary";
        $scope.Widgets.RFIPending.class = "bg-primary";
        $scope.Widgets.pendingIssuance.class = "bg-primary";
        $scope.Widgets.Approved.class = "bg-primary";

    };



    $scope.pendingIssuanceClick = function($event, $isolateScope) {
        $scope.Variables.getApplicationForBO.setInput("status", "Pending Issuance");
        $scope.Variables.getApplicationForBO.update();
        $scope.Widgets.pendingIssuance.class = "activetile";
        $scope.Widgets.RFIPending.class = "bg-primary";
        $scope.Widgets.RFIReceived.class = "bg-primary";
        $scope.Widgets.Approved.class = "bg-primary";
        $scope.Widgets.Cancelled.class = "bg-primary";
    };

}]);


Application.$controller("grid_policiesForBOController", ["$scope",
    function($scope) {
        "use strict";

        $scope.ctrlScope = $scope;
        $scope.manageapplication = function(row) {
            debugger
            $scope.Variables.GetCreateQuoteData.setInput({
                ApplicationID: row.ApplicationId
            });
            $scope.Variables.PolicyDetails.dataSet.policyname = row.PolicyName;
            $scope.Variables.PolicyDetails.dataSet.policyid = row.ApplicationId;
            $scope.Variables.Editableform.setData({
                "createquote": true,
                "customerdetails": true,
                "proposaldetails": true,
                "btn_continuecaption": "Update",
                "btn_step2continuecaption": "Update",
                "btn_step3continuecaption": "Update"
            });
            $scope.Variables.GetCreateQuoteData.update({}, function(data) {

                $scope.Variables.PolicyDetails.dataSet.navpath = "PoliciesBO";
                $scope.Variables.PolicyDetails.dataSet.mode = "Edit";
                $scope.Variables.PolicyDetails.dataSet.data = data;
                // $scope.Variables.goToPage_createapolicy.setData("dashboard", "navpath");
                // $scope.Variables.goToPage_createapolicy.navigate();
                $scope.Variables.goToPage_createaquote.navigate();
            });
        };
    }
]);

Application.$controller("Dialog_policydetailsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);
Application.$controller("LeadsPageController", ["$scope", "DialogService",
    function($scope, DialogService) {
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

            $scope.$root.refreshBC($scope.activePageName, "Leads", true);
        };

    }
]);

Application.$controller("grid_agentleadsController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;


        $scope.expandRow = function(rowObj) {
            // console.log($rootScope.Variables.expandVariable.dataSet);
            $scope.$root.expandSelectedRow("Leads Detail", rowObj, $scope.Widgets.grid_agentleads.fullFieldDefs);
            DialogService.showDialog("Dialog_agentleads");
            $scope.Widgets.grid_agentleads.selectedItems.length = 0;
        };

        $scope.leadsquote = function(row) {
            debugger
            $scope.Variables.PolicyDetails.dataSet.policyname = row.PlanName;
            $scope.Variables.PolicyDetails.dataSet.policyid = row.UniquePolicyId;
            $scope.Variables.Editableform.setData({
                "createquote": false,
                "customerdetails": false,
                "proposaldetails": false,
                "btn_continuecaption": "Continue",
                "btn_step2continuecaption": "Save & Continue",
                "btn_step3continuecaption": "Save & Continue"
            });


            $scope.Variables.GetPolicyID.setInput("name", row.PlanName);
            $scope.Variables.GetPolicyID.update({}, function(data) {
                $scope.Variables.PolicyDetails.dataSet.navpath = "Leads";
                $scope.Variables.PolicyDetails.dataSet.mode = "Add";
                $scope.Variables.PolicyDetails.dataSet.clientdata = row;
                $scope.Variables.PolicyDetails.dataSet.data = data;
                // $scope.Variables.PolicyProfileDetails.dataSet.navpath = "SelectProduct";
            });

            // console.log($scope.Variables.PolicyDetails.dataSet);
            $scope.Variables.goToPage_createaquote.navigate();
            /*$scope.Variables.GetCreateQuoteData.update({}, function(data) {
              
            });*/
        };

        $scope.leadsCold = function(row) {
            debugger
            /*       $scope.Variables.UpdateLeads.dataBinding.Status = false;
                   $scope.Variables.UpdateLeads.dataBinding.LeadId = row.LeadId;
            */
            $scope.Variables.UpdateLeads.setInput("LeadID", row.LeadId);
            $scope.Variables.UpdateLeads.setInput("Status", false);

            $scope.Variables.UpdateLeads.update({}, function(data) {
                // $scope.showToaster("MarkedasCold");
                $scope.Variables.GetLeads_SF.update({}, function() {
                    $scope.Variables.GetLeads_SF.getData();
                });
            });
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

Application.$controller("Dialog_agentleadsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("MarkedascoldconfirmController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);
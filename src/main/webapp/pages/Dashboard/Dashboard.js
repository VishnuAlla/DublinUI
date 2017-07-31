Application.$controller("DashboardPageController", ["$scope", function($scope) {
    "use strict";
    $scope.TotalCount = 0;
    $scope.MonthlyRenew = 0;
    $scope.WeeklyRenew = 0;
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




        $scope.today = new Date();

        // $scope.month = ($scope.today.toLocaleString("en-us", {
        //     month: "short"
        // })) + "-" + $scope.today.getFullYear();
        $scope.month = ($scope.today.toLocaleString("en-us", {
            month: "short"
        }));
        // $scope.longmonth = ($scope.today.toLocaleString("en-us", {
        //     month: "long"
        // })) + "-" + $scope.today.getFullYear();
        $scope.longmonth = ($scope.today.toLocaleString("en-us", {
            month: "short"
        })) + "-" + $scope.today.getFullYear();
        // console.log($scope.month);
        $scope.$root.refreshBC($scope.activePageName, "Dashboard", true);
        var year = $scope.today.getFullYear();
        $scope.Variables.GetBuisnessOverview.setInput({
            "year": year
        });
        $scope.Variables.GetBuisnessOverview.update({}, function(data) {
            $scope.month;

            for (var i = 0; i < data.length; i++) {
                if ($scope.month === data[i].GraphMonth) {
                    // $scope.Widgets.label15_1.caption = '$' + data[i].PremiumAmount;
                    // $scope.Widgets.label16_1.caption = '$' + data[i].Target;
                    $scope.Variables.BuisnessPremiumTarget.dataSet.Premiumvalue = data[i].Premium;
                    $scope.Variables.BuisnessPremiumTarget.dataSet.Targetvalue = data[i].Target;
                    // $scope.Widgets.label15_1.caption = '$' + (data[i].PremiumAmount == "" ? "0" : data[i].PremiumAmount);
                    // $scope.Widgets.label16_1.caption = '$' + (data[i].Target == "" ? "0" : data[i].Target);
                }
            }
        });


        var RequestBody = {
            "status": "InForce",
            "durationType": "month",
            "agentId": $scope.Variables.loggedInUser.dataSet.id
        };
        $scope.Variables.GetPoliciesDetails.setInput("RequestBody", RequestBody);
        $scope.Variables.GetPoliciesDetails.update({}, function(data) {
            debugger
            var len = data.length;
            var monthlydata = 0;

            for (var i = 0; i < len; i++) {
                monthlydata = monthlydata + parseInt(data[i].PremiumToBePaid);
                $scope.MonthlyRenew = monthlydata
            }
        });

        var RBody = {
            "status": "InForce",
            "durationType": "week",
            "agentId": $scope.Variables.loggedInUser.dataSet.id
        };
        $scope.Variables.GetPoliciesDetails.setInput("RequestBody", RBody);
        $scope.Variables.GetPoliciesDetails.update({}, function(data) {
            debugger
            var len = data.length;
            var weeklydata = 0;

            for (var i = 0; i < len; i++) {
                weeklydata = weeklydata + parseInt(data[i].PremiumToBePaid);
                $scope.WeeklyRenew = weeklydata;
            }
        });



        $scope.Variables.GetInforceData.setInput("status", "InForce");
        $scope.Variables.GetInforceData.update({}, function(data) {

            var count = $scope.Variables.GetInforceData.getData().length;
            //$scope.Widgets.lbl_pendingreneval.caption = $scope.Variables.Dashboardweekly.dataSet[0].StatusCount === null ? "0" : $scope.Variables.Dashboardweekly.dataSet[0].StatusCountcount;
            // console.log("getinforcedata", count);
            countChecked(count);
        });
        $scope.Variables.GetApplicationsData.setInput("status", "Pending Application");
        $scope.Variables.GetApplicationsData.update({}, function(data) {
            var count = $scope.Variables.GetApplicationsData.getData().length;
            $scope.Widgets.lbl_pendingapplication.caption = count;
            // console.log("getapplication", count);
            countChecked(count);
        });
        $scope.Variables.GetIssuanceData.setInput("status", "Pending Issuance");
        $scope.Variables.GetIssuanceData.update({}, function(data) {
            var count = $scope.Variables.GetIssuanceData.getData().length;
            $scope.Widgets.lbl_pendingissuance.caption = count;
            // console.log("getissuance", count);
            countChecked(count);
        });
    };
    var countChecked = function(count) {
        //to hide the navigation
        if ((count === 0) || (count <= 10))
            WM.element(".app-datagrid-paginator").hide();
        else
            WM.element(".app-datagrid-paginator").show();
    };

    $scope.anchor1Click = function($event, $isolateScope) {
        //mani
        debugger
        // var RequestBody = {
        //     "status": "InForce",
        //     "durationType": "all",
        //     "agentId": $scope.Variables.loggedInUser.dataSet.id
        // };
        // $scope.Variables.GetPoliciesDetails.setInput("RequestBody", RequestBody);
        // $scope.Variables.GetPoliciesDetails.update({}, function(data) {});
        $scope.Variables.goToPage_Policies.setData({
            "status": "InForce",
            "durationtype": "week",
            "navpath": "Dashboard"
        });
        $scope.Variables.goToPage_Policies.navigate();
    };


    $scope.anchor_pendingApplicationClick = function($event, $isolateScope) {
        // var RequestBody = {
        //     "status": "PendingApplication",
        //     "durationType": "all",
        //     "agentId": $scope.Variables.loggedInUser.dataSet.id
        // };
        // $scope.Variables.GetPoliciesDetails.setInput("RequestBody", RequestBody);
        // $scope.Variables.GetPoliciesDetails.update({}, function(data) {});
        $scope.Variables.goToPage_Policies.setData({
            "status": "Pending Application",
            "durationtype": "all",
            "navpath": "Dashboard"
        });
        $scope.Variables.goToPage_Policies.navigate();
    };


    $scope.anchor_pendingIssuanceClick = function($event, $isolateScope) {
        // var RequestBody = {
        //     "status": "PendingIssuance",
        //     "durationType": "all",
        //     "agentId": $scope.Variables.loggedInUser.dataSet.id
        // };
        // $scope.Variables.GetPoliciesDetails.setInput("RequestBody", RequestBody);
        // $scope.Variables.GetPoliciesDetails.update({}, function(data) {});
        $scope.Variables.goToPage_Policies.setData({
            "status": "Pending Issuance",
            "durationtype": "all",
            "navpath": "Dashboard"
        });
        $scope.Variables.goToPage_Policies.navigate();
    };


    $scope.reneval_containerClick = function($event, $isolateScope) {
        // var RequestBody = {
        //     "status": "",
        //     "durationType": "week",
        //     "agentId": $scope.Variables.loggedInUser.dataSet.id
        // };
        // $scope.Variables.GetPoliciesDetails.setInput("RequestBody", RequestBody);
        // $scope.Variables.GetPoliciesDetails.update({}, function(data) {});
        $scope.Variables.goToPage_Policies.setData({
            "status": "InForce",
            "durationtype": "week",
            "navpath": "Dashboard"
        });
        $scope.Variables.goToPage_Policies.navigate();
    };


    $scope.renevalmonth_containerClick = function($event, $isolateScope) {
        // var RequestBody = {
        //     "status": "",
        //     "durationType": "month",
        //     "agentId": $scope.Variables.loggedInUser.dataSet.id
        // };
        // $scope.Variables.GetPoliciesDetails.setInput("RequestBody", RequestBody);
        // $scope.Variables.GetPoliciesDetails.update({}, function(data) {});
        // $scope.Variables.GetPoliciesDetails.update({}, function(data) {});
        $scope.Variables.goToPage_Policies.setData({
            "status": "InForce",
            "durationtype": "month",
            "navpath": "Dashboard"
        });
        $scope.Variables.goToPage_Policies.navigate();
    };


    $scope.GetPolicyVolumeComparisononSuccess = function(variable, data) {
        $scope.Variables;

        for (var i = 0; i < data.length; i++) {
            $scope.TotalCount = $scope.TotalCount + parseInt(data[i].StatusCount);
        }
        // console.log($scope.TotalCount);
    };

    $scope.chart_businessoverviewSelect = function($event, $isolateScope, selectedItem, selectedChartItem) {
        $scope.Widgets;

    };


    $scope.chart_policyvolumcomparisonSelect = function($event, $isolateScope, selectedItem, selectedChartItem) {
        if (selectedItem.StatusName === "Active") {
            $scope.Variables.goToPage_Policies.setData({
                "status": "InForce",
                "durationtype": "all",
                "navpath": "Dashboard"
            });
            // $scope.Variables.goToPage_Policies.navigate();
        } else if (selectedItem.StatusName === "Pending") {
            $scope.Variables.goToPage_Policies.setData({
                "status": "Pending Application",
                "durationtype": "all",
                "navpath": "Dashboard"
            });
            // $scope.Variables.goToPage_Policies.navigate();
        } else if (selectedItem.StatusName === "Inactive") {
            $scope.Variables.goToPage_Policies.setData({
                "status": "Suspended",
                "durationtype": "all",
                "navpath": "Dashboard"
            });
            // $scope.Variables.goToPage_Policies.navigate();
        }
        $scope.Variables.goToPage_Policies.navigate();
    };


    $scope.overdue_containerClick = function($event, $isolateScope) {
        $scope.Variables.goToPage_Policies.setData({
            "status": "Overdue",
            "durationtype": "all",
            "navpath": "Dashboard"
        });
        $scope.Variables.goToPage_Policies.navigate();
    };


    $scope.suspended_containerClick = function($event, $isolateScope) {
        $scope.Variables.goToPage_Policies.setData({
            "status": "Suspended",
            "durationtype": "all",
            "navpath": "Dashboard"
        });
        $scope.Variables.goToPage_Policies.navigate();
    };


    $scope.GetBuisnessOverviewonCanUpdate = function(variable, data) {

    };


    $scope.select_yearChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.Variables.GetBuisnessOverview.setInput({
            "year": newVal
        });
        $scope.Variables.GetBuisnessOverview.update();
    };

}]);


Application.$controller("grid_pendingapplicationController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.expandRow = function(rowObj) {
            $scope.$root.expandSelectedRow("Pending Applications", rowObj, $scope.Widgets.grid_pendingapplication.fullFieldDefs);
            DialogService.showDialog("Dialog_pendingapplications"); //Edited by kajal for adding dialog in mobile view

        };
        $scope.manageapplication = function(row) {

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
            debugger
            $scope.Variables.GetCreateQuoteData.update({}, function(data) {
                $scope.Variables.PolicyDetails.dataSet.navpath = "dashboard";
                $scope.Variables.PolicyDetails.dataSet.mode = "Edit";
                $scope.Variables.PolicyDetails.dataSet.data = data;
                // $scope.Variables.goToPage_createapolicy.setData("dashboard", "navpath");
                // $scope.Variables.goToPage_createapolicy.navigate();
                $scope.Variables.goToPage_createaquote.navigate();
            });
        };
    }
]);
Application.$controller("Dialog_pendingapplicationsController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;

    }
]);
Application.$controller("grid_pendingrenevalController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.expandRow = function(rowObj) {
            // if (rowObj.ComplianceName == null || rowObj.ComplianceName.length == 0) {
            //     rowObj.ComplianceName = "No compliances assigned";
            // }
            // rowObj.employeeNameField = rowObj.FirstName + " " + rowObj.LastName;
            // rowObj.Status = rowObj.Status == "Notified" ? "Assigned" : rowObj.Status == "Pending" ? "Pending Assignment" : rowObj.Status == "PendingApproval" ? "Pending Approval" : rowObj.Status;

            $scope.$root.expandSelectedRow("Pending Reneval", rowObj, $scope.Widgets.grid_pendingreneval.fullFieldDefs);
            DialogService.showDialog("Dialog_pendingreneval"); //Edited by kajal for adding dialog in mobile view

        };
        $scope.managepolicy = function(rowObj) {

            $scope.Variables.GetClientPolicyDetails.setInput("type", "policyId");
            $scope.Variables.GetClientPolicyDetails.setInput("id", rowObj.PolicyId);
            $scope.Variables.GetClientPolicyDetails.update({}, function(data) {
                $scope.Variables.PolicyProfileDetails.dataSet = {};
                $scope.Variables.PolicyProfileDetails.dataSet.navpath = "customerportfolio";
                // console.log(data);
                $scope.Variables.PolicyProfileDetails.dataSet.policydetails = data.PolicyDetail;
                $scope.Variables.goToPage_CustomerProfile.navigate();
            });
        };
    }
]);
Application.$controller("Dialog_pendingrenevalController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;

    }
]);

Application.$controller("grid_pendingissuanceController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.expandRow = function(rowObj) {
            // if (rowObj.ComplianceName == null || rowObj.ComplianceName.length == 0) {
            //     rowObj.ComplianceName = "No compliances assigned";
            // }
            // rowObj.employeeNameField = rowObj.FirstName + " " + rowObj.LastName;
            // rowObj.Status = rowObj.Status == "Notified" ? "Assigned" : rowObj.Status == "Pending" ? "Pending Assignment" : rowObj.Status == "PendingApproval" ? "Pending Approval" : rowObj.Status;

            $scope.$root.expandSelectedRow("Pending Issuance", rowObj, $scope.Widgets.grid_pendingissuance.fullFieldDefs);
            DialogService.showDialog("Dialog_pendingissuance"); //Edited by kajal for adding dialog in mobile view

        };
        $scope.manageapplication = function(row) {
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
                $scope.Variables.PolicyDetails.dataSet.navpath = "dashboard";
                $scope.Variables.PolicyDetails.dataSet.mode = "Edit";
                $scope.Variables.PolicyDetails.dataSet.data = data;
                $scope.Variables.goToPage_createapolicy.setData("dashboard", "navpath");
                // $scope.Variables.goToPage_createapolicy.navigate();
                $scope.Variables.goToPage_createaquote.navigate();
            });
        };
    }
]);
Application.$controller("Dialog_pendingissuanceController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;

    }
]);
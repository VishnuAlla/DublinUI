Application.$controller("buisnessoverviewPageController", ["$scope", function($scope) {
    "use strict";
    $scope.month;
    $scope.year;
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
        $scope.$root.refreshBC($scope.activePageName, "Business Overview", true);
        document.title = "Business Overview";
        $scope.today = new Date();

        // $scope.month = ($scope.today.toLocaleString("en-us", {
        //     month: "short"
        // })) + "-" + $scope.today.getFullYear();
        $scope.year = $scope.today.getFullYear();
        var yearset = $scope.year;
        $scope.Variables.GetBuisnessOverview1.setInput({
            "year": $scope.year
        });
        $scope.Variables.select_year_value.addItem({
            "dataValue": yearset--
        });
        $scope.Variables.select_year_value.addItem({
            "dataValue": yearset
        });
        $scope.Variables.GetBuisnessOverview1.update();
        // console.log($scope.month);
        // $scope.Variables.GetMonthBuisnessOverview.setInput({
        //     "Month": $scope.month
        // });
        // $scope.Variables.GetMonthBuisnessOverview.update();

    };


    $scope.GetBuisnessOverview1onCanUpdate = function(variable, data) {
        // for (var i = 0; i < data.length; i++) {
        //     // console.log(data[i].Month);
        //     data[i].Month = data[i].Month.split('-')[0];
        // }
        // $('.nv-x text').attr('x', '-29');

        // $('.nv-x text').attr('y', '-8');

        // $('.nv-x text').attr('style', 'transform: rotate(-90deg);');

        // setTimeout(function() {
        //     console.log("inside timeout");
        //     var allval = $('.nv-x text');
        //     for (var i = 0; i < allval.length; i++) {
        //         console.log("inside for loop " + i);
        //         $('.nv-x text')[i].innerHTML = allval[i].__data__.substring(0, 3);
        //         // allval[i].__data__.substring(0,3)
        //     }
        //     $('.nv-x text').attr('x', '-29');

        //     $('.nv-x text').attr('y', '-8');

        //     $('.nv-x text').attr('style', 'transform: rotate(-90deg);');
        // }, 200);
    };


    $scope.select_yearChange = function($event, $isolateScope, newVal, oldVal) {

        if (newVal < $scope.year) {
            $scope.Widgets.gridPolicydetails.month = "Jan-" + newVal;
        } else {
            $scope.Widgets.gridPolicydetails.month = ($scope.today.toLocaleString("en-us", {
                month: "short"
            })) + "-" + newVal;
        }
        console.log($scope.Widgets.gridPolicydetails.month);
        $scope.Variables.GetBuisnessOverview1.setInput({
            "year": newVal
        });
        $scope.Variables.GetBuisnessOverview1.update({}, function(data) {
            $scope.Variables.GetMonthBuisnessOverview.setInput({
                "Month": $scope.Widgets.gridPolicydetails.month
            });
            $scope.Variables.GetMonthBuisnessOverview.update();
        });
        debugger;
        // $scope.Variables.GetBuisnessOverview1.setInput({
        //     "year": newVal
        // });
        // $scope.Variables.GetBuisnessOverview1.update({}, function(data) {
        //     $scope.Variables.GetMonthBuisnessOverview.setInput({
        //         "Month": "Jan-" + $scope.Widgets.select_year.datavalue
        //     });
        //     $scope.Variables.GetMonthBuisnessOverview.update({}, function(data) {
        //         $scope.month = "Jan-" + $scope.Widgets.select_year.datavalue;
        //     });
        // });
        // setTimeout(function() {
        //     console.log("inside timeout");
        //     var allval = $('.nv-x text');
        //     for (var i = 0; i < allval.length; i++) {
        //         console.log("inside for loop " + i);
        //         $('.nv-x text')[i].innerHTML = allval[i].__data__.substring(0, 3);
        //         // allval[i].__data__.substring(0,3)
        //     }
        //     $('.nv-x text').attr('x', '-29');

        //     $('.nv-x text').attr('y', '-8');

        //     $('.nv-x text').attr('style', 'transform: rotate(-90deg);');
        // }, 200);
    };


    $scope.chart_buisnessoverviewTransform = function($event, $isolateScope) {
        // setTimeout(function() {
        //     console.log("inside timeout");
        //     var allval = $('.nv-x text');
        //     for (var i = 0; i < allval.length; i++) {
        //         console.log("inside for loop " + i);
        //         $('.nv-x text')[i].innerHTML = allval[i].__data__.substring(0, 3);
        //         // allval[i].__data__.substring(0,3)
        //     }
        //     $('.nv-x text').attr('x', '-29');

        //     $('.nv-x text').attr('y', '-8');

        //     $('.nv-x text').attr('style', 'transform: rotate(-90deg);');
        // }, 200);
    };

}]);


Application.$controller("grid1Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("GridOnClickController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.expandRow = function(rowObj) {

            $scope.$root.expandSelectedRow("buisnessoverview", rowObj, $scope.Widgets.GridOnClick.fullFieldDefs);
            DialogService.showDialog("Dialog_buisnessoverviewdetails");
            $scope.Widgets.GridOnClick.selectedItems.length = 0;
        };



        $scope.CustomerProfile = function(clientId) {

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
Application.$controller("Dialog_buisnessoverviewdetailsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);
Application.$controller("gridPolicydetailsController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
        debugger;
        $scope.GetMonth = function(row) {
            $scope.Variables.GetMonthBuisnessOverview.setInput({
                "Month": row.Month
            });
            $scope.Variables.GetMonthBuisnessOverview.update();
        };
        $scope.today = new Date();

        $scope.month = ($scope.today.toLocaleString("en-us", {
            month: "short"
        })) + "-" + $scope.today.getFullYear();
        $scope.Variables.GetMonthBuisnessOverview.setInput({
            "Month": $scope.month
        });
        $scope.Variables.GetMonthBuisnessOverview.update();
    }
]);

Application.$controller("grid3Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);
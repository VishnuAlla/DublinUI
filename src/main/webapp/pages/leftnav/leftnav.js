Application.$controller("leftnavPageController", ["$scope", function($scope) {
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
        $scope.Widgets;
        if ($scope.Variables.PolicyDetails.dataSet.navpath === "PoliciesBO" || $scope.activePageName === "PoliciesForBO") {
            // $('.wm-app .app-nav .app-nav-item > a')[3].addClass("active");
        }
        var titlelabel = $('.wm-app .open > .dropdown-menu li a').attr('title');
        if (($scope.activePageName === "buisnessoverview") || ($scope.activePageName === "Myearnings")) {
            $('.wm-app .app-nav .app-nav-item>.dropdown').addClass('open');
            if ($('.wm-app .open > .dropdown-menu li a').attr('title') === "Buisness Overview") {
                $('.wm-app .open > .dropdown-menu li a').addClass('active');
            } else if ($('.wm-app .open > .dropdown-menu li a').attr('title') === "My Earning") {
                $('.wm-app .open > .dropdown-menu li a').addClass('active');
            }
        } else {
            $('.wm-app .app-nav .app-nav-item>.dropdown').removeClass('open');
            $('.wm-app .open > .dropdown-menu li a').removeClass('active');
        }

    };


    $scope.anchor7Click = function($event, $isolateScope) {
        $scope.Variables.goToPage_Policies.setData({
            "status": "InForce",
            "durationtype": "all",
            "navpath": "LeftNav"
        });
        $scope.Variables.goToPage_Policies.navigate();
    };


    $scope.btn_createquoteClick = function($event, $isolateScope) {
        $scope.Variables.goToPage_createaquote.setData("leftnav", "navpath");
        $scope.Variables.goToPage_createaquote.navigate();
    };


    $scope.menu3LinkClick = function($event, $isolateScope) {
        if ($isolateScope.class === 'parent-menu') {
            $isolateScope.class = 'parent-menu active';
        } else if ($isolateScope.class === 'parent-menu active') {
            $isolateScope.class = 'parent-menu';
        }
        $scope.Variables.expandmenu1.dataSet.dataValue = false;
        $scope.Variables.expandmenu2.dataSet.dataValue = false;
        $scope.Variables.expandmenu3.dataSet.dataValue = !$scope.Variables.expandmenu3.dataSet.dataValue;
    };

}]);
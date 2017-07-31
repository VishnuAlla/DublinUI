Application.$controller("headerPageController", ["$scope", function($scope) {
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
        $scope.Widgets.VersionLabel.caption = "Ver.No: " + _WM_APP_PROPERTIES.version;
        $scope.Widgets;
        // debugger;
        // $scope.Variables.loginVariable.dataBinding
        // $scope.$root.LoginData($scope.Variables.loginVariable.dataBinding);
        // if (sessionStorage.LoginData == undefined || sessionStorage.LoginData == "") {
        //     $scope.$root.LoginData($scope.Variables.loginVariable.dataBinding);
        // } else {
        //     var LoginData = angular.fromJson(sessionStorage.LoginData);
        //     $scope.Variables.loggedInUser.dataSet.username = LoginData.username;
        //     if ($scope.Variables.loggedInUser.dataSet.roles[0] === "")
        //         $scope.Variables.loggedInUser.dataSet.roles[0] = LoginData.roles;

        // }
    };

}]);
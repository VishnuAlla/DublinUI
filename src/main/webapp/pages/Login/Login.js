Application.$controller("LoginPageController", ["$scope",
    function($scope) {
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
            $scope.Widgets.label2_1.caption = "Version No: " + _WM_APP_PROPERTIES.version;
        };

        $scope.loginVariableonError = function(variable, data) {
            $scope.Widgets.invallidcredentails.caption = data;
            $scope.Widgets.invallidcredentails.show = true;

        };

    }
]);

Application.$controller("loginFormController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;

        $scope.loginFormSubmit = function($event, $isolateScope) {
            // debugger;
            $scope.Variables.loginVariable.dataBinding.role = $scope.Widgets.roleselect.datavalue;
            // $scope.Variables.loggedInUser.dataSet.name = $scope.Widgets.usernametext.datavalue;
            // $scope.Variables.loggedInUser.dataSet.username = $scope.Widgets.usernametext.datavalue;
            // // console.log($scope.Variables.loggedInUser.dataSet);
            // $scope.$root.LoginData($scope.Variables.loginVariable.dataBinding);
            $scope.Variables.loginVariable.invoke();
        };

    }
]);
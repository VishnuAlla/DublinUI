Application.$controller("ProfilePageController", ["$scope", function($scope) {
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
        // debugger;
        $scope.$root.refreshBC($scope.activePageName, "Profile", true);

    };


    $scope.anchor1Click = function($event, $isolateScope) {
        $scope.Widgets.anc_save.show = true;
        $scope.Widgets.anc_cancel.show = true;
        $scope.Widgets.anc_edit.show = false;
        $scope.Widgets.txt_maritalstatus.disabled = false;
    };


    $scope.anc_mobile_editClick = function($event, $isolateScope) {
        $scope.Widgets.anc_mobile_save.show = true;
        $scope.Widgets.anc_mobile_cancel.show = true;
        $scope.Widgets.anc_mobile_edit.show = false;
        $scope.Widgets.txt_mobilenumber.disabled = false;
    };


    $scope.anc_address_editClick = function($event, $isolateScope) {
        $scope.Widgets.anc_address_save.show = true;
        $scope.Widgets.anc_address_cancel.show = true;
        $scope.Widgets.anc_address_edit.show = false;
        $scope.Widgets.txt_address.disabled = false;
    };


    $scope.anc_email_editClick = function($event, $isolateScope) {
        $scope.Widgets.anc_email_save.show = true;
        $scope.Widgets.anc_email_cancel.show = true;
        $scope.Widgets.anc_email_edit.show = false;
        $scope.Widgets.txt_email.disabled = false;
    };


    $scope.anc_cancelClick = function($event, $isolateScope) {
        $scope.Widgets.anc_save.show = false;
        $scope.Widgets.anc_cancel.show = false;
        $scope.Widgets.anc_edit.show = true;
        $scope.Widgets.txt_maritalstatus.disabled = true;
    };


    $scope.anc_mobile_cancelClick = function($event, $isolateScope) {
        $scope.Widgets.anc_mobile_save.show = false;
        $scope.Widgets.anc_mobile_cancel.show = false;
        $scope.Widgets.anc_mobile_edit.show = true;
        $scope.Widgets.txt_mobilenumber.disabled = true;
    };


    $scope.anc_address_cancelClick = function($event, $isolateScope) {
        $scope.Widgets.anc_address_save.show = false;
        $scope.Widgets.anc_address_cancel.show = false;
        $scope.Widgets.anc_address_edit.show = true;
        $scope.Widgets.txt_address.disabled = true;
    };


    $scope.anc_email_cancelClick = function($event, $isolateScope) {
        $scope.Widgets.anc_email_save.show = false;
        $scope.Widgets.anc_email_cancel.show = false;
        $scope.Widgets.anc_email_edit.show = true;
        $scope.Widgets.txt_email.disabled = true;
    };


    $scope.anc_saveClick = function($event, $isolateScope) {
        $scope.populateRequestBody();
        // debugger;
        $scope.Widgets.anc_save.show = false;
        $scope.Widgets.anc_cancel.show = false;
        $scope.Widgets.anc_edit.show = true;
        $scope.Widgets.txt_maritalstatus.disabled = true;
    };


    $scope.anc_mobile_saveClick = function($event, $isolateScope) {
        $scope.populateRequestBody();
        $scope.Widgets.anc_mobile_save.show = false;
        $scope.Widgets.anc_mobile_cancel.show = false;
        $scope.Widgets.anc_mobile_edit.show = true;
        $scope.Widgets.txt_mobilenumber.disabled = true;
    };


    $scope.anc_email_saveClick = function($event, $isolateScope) {
        $scope.populateRequestBody();
        $scope.Widgets.anc_email_save.show = false;
        $scope.Widgets.anc_email_cancel.show = false;
        $scope.Widgets.anc_email_edit.show = true;
        $scope.Widgets.txt_email.disabled = true;
    };

    $scope.anc_address_saveClick = function($event, $isolateScope) {
        $scope.populateRequestBody();
        $scope.Widgets.anc_address_save.show = false;
        $scope.Widgets.anc_address_cancel.show = false;
        $scope.Widgets.anc_address_edit.show = true;
        $scope.Widgets.txt_address.disabled = true;
    };
    var RequestBody = {};
    $scope.populateRequestBody = function() {
        RequestBody = {
            "maritalStatus": $scope.Widgets.txt_maritalstatus.datavalue,
            "mobileNumber": $scope.Widgets.txt_mobilenumber.datavalue,
            "emailId": $scope.Widgets.txt_email.datavalue,
            "address": $scope.Widgets.txt_address.datavalue,
            "userId": $scope.Variables.loggedInUser.dataSet.id
        };
        // console.log(RequestBody);
        $scope.Variables.EditProfile.setInput("RequestBody", RequestBody);
        $scope.Variables.EditProfile.update();

    };
}]);
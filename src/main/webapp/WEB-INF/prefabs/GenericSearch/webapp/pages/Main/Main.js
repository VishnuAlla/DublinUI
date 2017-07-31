Application.$controller("GenericSearchController", ["$scope", function($scope) {
    "use strict";

    /* 
     * This function will be invoked when any of this prefab's property is changed
     * @key: property name
     * @newVal: new value of the property
     * @oldVal: old value of the property
     */
    function propertyChangeHandler(key, newVal, oldVal) {
            switch (key) {
                case "searchdata":
                    if ($scope.isSearchApplied) {
                        $scope.isSearchApplied = false;
                    } else {
                        //The grid data is refreshed with real data.
                        $scope.DataForSearch = newVal;
                        //Remove/clear text from search text widget.
                        $scope.clearSearchText();
                    }
                    break;
                case "searchtext":
                    break;
            }

        }
        /* register the property change handler */
    $scope.propertyManager.add($scope.propertyManager.ACTIONS.CHANGE, propertyChangeHandler);

    $scope.onInitPrefab = function() {
        // this method will be triggered post initialization of the prefab.
    };
    $scope.isSearchApplied = false;
    $scope.DataForSearch = [];
    $scope.searchbtnClick = function($event, $isolateScope) {
        var SearchText = $scope.Widgets.searchtext.datavalue.toLowerCase();
        var variableName = $isolateScope.$parent.variablename;
        var varScope = $scope.$parent.$parent;
        if (variableName === undefined) {
            console.log("Error: The property 'variableName' is not given or it's not defined.");
            return;
        }
        var filteredData = jQuery.grep($scope.DataForSearch, function(rowData, rowDataIndex) {
            var isSearchTextFound = false;
            //Do search only on the Variable

            $.each(rowData, function(key, value) {
                if (value !== undefined && value !== null && value.toString().toLowerCase().indexOf(SearchText) >= 0) {
                    isSearchTextFound = true;
                    return false;
                }
            });
            return isSearchTextFound;
        });
        $scope.isSearchApplied = true;
        varScope.Variables[variableName].dataSet = filteredData;
    };

    $scope.clearSearchText = function() {
        $scope.Widgets.searchtext.datavalue = "";
    };

    $scope.searchtextKeyup = function($event, $isolateScope) {
        if ($event.which === 13) {
            console.log($event);
            console.log($isolateScope);
            $scope.searchbtnClick($event, $isolateScope);
        }
    };

}]);
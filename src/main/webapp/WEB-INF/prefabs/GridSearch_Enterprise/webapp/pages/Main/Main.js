Application.$controller("GridSearchController", ["$scope", function($scope) {
    "use strict";

    /* 
     * This function will be invoked when any of this prefab's property is changed
     * @key: property name
     * @newVal: new value of the property
     * @oldVal: old value of the property
     removed by saurabh (debugger)
     */
    function propertyChangeHandler(key, newVal, oldVal) {


            switch (key) {
                case "griddata":
                    if ($scope.isGridSearchApplied) {
                        $scope.isGridSearchApplied = false;
                    } else {
                        //The grid data is refreshed with real data.
                        $scope.gridDataForSearch = newVal;
                        //Remove/clear text from search text widget.
                        $scope.clearSearchText();
                    }
                    break;
                case "gridsearchtext":
                    break;
            }

        }
        /* register the property change handler */
    $scope.propertyManager.add($scope.propertyManager.ACTIONS.CHANGE, propertyChangeHandler);

    $scope.onInitPrefab = function() {
        // this method will be triggered post initialization of the prefab.
    }

    $scope.isGridSearchApplied = false;
    $scope.gridDataForSearch = [];




    $scope.searchbtnClick = function($event, $isolateScope) {


        var gridSearchText = $scope.Widgets.gridsearchtext.datavalue.toLowerCase();
        var gridName = $isolateScope.$parent.girdname;
        var gridScope = $scope.$parent.$parent;
        var gridWidget = gridScope.Widgets[gridName];

        if (gridName === undefined || gridWidget === undefined) {
            console.log("Error: The property 'gridname' is not given or it's not defined.");
            return;
        }
        var filteredData = jQuery.grep($scope.gridDataForSearch, function(rowData, rowDataIndex) {

            var isGridSearchTextFound = false;
            //console.log(rowData);
            //Do grid search only on the column configured to display.
            $.each(gridWidget.columns, function(columnIndex, column) {
                //console.log(column);
                //It number convert into string to do string comparision.
                var columnValue = rowData[column.field] + "";
                if (columnValue !== undefined && columnValue.toLowerCase().indexOf(gridSearchText) >= 0) {
                    isGridSearchTextFound = true;
                    return false; //It breaks the for each loop.
                }
            });
            return isGridSearchTextFound;
        });

        $scope.isGridSearchApplied = true;
        gridScope.Variables[gridWidget.variableName].dataSet = filteredData;
    };


    $scope.clearSearchText = function() {
        $scope.Widgets.gridsearchtext.datavalue = "";
    };



    $scope.gridsearchtextKeyup = function($event, $isolateScope) {
        if ($event.which === 13) {

            console.log($event);
            console.log($isolateScope);
            $scope.searchbtnClick($event, $isolateScope);
        }
    };




}]);
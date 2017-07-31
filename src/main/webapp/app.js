Application.run(function($rootScope) {
    "use strict";

    // .config(['$routeProvider',function($routeProvider) {
    //     // works with arrive js
    //     $.material.init();
    // }]);
    /* perform any action on the variables within this block(on-page-load) */
    $rootScope.onAppVariablesReady = function() {
        /*
         * variables can be accessed through '$rootScope.Variables' property here
         * e.g. $rootScope.Variables.staticVariable1.getData()
         */
    };

    /* perform any action on session timeout here, e.g clearing some data, etc */
    $rootScope.onSessionTimeout = function() {
        /*
         * NOTE:
         * On re-login after session timeout:
         * if the same user logs in(through login dialog), app will retain its state
         * if a different user logs in, app will be reloaded and user is redirected to respective landing page configured in Security.
         */
    };

    /* $(window).load(function() {
         // executes when complete page is fully loaded, including all frames, objects and images
         if (sessionStorage.Breadcrumbs != undefined && sessionStorage.Breadcrumbs != "" && sessionStorage.Breadcrumbs.length > 0) {
             var breadcrumb = angular.fromJson(sessionStorage.Breadcrumbs);
             document.title = breadcrumb[breadcrumb.length - 1].bcLable;
         }
     });*/
    $rootScope.loginVariableonResult = function(variable, data) {
        // alert(data);
        // $rootScope;
        // debugger;
    };


    $rootScope.loginVariableonError = function(variable, data) {
        // debugger;
        // alert(data);
        $rootScope.Widgets.invallidcredentails.caption = data;
        $rootScope.Widgets.invallidcredentails.show = true;
    };
    $rootScope.LoginData = function(pageData) {
        // debugger;
        console.log(pageData);
        $rootScope.Variables.loggedInUser.dataSet.username = pageData.username;
        // if ($rootScope.Variables.loggedInUser.dataSet.roles[0] === "")
        // $rootScope.Variables.loggedInUser.dataSet.roles = pageData.role;
        // $rootScope.Variables.loggedInUser.dataSet.roles = pageData.role;

        if (($rootScope.Variables.loggedInUser.dataSet.length == 0) && sessionStorage.LoginData != undefined) {
            $rootScope.Variables.loggedInUser.dataSet = angular.fromJson(sessionStorage.LoginData);
        }
        sessionStorage.LoginData = JSON.stringify($rootScope.Variables.loggedInUser.dataSet);
    };
    $rootScope.refreshBC = function(currentPageName, currentPageBCLabel, isBCFirstEntry, pageData) {
        // debugger
        var currentPageBC = {
            "bcLable": currentPageBCLabel,
            "pageName": currentPageName,
            //"link": "#/" + currentPageName + "?" + jQuery.param($rootScope.Variables['goToPage_' + currentPageName].getData())
            "link": "#/" + currentPageName,
            "pageData": pageData != undefined ? JSON.stringify(pageData) : ""
        };
        //console.log(currentPageBC);

        if (isBCFirstEntry === true) {
            $rootScope.Variables.Breadcrumbs.dataSet = [];
            //Add current page entry
            currentPageBC.index = 0;
            $rootScope.Variables.Breadcrumbs.dataSet.push(currentPageBC);
        } else {
            if (($rootScope.Variables.Breadcrumbs.dataSet.length == 0 || $rootScope.Variables.Breadcrumbs.dataSet[0].pageName.length == 0) && sessionStorage.Breadcrumbs != undefined)
                $rootScope.Variables.Breadcrumbs.dataSet = angular.fromJson(sessionStorage.Breadcrumbs);

            /*Find if the currentPage details already there in breadcrumbs dataset. 
            If so, remove all items from that index. Else, add current page detail to the dataset.*/
            var currentPageDataIndex;
            for (var i = 0; i < $rootScope.Variables.Breadcrumbs.dataSet.length; i++) {
                var item = $rootScope.Variables.Breadcrumbs.dataSet[i];
                if (item.pageName === currentPageName) {
                    currentPageDataIndex = i;
                    $rootScope.Variables.Breadcrumbs.dataSet[i] = currentPageBC;
                    break;
                }
            }
            // debugger
            if (currentPageDataIndex > 0) {
                $rootScope.Variables.Breadcrumbs.dataSet.splice(currentPageDataIndex + 1);
            } else {
                currentPageBC.index = $rootScope.Variables.Breadcrumbs.dataSet.length;
                $rootScope.Variables.Breadcrumbs.dataSet.push(currentPageBC);
            }
        }
        var firstentry;
        if ($rootScope.Variables.Breadcrumbs.dataSet.length !== 1) {
            // debugger;
            firstentry = false;
            if (firstentry === false) {
                var str = $rootScope.Variables.Breadcrumbs.dataSet[0].bcLable;
                var replacement = /\//g;
                var replaced = str.replace(replacement, "");
                $rootScope.Variables.Breadcrumbs.dataSet[0].bcLable = replaced;
            }

        } else {
            $rootScope.Variables.Breadcrumbs.dataSet[0].bcLable = $rootScope.Variables.Breadcrumbs.dataSet[0].bcLable + " /";
            firstentry = true;
        }
        sessionStorage.Breadcrumbs = JSON.stringify($rootScope.Variables.Breadcrumbs.dataSet);
        //console.log($rootScope.Variables.Breadcrumbs.dataSet);

    };



    $rootScope.expandSelectedRow = function(currentPage, rowObj, columnsObj) {
        $rootScope.Variables.expandVariable.dataSet = [];
        var column = "";
        var value = "";
        for (var k in columnsObj) {
            var j = columnsObj[k].field;
            column = columnsObj[k];
            for (var i in rowObj) {
                // debugger
                if (i != "actionField" && i != "expandField" && i == j && column.displayName != undefined && column.displayName.length > 0) {

                    value = rowObj[i];
                    if (column.formatpattern == "toDate" && value != null && value != undefined && value.toString().length > 0) {
                        value = new Date(value).toLocaleString();
                    }

                    if (value != undefined && value != null && value.toString().length > 0) {
                        $rootScope.Variables.expandVariable.dataSet.push({
                            "key": column.displayName,
                            "value": value
                        });
                    }
                }
            }
        }
    };

    $rootScope.exportData = function(sheetName, colDefs, fullDataSet, pageName, fileType) {

        if (fullDataSet.length == 0) {
            $rootScope.Variables.exportNoDataError.notify();
            return;
        }

        alasql.fn.datetime = function(dateStr) {
            if (dateStr != undefined && dateStr != null && dateStr.toString().length > 0) {
                var date = new Date(dateStr);
                return date.toLocaleString();
            } else
                return "";
        };

        var mystyle = {
            headers: true,
            column: {
                style: {
                    Font: {
                        Bold: "1"
                    }
                }
            }
        };

        if (fileType === "excel") {
            var selectField = "";
            var column = "";
            //get all column headers
            for (var i in colDefs) {
                column = colDefs[i];
                if (column.displayName != undefined && column.field != undefined && column.displayName != "" && column.field != "expandField") {
                    if (column.formatpattern == "toDate") {
                        // selectField = selectField + ",CONVERT(STRING,new Date(" + column.field + "), 106) as [" + column.displayName + "] ";
                        selectField = selectField + ",datetime(" + column.field + ") as [" + column.displayName + "] ";
                    } else
                        selectField = selectField + "," + column.field + " as [" + column.displayName + "] ";
                }
            }

            if (selectField.length > 1) {
                selectField = selectField.substr(1);

                alasql('SELECT ' + selectField + 'INTO XLSXML("' + sheetName + '.xls",?) FROM ?', [mystyle, fullDataSet]);
            }
        }
    };

}).filter('range', function() {
    return function(input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i <= max; i++)
            input.push(i);
        return input;
    };
}).directive('taButton', [function() {

    return {
        link: function(scope, element, attrs) {
            element.attr('unselectable', 'on');
            element.on('mousedown', function(e, eventData) {
                if (eventData) angular.extend(e, eventData);
                e.preventDefault();
                return false;

            });
        }
    };
}])

.config(['$provide', function($provide) {

    $provide.decorator('$route', function($delegate) {

        var routes = $delegate.routes;
        _.forEach(routes, function(route) {
            route.reloadOnSearch = false;
        });

        return $delegate;


        $rootScope.GetNominationsByStatusonResult = function(variable, data) {
            $scope.Widgets.gridNominationsByStatus.dataNavigator.dn.currentPage = 1;
        };


        $rootScope.TrainingCalenderDetailsonBeforeDatasetReady = function(variable, data) {
            debugger;
            var checktoday = true;
            console.log(data.length);
            console.log(data);
            if (!$scope.dateclicked) {
                if (data.length === 0) {
                    CalenderData = [];
                }
                CalenderData = [];
                for (var i = 0; i < data.length; i++) {
                    CalenderData.push({
                        "badge": true,
                        "date": data[i].TrainingDate,
                        "title": data[i].TrainingName
                    });
                }

            }
            $scope.Variables.DateValues.setData(CalenderData);
            var checki = 0;
            if (data.length !== 0) {
                for (var j = 0; j < data.length; j++) {
                    if ($scope.today === data[j].TrainingDate) {
                        checktoday = false;
                        checki = j;

                    }
                }
                $scope.xx = _.find(data, function($el, index) {
                    if ($el.TrainingDate > $scope.today) {
                        return $el.TrainingDate;
                    }
                });
            }
            console.log($scope.xx);
            $scope.Widgets.NoTrainingParentContainer.show = checktoday;
            setTimeout(function() {
                $scope.ScrollLiveList($scope.xx);
                var tt = $scope.today.substring(8, 10);
                var day = $(".day:contains(" + tt + ")");
                if (day != null || day != undefined) {
                    day.find('span').addClass('badge-today').removeClass('badge-event');
                }

            }, 1000);
        };




    });




    function deleteCookies() {
        var allcookies = document.cookie.split(";");

        for (var i = 0; i < allcookies.length; i++) {
            var cookie = allcookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }


}]);
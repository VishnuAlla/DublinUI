Application.$controller("breadcrumPageController", ["$scope", "$timeout", function($scope, $timeout) {
    "use strict";

    $scope.onPageReady = function() {
        //This code is to enable click event on breadcrumbs item which will call the goToPage variable, so that the pageParams will be maintained.
        $timeout(function() {
            $scope.Widgets.breadcrumb1.$element.on('click', function(e) {
                e.preventDefault();
                var $el = $(e.target);
                var itemScope;
                var href;
                if ($el.is('a')) {
                    itemScope = $el.scope();
                    href = itemScope.item[$scope.Widgets.breadcrumb1.itemlink];
                    if (_.startsWith(href, '#')) {
                        href = href.substring(2);
                    }
                    $scope.$root.Variables['goToPage_' + href].navigate();
                }
            });
        });
    }

    /*$scope.breadcrumbnavSelect = function($event, $isolateScope, $item) {
        console.log($item);
        if ($item.index === $scope.Variables.Breadcrumbs.dataSet.length - 1) {
            //if it's a last item of the breadcrumb.. just return.. no need to navigate page.
            return;
        }
        //Remove all items from $item.index value. 
        //$scope.Variables.Breadcrumbs.dataSet.splice($item.index);
        //Set data
        if ($item.pageData !== undefined) {
            $scope.Variables['goToPage_' + $item.pageName].setData($item.pageData);
        }
        //Navigate to the page
        $scope.Variables['goToPage_' + $item.pageName].navigate();
    };*/

}]);
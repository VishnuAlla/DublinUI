Application.$controller("NeedAnalysisPageController", ["$scope", function($scope) {
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
        $scope.$root.refreshBC($scope.activePageName, "Need Analysis", true);
        document.title = "Need Analysis";
        $('[name=tile_parentkids]').hover(function() {
            $('[name=picture_parentkids]').attr(
                "src", "resources/images/imagelists/needanalysislogos/parent-with-kids-icon-copy.png"
            );
        }, function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_parentkids]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/parent-with-kids-icon.png"
                );
            }
        });
        $('[name=tile_parentkids]').on('click', function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_parentkids]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/parent-with-kids-icon-copy.png"
                );
            }
        });
        $('[name=tile_youngtile]').hover(function() {
            $('[name=picture_youngtile]').attr(
                "src", "resources/images/imagelists/needanalysislogos/icons-copy.png"
            );
        }, function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_youngtile]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/icons.png"
                );
            }
        });
        $('[name=tile_youngtile]').on('click', function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_youngtile]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/icons-copy.png"
                );
            }
        });
        $('[name=tile_retirement]').hover(function() {

            $('[name=picture_retirement]').attr(
                "src", "resources/images/imagelists/needanalysislogos/retire-icon-copy.png"
            );
        }, function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_retirement]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/retire-icon.png"
                );
            }
        });
        $('[name=tile_retirement]').on('click', function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=tile_retirement]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/retire-icon-copy.png"
                );
            }
        });
        $('[name=tile_longtermwealth]').hover(function() {
            $('[name=picture_longtermwealth]').attr(
                "src", "resources/images/imagelists/needanalysislogos/wealth-icon-copy.png"
            );
        }, function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_longtermwealth]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/wealth-icon.png"
                );
            }
        });
        $('[name=tile_longtermwealth]').on('click', function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=tile_longtermwealth]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/wealth-icon-copy.png"
                );
            }
        });
        $('[name=tile_lifeprotection]').hover(function() {
            $('[name=picture_lifeprotection]').attr(
                "src", "resources/images/imagelists/life-protection.png"
            );
        }, function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_lifeprotection]').attr(
                    "src", "resources/images/imagelists/life-protection-copy.png"
                );
            }
        });
        $('[name=tile_lifeprotection]').on('click', function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=tile_lifeprotection]').attr(
                    "src", "resources/images/imagelists/life-protection.png"
                );
            }
        });
        $('[name=tile_retirmentplan]').hover(function() {
            $('[name=picture_retirmentplan]').attr(
                "src", "resources/images/imagelists/needanalysislogos/retire-icon-copy.png"
            );
        }, function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_retirmentplan]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/retire-icon.png"
                );
            }
        });
        $('[name=tile_retirmentplan]').on('click', function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=tile_retirmentplan]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/retire-icon-copy.png"
                );
            }
        });
        $('[name=tile_conservative]').hover(function() {
            $('[name=picture_conservative]').attr(
                "src", "resources/images/imagelists/needanalysislogos/conservative-icon-copy.png"
            );
        }, function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_conservative]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/conservative-icon.png"
                );
            }
        });
        $('[name=tile_conservative]').on('click', function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=tile_conservative]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/conservative-icon-copy.png"
                );
            }
        });
        $('[name=tile_moderate]').hover(function() {
            $('[name=picture_moderate]').attr(
                "src", "resources/images/imagelists/needanalysislogos/moderate-icon-copy.png"
            );
        }, function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_moderate]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/moderate-icon.png"
                );
            }
        });
        $('[name=tile_moderate]').on('click', function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=tile_moderate]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/moderate-icon-copy.png"
                );
            }
        });
        $('[name=tile_aggressive]').hover(function() {
            $('[name=picture_aggressive]').attr(
                "src", "resources/images/imagelists/needanalysislogos/aggresive-icon-copy.png"
            );
        }, function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=picture_aggressive]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/aggresive-icon.png"
                );
            }
        });
        $('[name=tile_aggressive]').on('click', function() {
            if (!($(this).hasClass('activetile'))) {
                $('[name=tile_aggressive]').attr(
                    "src", "resources/images/imagelists/needanalysislogos/aggresive-icon-copy.png"
                );
            }
        });
    };
    $scope.showToaster = function(variableName) {
        $scope.Variables[variableName].notify();
    };

    $scope.picture2Click = function($event, $isolateScope) {
        $scope.Widgets;

    };






    // $scope.plusBtnClick = function($event, $isolateScope) {
    //     // Get the field name
    //     // $scope.Widgets.ageTxt.dataValue = '0';
    //     if ($scope.Widgets.ageTxt.placeholder != null || $scope.Widgets.ageTxt.placeholder != "") {
    //         if ($scope.Widgets.ageTxt.placeholder <= "64") {
    //             $scope.Widgets.ageTxt.dataValue = parseInt($scope.Widgets.ageTxt.placeholder) + 1;
    //             $scope.Widgets.ageTxt.placeholder = $scope.Widgets.ageTxt.dataValue;
    //         }
    //     }
    // };


    // $scope.minusBtnClick = function($event, $isolateScope) {
    //         //     if ($scope.Widgets.ageTxt.placeholder != null || $scope.Widgets.ageTxt.placeholder != "") {
    //         if ($scope.Widgets.ageTxt.placeholder >= "1") {
    //             $scope.Widgets.ageTxt.dataValue = parseInt($scope.Widgets.ageTxt.placeholder) - 1;
    //             $scope.Widgets.ageTxt.placeholder = $scope.Widgets.ageTxt.dataValue;
    //         }
    //     }
    // };


    $scope.calBtnClick = function($event, $isolateScope) {

        if ($scope.Widgets.IncomeAmnt.datavalue == null || $scope.Widgets.IncomeAmnt.datavalue == '') {

            $scope.showToaster("ConfirmationError");
            return;
        }

        var CAI = [];

        if ($scope.Variables.DetailsByAge.dataBinding.rng == undefined) {
            var CA = "12";
        } else
            var CA = $scope.Variables.DetailsByAge.dataBinding.rng;
        $scope.Variables.getIncomeDetails.update({}, function(data) {
            debugger
            CAI = data[0].CAI;
            var amnt = $scope.Widgets.IncomeAmnt.datavalue;
            var calculatedAmount = parseFloat(amnt * CA * CAI).toFixed(2);
            var TotalAmount = parseFloat(calculatedAmount * "0.015").toFixed(2)
            var amount = nFormatter(calculatedAmount, 1);
            var words = toWords(calculatedAmount);
            $scope.Variables.InsuranceAmount.setData({
                "Amount": "$" + amount,
                "AmountInWords": words
            });
        });

        $scope.Widgets.container_confirmation.show = true;
        $scope.Widgets.titlelabel.show = false;
        $scope.Widgets.NeedAnalysisWizard.show = false;

    };


    $scope.btn_proceedClick = function($event, $isolateScope) {
        // $scope.Widgets.container_recommendation.show = true;
        // $scope.Widgets.container_confirmation.show = false;
        // $scope.Widgets.titlelabel.show = false;
        // $scope.Widgets.NeedAnalysisWizard.show = false;
        $scope.Variables.goToPage_Recommendation.navigate();
    };


    $scope.btn_backClick = function($event, $isolateScope) {;

        $scope.Widgets.NeedAnalysisWizard.show = true;
        $scope.Widgets.titlelabel.show = true;
        $scope.Widgets.container_confirmation.show = false;
    };



    function nFormatter(num, digits) {
        var si = [{
                value: 1E18,
                symbol: "E"
            }, {
                value: 1E15,
                symbol: "P"
            }, {
                value: 1E12,
                symbol: "T"
            }, {
                value: 1E9,
                symbol: "B"
            }, {
                value: 1E6,
                symbol: "M"
            }, {
                value: 1E3,
                symbol: "k"
            }],
            rx = /\.0+$|(\.[0-9]*[1-9])0+$/,
            i;
        for (i = 0; i < si.length; i++) {
            if (num >= si[i].value) {
                return ((num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol);
            }
        }
        //  return num.toFixed(digits).replace(rx, "$1");
    };

    var th = ['', 'thousand', 'million', 'billion', 'trillion'];
    // uncomment this line for English Number System
    // var th = ['','thousand','million', 'milliard','billion'];

    var dg = ['zero', 'one', 'two', 'three', 'four',
        'five', 'six', 'seven', 'eight', 'nine'
    ];
    var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
        'seventeen', 'eighteen', 'nineteen'
    ];
    var tw = ['twenty', 'thirty', 'forty', 'fifty',
        'sixty', 'seventy', 'eighty', 'ninety'
    ];

    function toWords(s) {
        s = s.toString();
        s =
            s.replace(/[\, ]/g, '');
        if (s != parseFloat(s)) return 'not a number';
        var x =
            s.indexOf('.');
        if (x == -1) x = s.length;
        if (x > 15) return 'too big';
        var n =
            s.split('');
        var str = '';
        var sk = 0;
        for (var i = 0; i < x; i++) {
            if ((x - i) % 3 == 2) {
                if (n[i] == '1') {
                    str += tn[Number(n[i + 1])] + ' ';
                    i++;
                    sk = 1;
                } else if (n[i] != 0) {
                    str += tw[n[i] - 2] + ' ';
                    sk = 1;
                }
            } else if (n[i] != 0) {
                str +=
                    dg[n[i]] + ' ';
                if ((x - i) % 3 == 0) str += 'hundred ';
                sk = 1;
            }
            if ((x - i) % 3 == 1) {
                if (sk)
                    str += th[(x - i - 1) / 3] + ' ';
                sk = 0;
            }
        }
        // if (x != s.length) {
        //     var y = s.length;
        //     str +=
        //         'point ';
        //     for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
        // }
        // return (str.replace(/\s+/g, ' '));
        return (str);
    }

    $scope.tile_activetileClick = function($event, $isolateScope) {
        $scope.Widgets;
        $scope.Widgets.tile_activetile.class = "activetile";
        $scope.Widgets.tile_youngtile.class = "bg-primary";
        $scope.Widgets.tile_youngparent.class = "bg-primary";
        $scope.Widgets.tile_parentkids.class = "bg-primary";
        $scope.Widgets.tile_retirement.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();

    };


    $scope.tile_youngtileClick = function($event, $isolateScope) {
        $scope.Widgets.tile_youngtile.class = "activetile";
        $scope.Widgets.tile_activetile.class = "bg-primary";
        $scope.Widgets.tile_youngparent.class = "bg-primary";
        $scope.Widgets.tile_parentkids.class = "bg-primary";
        $scope.Widgets.tile_retirement.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();
    };


    $scope.tile_youngparentClick = function($event, $isolateScope) {
        $scope.Widgets.tile_youngparent.class = "activetile";
        $scope.Widgets.tile_activetile.class = "bg-primary";
        $scope.Widgets.tile_youngtile.class = "bg-primary";
        $scope.Widgets.tile_parentkids.class = "bg-primary";
        $scope.Widgets.tile_retirement.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();
    };


    $scope.tile_parentkidsClick = function($event, $isolateScope) {
        $scope.Widgets.tile_parentkids.class = "activetile";
        $scope.Widgets.tile_youngparent.class = "bg-primary";
        $scope.Widgets.tile_activetile.class = "bg-primary";
        $scope.Widgets.tile_youngtile.class = "bg-primary";
        $scope.Widgets.tile_retirement.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();
    };


    $scope.tile_retirementClick = function($event, $isolateScope) {
        $scope.Widgets.tile_retirement.class = "activetile";
        $scope.Widgets.tile_youngparent.class = "bg-primary";
        $scope.Widgets.tile_activetile.class = "bg-primary";
        $scope.Widgets.tile_youngtile.class = "bg-primary";
        $scope.Widgets.tile_parentkids.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();
    };


    $scope.tile_lifeprotectionClick = function($event, $isolateScope) {
        $scope.Widgets.tile_lifeprotection.class = "activetile";
        $scope.Widgets.tile_longtermwealth.class = "bg-primary";
        $scope.Widgets.tile_retirmentplan.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();
    };
    $scope.tile_longtermwealthClick = function($event, $isolateScope) {
        $scope.Widgets.tile_longtermwealth.class = "activetile";
        $scope.Widgets.tile_lifeprotection.class = "bg-primary";
        $scope.Widgets.tile_retirmentplan.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();
    };


    $scope.tile_retirmentplanClick = function($event, $isolateScope) {
        $scope.Widgets.tile_retirmentplan.class = "activetile";
        $scope.Widgets.tile_longtermwealth.class = "bg-primary";
        $scope.Widgets.tile_lifeprotection.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();
    };

    $scope.tile_aggressiveClick = function($event, $isolateScope) {
        $scope.Widgets.tile_aggressive.class = "activetile";
        $scope.Widgets.tile_conservative.class = "bg-primary";
        $scope.Widgets.tile_moderate.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();
    };




    $scope.tile_conservativeClick = function($event, $isolateScope) {
        $scope.Widgets.tile_conservative.class = "activetile";
        $scope.Widgets.tile_aggressive.class = "bg-primary";
        $scope.Widgets.tile_moderate.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();
    };


    $scope.tile_moderateClick = function($event, $isolateScope) {
        $scope.Widgets.tile_moderate.class = "activetile";
        $scope.Widgets.tile_conservative.class = "bg-primary";
        $scope.Widgets.tile_aggressive.class = "bg-primary";
        $scope.Widgets.NeedAnalysisWizard.next();
    };




    $scope.ageRangeChange = function($event, $isolateScope, newVal, oldVal) {

    };

}]);
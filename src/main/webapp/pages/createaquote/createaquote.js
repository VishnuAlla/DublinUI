Application.$controller("createaquotePageController", ["$scope", "$rootScope", "DialogService", function($scope, DialogService, $rootScope) {
    "use strict";
    var handler;
    var handlerMin;
    var payamount = 0;
    var planBought = {};
    $scope.amount = 0;
    var policydetails, agentdetails, selectedpolicydetails;
    var isNominee = false;
    //$scope.Variables.WidgetHandling.clearData();
    /* perform any action on widgets/variables within this block */
    $scope.onPageReady = function($isolateScope, $rootScope) {
        //$scope.Widgets.hidehtml.show = false;
        $scope.Widgets.policynamewithID.caption = "";
        $scope.Widgets.btn_reset.show = false;
        $('[data-step-id=4]').addClass('hideelement');
        document.title = "Create a Policy";

        if ($('[data-step-id=4]').hasClass("hideelement")) {
            document.getElementsByClassName('app-wizard-steps')[0].style.width = "610px";
        }
        var navpath = $scope.Variables.goToPage_createapolicy.getData();

        $scope.Variables.ShowWidgets.dataSet.dataValue = "false";
        $scope.pageDetails = $scope.Variables.PolicyDetails.dataSet;
        $scope.Widgets.container_confirmation.show = false;

        if ($scope.Variables.viewcomments.dataSet.length === 0 && $scope.pageDetails.navpath != "PoliciesBO") {
            $('[data-step-id=4]').addClass('hideelement');


        }



        if (sessionStorage.Breadcrumbs === undefined || sessionStorage.Breadcrumbs === "") {
            $scope.pageDetails = $scope.Variables.PolicyDetails.dataSet;
        } else {
            var breadcrumbData = angular.fromJson(sessionStorage.Breadcrumbs);


            for (var i = 0; i < breadcrumbData.length; i++) {
                var item = breadcrumbData[i];
                if (item.pageName === $scope.activePageName) {
                    $scope.pageDetails = JSON.parse(item.pageData).pageDetails;
                    $scope.Variables.PolicyDetails.dataSet = JSON.parse(item.pageData).pageDetails;
                    $scope.Variables.Editableform.dataSet = JSON.parse(item.pageData).EditDetails;
                    $scope.Variables.GetCreateQuoteData.dataSet = JSON.parse(item.pageData).QuoteDetails;
                    break;
                }
            }
        }


        if ($scope.pageDetails.navpath === "selectproduct") {
            //$scope.Variables.WidgetHandling.dataSet.Edit = false;
            //$scope.Variables.WidgetHandling.dataSet.submit = true;
        }
        if ($scope.pageDetails.navpath === "dashboard") {

            $scope.$root.refreshBC($scope.activePageName, "Edit Policy", false, {
                pageDetails: $scope.Variables.PolicyDetails.dataSet,
                EditDetails: $scope.Variables.Editableform.dataSet,
                QuoteDetails: $scope.Variables.GetCreateQuoteData.dataSet
            });

            if ($scope.Variables.GetCreateQuoteData.dataSet.Details.PolicyStatus == "Pending Application") {
                $scope.$root.refreshBC($scope.activePageName, "Edit Policy", false);
                //$scope.Variables.WidgetHandling.dataSet.Edit = true;
                //$scope.Variables.WidgetHandling.dataSet.cancel = true;
                ////$scope.Variables.WidgetHandling.dataSet.submit = true;
                //$scope.Variables.WidgetHandling.dataSet.next = true;
                //$scope.Variables.WidgetHandling.dataSet.show = false
            }
            // if ($scope.pageDetails.data.Details.PolicyStatus == "Pending Issuance")
            if ($scope.Variables.GetCreateQuoteData.dataSet.Details.PolicyStatus == "Pending Issuance") {
                $scope.$root.refreshBC($scope.activePageName, "View Policy", false);
                //$scope.Variables.WidgetHandling.dataSet.next = true;
                $scope.Widgets.container_confirmation.show = true;
                $scope.Variables.PremiumAmount.dataSet.dataValue = $scope.Variables.GetCreateQuoteData.dataSet.Details.PremiumToBePaid;
                // $scope.Widgets.btn_submit.show = false;
                // $scope.Widgets.btn_next.show = false;
                // $scope.Widgets.button18.caption = "Cancel";

                $scope.Widgets.policynamewithID.caption = $scope.Variables.GetCreateQuoteData.dataSet.Details.ClientName + " | " + $scope.Variables.GetCreateQuoteData.dataSet.Details.ApplicationId;
                $scope.Variables.ShowWidgets.dataSet.dataValue = "true";
                if ($scope.Variables.GetCreateQuoteData.dataSet.Details.ProcessStatus == "RFIPending" ||
                    $scope.Variables.GetCreateQuoteData.dataSet.Details.ProcessStatus == "RFIReceived") {

                    $scope.$root.refreshBC($scope.activePageName, "Edit Policy", false);

                    //$scope.Variables.WidgetHandling.dataSet.Edit = true;
                    //$scope.Variables.WidgetHandling.dataSet.cancel = true;
                    ////$scope.Variables.WidgetHandling.dataSet.submit = true;
                    //$scope.Variables.WidgetHandling.dataSet.next = true;
                    //$scope.Variables.WidgetHandling.dataSet.show = true

                    //                $scope.Widgets.btn_next.show = true;
                    // $scope.Widgets.button18.caption = "Cancel";
                    $('[data-step-id=4]').removeClass('hideelement');
                    document.getElementsByClassName('app-wizard-steps')[0].style.width = "690px";
                    $('.wm-app .nav > li.disabled > a').css('cursor', 'pointer');
                    $('[data-step-id=4]').on('click', function() {
                        var x = $('[data-step-id=4]')[0];
                        if (x.classList.value === "app-wizard-step ng-scope disabled") {
                            $scope.Widgets.createapolicywizard.next();
                        }
                    });
                    $('[data-step-id=3]').on('click', function() {
                        var x = $('[data-step-id=3]')[0];
                        if (x.classList.value === "app-wizard-step ng-scope disabled") {
                            $scope.Widgets.createapolicywizard.next();
                        }
                    });
                    $('[data-step-id=2]').on('click', function() {
                        var x = $('[data-step-id=2]')[0];
                        if (x.classList.value === "app-wizard-step ng-scope disabled") {
                            $scope.Widgets.createapolicywizard.next();
                        }
                    });
                    $('[data-step-id=1]').on('click', function() {
                        var x = $('[data-step-id=1]')[0];
                        if (x.classList.value === "app-wizard-step ng-scope disabled") {
                            $scope.Widgets.createapolicywizard.next();
                        }
                    });
                    $('[data-step-id=1]').on('hover', function() {
                        alert('hover clicked');
                    });
                    // $('li.disabled > a').on('hover', function() {
                    //     // $(this).css('cursor', 'pointer');
                    //     alert('welcome');
                    // });
                }
            }
            $scope.Variables.viewcomments.setInput("applicationid", $scope.Variables.GetCreateQuoteData.dataSet.Details.ApplicationId);
            $scope.Variables.viewcomments.update();

            var amountlabel = parseInt($scope.Variables.GetCreateQuoteData.dataSet.Details.PremiumToBePaid);
            $scope.Variables.PremiumAmount.dataSet.dataValue = amountlabel;
            $scope.Variables.CreateQuoteData.dataSet.applicationid = $scope.Variables.GetCreateQuoteData.dataBinding.ApplicationID;
            // var calage = $scope.Variables.GetCreateQuoteData.dataSet.Details.clientDOB;
            // var Age = moment().diff(moment(calage, 'YYYY-MM-DD'), 'years');
            $scope.Variables.CreateQuoteData.dataSet.age = moment().diff(moment($scope.Variables.GetCreateQuoteData.dataSet.Details.clientDOB, 'YYYY-MM-DD'), 'years');
            $scope.Variables.CreateQuoteData.dataSet.cover = $scope.Variables.GetCreateQuoteData.dataSet.Details.SumAssured;
            $scope.Variables.CreateQuoteData.dataSet.gender = $scope.Variables.GetCreateQuoteData.dataSet.Details.Gender;
            $scope.Variables.CreateQuoteData.dataSet.state = $scope.Variables.GetCreateQuoteData.dataSet.Details.StateId;
            $scope.Variables.CreateQuoteData.dataSet.term = $scope.Variables.GetCreateQuoteData.dataSet.Details.Term;
            $scope.Variables.CreateQuoteData.dataSet.tobacco = $scope.Variables.GetCreateQuoteData.dataSet.Details.TobaccoIntake;

            $scope.Widgets.container_confirmation.show = true;
            if ($scope.Variables.GetCreateQuoteData.dataSet.Nominees.length === 0) {
                isNominee = false;
                //  $scope.Widgets.btn_step3next.show = false;
                $scope.Variables.Editableform.dataSet.btn_step3continuecaption = "Save & Continue";
            } else {
                isNominee = true;

                // $scope.Widgets.btn_step3next.show = true;
                $scope.Variables.Editableform.dataSet.btn_step3continuecaption = "Update";
            }

        } else if ($scope.pageDetails.navpath === "PoliciesBO") {
            //$scope.Variables.WidgetHandling.dataSet.Edit = false;
            //$scope.Variables.WidgetHandling.dataSet.cancel = false;
            //$scope.Variables.WidgetHandling.dataSet.submit = false;
            //$scope.Variables.WidgetHandling.dataSet.next = true;
            //$scope.Variables.WidgetHandling.dataSet.show = true
            $scope.Widgets.container_confirmation.show = true;
            $scope.Widgets.policynamewithID.show = true
            $scope.Variables.PremiumAmount.dataSet.dataValue = $scope.Variables.GetCreateQuoteData.dataSet.Details.PremiumToBePaid;
            $scope.Widgets.policynamewithID.caption = $scope.Variables.GetCreateQuoteData.dataSet.Details.ClientName + " | " + $scope.Variables.GetCreateQuoteData.dataSet.Details.ApplicationId;
            /*   $scope.Widgets.btn_createquote.Caption = "View Policy";*/
            document.getElementsByClassName('app-wizard-steps')[0].style.width = "690px";

            $('[data-step-id=4]').removeClass('hideelement');
            $('.wm-app .nav > li.disabled > a').css('cursor', 'pointer');
            $('[data-step-id=4]').on('click', function() {
                var x = $('[data-step-id=4]')[0];
                if (x.classList.value === "app-wizard-step ng-scope disabled") {
                    $scope.Widgets.createapolicywizard.next();
                }
            });
            $('[data-step-id=3]').on('click', function() {
                var x = $('[data-step-id=3]')[0];
                if (x.classList.value === "app-wizard-step ng-scope disabled") {
                    $scope.Widgets.createapolicywizard.next();
                }
            });
            $('[data-step-id=2]').on('click', function() {
                var x = $('[data-step-id=2]')[0];
                if (x.classList.value === "app-wizard-step ng-scope disabled") {
                    $scope.Widgets.createapolicywizard.next();
                }
            });
            $('[data-step-id=1]').on('click', function() {
                var x = $('[data-step-id=1]')[0];
                if (x.classList.value === "app-wizard-step ng-scope disabled") {
                    $scope.Widgets.createapolicywizard.next();
                }
            });
            $scope.$root.refreshBC($scope.activePageName, "Review Application", false, {
                pageDetails: $scope.Variables.PolicyDetails.dataSet,
                EditDetails: $scope.Variables.Editableform.dataSet,
                QuoteDetails: $scope.Variables.GetCreateQuoteData.dataSet
            });
            $scope.Variables.viewcomments.setInput("applicationid", $scope.Variables.GetCreateQuoteData.dataSet.Details.ApplicationId);
            $scope.Variables.viewcomments.update();
            /*if ($scope.Variables.viewcomments.dataSet.length == 0) {
                $('[data-step-id=4]').addClass("hideelement");
                document.getElementsByClassName('app-wizard-steps')[0].style.width = "610px";
            }*/
        } else {
            /*$scope.Widgets.container_confirmation.show = false;*/
            $scope.Variables.GetCreateQuoteData.dataSet = {};
            if ($scope.pageDetails.navpath === "Leads") {
                $scope.$root.refreshBC($scope.activePageName, "Create a Policy", false);
                $scope.pageDetails = $scope.Variables.PolicyDetails.dataSet;

                $scope.Widgets.container_confirmation.show = true;
                $scope.Variables.Editableform.dataSet.createquote = false;
                $scope.Variables.Editableform.dataSet.customerdetails = false;
                $scope.Variables.Editableform.dataSet.proposaldetails = false;


                /*
                               //$scope.Variables.WidgetHandling.dataSet.Edit = false;
                               //$scope.Variables.WidgetHandling.dataSet.cancel = true;
                               //$scope.Variables.WidgetHandling.dataSet.submit = true;
                               //$scope.Variables.WidgetHandling.dataSet.next = false;
                               //$scope.Variables.WidgetHandling.dataSet.show = false*/

                var ldata = $scope.pageDetails.clientdata;
                $scope.Widgets.dob_date.datavalue = ldata.DateOfBirth;
                $scope.Widgets.select_Term.datavalue = ldata.Term;
                $scope.Widgets.select_cover.datavalue = ldata.SumAssured;
                $scope.Widgets.select_state_createquote.datavalue = ldata.StateId;
                $scope.Widgets.switch_tobacco_formWidget.datavalue = ldata.TobaccoIntake;
                $scope.Widgets.switch_gender_createquote_formWidget.datavalue = ldata.Gender;
                $scope.Variables.PremiumAmount.dataSet.dataValue = ldata.PremiumToBePaid;
                $scope.Widgets.container_confirmation.show = true;
                /*   $isolateScope.$parent.Widgets.txt_firstname.datavalue = ldata.FirstName;
                   $isolateScope.$parent.Widgets.txtlastname.datavalue = ldata.LastName;
                   $isolateScope.$parent.Widgets.txtemail.datavalue = ldata.Email;
                   $isolateScope.$parent.Widgets.txt_phone.datavalue = ldata.PhoneNumber;*/
                /*$scope.Widgets.txt_firstname.datavalue = ldata.FirstName;
                $scope.Widgets.txtlastname.datavalue = ldata.LastName;
                $scope.Widgets.txtemail.datavalue = ldata.Email;
                $scope.Widgets.txt_mobile.datavalue = ldata.PhoneNumber;
                $scope.Widgets.switch_gender_customerdetails.datavalue = ldata.Gender;*/
                $scope.Variables.GetAgentID.update();
                agentdetails = $scope.Variables.GetAgentID.dataSet;
                // $scope.CalculatePremium();
            } else {
                $scope.$root.refreshBC($scope.activePageName, "Create a Policy", true, {
                    pageDetails: $scope.Variables.PolicyDetails.dataSet,
                    EditDetails: $scope.Variables.Editableform.dataSet,
                    QuoteDetails: $scope.Variables.GetCreateQuoteData.dataSet
                });
                $scope.Variables.GetAgentID.update();
                agentdetails = $scope.Variables.GetAgentID.dataSet;
            }
        }
        policydetails = $scope.Variables.GetPolicyID.getData();
        $scope.Variables.GetPolicyID.setInput("name", $scope.pageDetails.policyname);
        $scope.Variables.GetPolicyID.update({}, function(data) {
            $scope.Variables.PolicyDetails.dataSet.policyid = data.UniquePolicyId;
            $scope.Variables.PolicyDetails.dataSet.MaxInsuredAge = data.MaxInsuredAge;
            $scope.Variables.PolicyDetails.dataSet.MinInsuredAge = data.MinInsuredAge;
            $scope.Variables.PolicyDetails.dataSet.MaxPolicyTerm = data.MaxPolicyTerm;
            $scope.Variables.PolicyDetails.dataSet.MinPolicyTerm = data.MinPolicyTerm;
            $scope.Variables.PolicyDetails.dataSet.MaxSumAssured = data.MaxSumAssured;
            $scope.Variables.PolicyDetails.dataSet.MinSumAssured = data.MinSumAssured;
            // policydetails = data;

        });

        // console.log("Get Policy details" + policydetails);


        //stripe code
        handler = StripeCheckout.configure({
            key: 'pk_test_qehAVnPysgz7R9kXk1tP9uwD', //use your own test publishable key
            image: 'resources/images/imagelists/logo.png', //company logo customizable
            name: 'Dublin', //name of company
            locale: 'auto', //default language english
            token: function(token, args) { //callback when checkout process is complete
                //token is the Token object created
                //token.id can be used to create a charge or can be attached to a customer
                //token.email contains the email address entered by the user
                //args is an object containing the billing and shipping addresses, if enabled(example: {
                // // Billing name and address
                // "billing_name": "Stripe",
                // "billing_address_country": "United States",
                // "billing_address_zip": "94111",
                // "billing_address_state": "CA",
                // "billing_address_line1": "1234 Main Street",
                // "billing_address_city": "San Francisco",
                // "billing_address_country_code": "US",

                // // Shipping name and address
                // "shipping_name": "Stripe",
                // "shipping_address_country": "United States",
                // "shipping_address_zip": "94111",
                // "shipping_address_state": "CA",
                // "shipping_address_line1": "1234 Main Street",
                // "shipping_address_city": "San Francisco",
                // "shipping_address_country_code": "US"
                // })

                // Get the token ID to your server-side code for use.
                var paymentData = $scope.Variables.GetCreateQuoteData.dataSet.Details;
                //payamount = payamount * 100;

                payamount = $scope.Variables.GetCreateQuoteData.dataSet.Details.PremiumToBePaid;
                payamount = payamount * 100;
                $scope.Variables.svMakePayment.setInput("StripeService$PaymentInfo", {
                    tokenId: token.id,
                    amount: parseInt(payamount)
                });
                $scope.Variables.svMakePayment.invoke();
            },
            opened: function() { //The callback to invoke when Checkout is opened
            },
            closed: function() {
                //The callback to invoke when Checkout is closed. Called after the token callback (for successful tokenizations).
            }
        });

        handlerMin = StripeCheckout.configure({
            key: 'pk_test_qehAVnPysgz7R9kXk1tP9uwD', //use your own test publishable key
            image: 'resources/images/imagelists/logo.png', //company logo customizable
            name: 'Dublin', //name of company
            locale: 'auto', //default language english
            token: function(token, args) {
                // Get the token ID to your server-side code for use.
                var paymentData = $scope.Variables.GetCreateQuoteData.dataSet.Details;
                $scope.Variables.svMakePayment.setInput("StripeService$PaymentInfo", {
                    tokenId: token.id,
                    amount: parseInt($scope.Variables.GetCreateQuoteData.dataSet.Details.PremiumToBePaid)
                });
                $scope.Variables.svMakePayment.invoke();
            }
        });

        window.addEventListener('popstate', function() {
            handler.close();
            handlerMin.close();
        });

    };

    $scope.form_createquoteSubmit = function($event, $isolateScope, $formData) {
        $scope.Widgets;
        $isolateScope;
        $formData;
        if ($scope.Widgets.container_confirmation.show === true) {
            if ($scope.Widgets.btn_continue.caption === "Update") {
                $scope.updateCreateQuote("client");
                $scope.Variables.Editableform.dataSet.createquote = true;
            } else if ($scope.Widgets.btn_continue.caption === "Continue") {
                $scope.Widgets.createapolicywizard.next();
                window.scrollTo(0, 0);
            }

            // $scope.Widgets.createapolicywizard.next();
        } else {
            return;
        }


    };
    $scope.CalculatePremium = function(sumassured, age, gender, term, tobacco) {

        var SumAssured = sumassured,
            CA = 0,
            CG = 0,
            CS = 0,
            CT = 0,
            CTO = 0;
        // var Age = moment().diff(moment(age, 'MM-DD-YYYY'), 'years');
        var Age = moment().diff(moment(age, 'YYYY-MM-DD'), 'years');

        if ($scope.pageDetails.navpath === "Leads") {
            var pdetails = $scope.Variables.PolicyDetails.dataSet.data;
            $scope.Variables.PolicyDetails.dataSet.MinInsuredAge =
                pdetails.MinInsuredAge;
            $scope.Variables.PolicyDetails.dataSet.MaxInsuredAge = pdetails.MaxInsuredAge;
            $scope.Variables.PolicyDetails.dataSet.MinSumAssured = pdetails.MinSumAssured;
            $scope.Variables.PolicyDetails.dataSet.MaxSumAssured = pdetails.MaxSumAssured;
            $scope.Variables.PolicyDetails.dataSet.MinPolicyTerm = pdetails.MinPolicyTerm;
            $scope.Variables.PolicyDetails.dataSet.MaxPolicyTerm = pdetails.MaxPolicyTerm;
        }
        if (Age >= $scope.Variables.PolicyDetails.dataSet.MinInsuredAge && Age <= $scope.Variables.PolicyDetails.dataSet.MaxInsuredAge) {
            if (Age >= 18 && Age <= 25) {
                // age_range = "18-25";
                CA = parseFloat(0.80);
            } else if (Age >= 26 && Age <= 39) {
                // age_range = "26-39";
                CA = parseFloat(1.50);
            } else if (Age >= 40 && Age <= 65) {
                // age_range = "40-65";
                CA = parseFloat(2.20);
            }
        } else {
            $scope.showToaster("IncorrectAge");

            return;

        }
        if (gender === "Male") {
            CG = parseFloat(1.10);
        } else if (gender === "Female") {
            CG = parseFloat(0.88);
        }
        // var sumassurednumber = parseFloat(SumAssured.replace(/\$|,/g, ''));
        var sumassurednumber = sumassured;
        if (sumassurednumber >= $scope.Variables.PolicyDetails.dataSet.MinSumAssured && sumassurednumber <= $scope.Variables.PolicyDetails.dataSet.MaxSumAssured) {
            if (sumassurednumber >= 50000 && sumassurednumber <= 500000) {
                CS = parseFloat(0.0040);
            } else if (sumassurednumber > 500000 && sumassurednumber < 1000000) {
                CS = parseFloat(0.0020);
            } else if (sumassurednumber >= 1000000 && sumassurednumber <= 2000000) {
                CS = parseFloat(0.0007);
            }
        } else {
            return;
        }
        // var termduration = $scope.Widgets.select_Term.datavalue.replace(' Years', '');
        var termduration = term;
        if (termduration >= $scope.Variables.PolicyDetails.dataSet.MinPolicyTerm && termduration <= $scope.Variables.PolicyDetails.dataSet.MaxPolicyTerm) {
            if (termduration >= 5 && termduration < 10) {
                CT = parseFloat(0.70);
            } else if (termduration >= 10 && termduration < 18) {
                CT = parseFloat(0.85);
            } else if (termduration >= 18 && termduration <= 25) {
                CT = parseFloat(1.20);
            }
        } else {
            return;
        }
        if (tobacco === "Yes") {
            CTO = parseFloat(1.00);
        } else if (tobacco === "No") {
            CTO = parseFloat(0.92);
        }
        // console.log(SumAssured + " " + CA + " " + " " + CG + " " + CS + " " + CT + " " + CTO);
        var AnnualPremium = 0;

        document.getElementsByName('container_confirmation')[0].classList.remove("ng-hide");
        AnnualPremium = parseFloat(sumassurednumber * CA * CG * CS * CT * CTO).toFixed(2);
        $scope.amount = Number(Math.round(Math.round(AnnualPremium * 100) / 100));


        $scope.Variables.PremiumAmount.dataSet.dataValue = $scope.amount;
        $scope.Widgets.container_confirmation.show = true;
        $scope.Widgets.amountlabel.caption = "$" + $scope.amount;
        if (!Number.isNaN($scope.amount)) {
            $scope.Widgets.container_confirmation.show = true;
        }

        // $scope.Widgets.btn_continue.disabled = false;
        // console.log(AnnualPremium);
        $scope.Variables.CreateQuoteData.dataSet.dateofbirth = age;
        $scope.Variables.CreateQuoteData.dataSet.state = "";
        $scope.Variables.CreateQuoteData.dataSet.gender = gender;
        $scope.Variables.CreateQuoteData.dataSet.tobacco = tobacco;
        $scope.Variables.CreateQuoteData.dataSet.cover = sumassurednumber;
        $scope.Variables.CreateQuoteData.dataSet.term = termduration;
        $scope.Variables.CreateQuoteData.dataSet.sumassured = $scope.amount;
        $scope.Variables.CreateQuoteData.dataSet.age = Age;


        // $scope.Variables.CreateQuoteData.setData({
        //     "dateofbirth": age,
        //     "state": "",
        //     "gender": gender,
        //     "tobacco": tobacco,
        //     "cover": sumassurednumber,
        //     "term": termduration,
        //     "sumassured": AnnualPremium,
        //     "applicationid": ""
        // });

        // console.log($scope.Variables.CreateQuoteData.dataSet);
        // $scope.Widgets.createapolicywizard.next();
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
    $scope.showToaster = function(variableName) {
        $scope.Variables[variableName].notify();
    };
    $scope.switch_gender_customerdetailsChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.Widgets.btn_reset.show = true;
        $scope.Widgets.container_confirmation.show = true;
        if ($scope.Variables.CreateQuoteData.dataSet.gender != $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue) {
            $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
        }
    };
    $scope.dob_dateChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.Widgets.btn_reset.show = true;
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
    };
    $scope.select_state_createquoteChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
        $scope.Widgets.btn_reset.show = true;
    };
    $scope.switch_gender_createquoteChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.Widgets.btn_reset.show = true;

        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
        $scope.Variables.CreateQuoteData.dataSet.gender = $scope.Widgets.switch_gender_createquote_formWidget.datavalue;
        // $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue = $scope.Widgets.switch_gender_createquote_formWidget.datavalue;
    };
    $scope.switch_tobaccoChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.Widgets.btn_reset.show = true;
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
    };
    $scope.select_TermChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.Widgets.btn_reset.show = true;
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
    };
    $scope.select_coverChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.Widgets.btn_reset.show = true;
        $scope.CalculatePremium($scope.Widgets.select_cover_formWidget.datavalue, $scope.Widgets.dob_date_formWidget.datavalue, $scope.Widgets.switch_gender_createquote_formWidget.datavalue, $scope.Widgets.select_Term_formWidget.datavalue, $scope.Widgets.switch_tobacco_formWidget.datavalue);
    };
    $scope.btn_nextClick = function($event, $isolateScope) {
        $scope.Widgets.createapolicywizard.next();
        window.scrollTo(0, 0);
    };
    $scope.form_customerdetailsSubmit = function($event, $isolateScope, $formData) {
        // var exist;
        if ($scope.Widgets.btn_step2continue.caption === "Update") {

            $scope.updateCreateQuote("client");
        } else if ($scope.Widgets.btn_step2continue.caption === "Save & Continue") {

            $scope.Variables.CheckUserExist.setInput("EmailID", $formData.txtemail);
            $scope.Variables.CheckUserExist.update({}, function(data) {
                $scope.Variables.ExistUser.dataSet.dataValue = data;
                //   exist = $scope.Variables.ExistUser.dataSet.dataValue;
                if ($scope.Variables.ExistUser.dataSet.dataValue === true) {
                    $scope.CreateApplicationforExisit();
                    return;
                } else {
                    $scope.InsertCustomerDetails();
                }
            });

        }

    };
    $scope.CreateApplicationforExisit = function() {

        var personalRequestBody = {
            "client": {
                "emailId": $scope.Widgets.txtemail_formWidget.datavalue,
                "dateOfBirth": $scope.Variables.CreateQuoteData.dataSet.dateofbirth,
                "clientName": $scope.Widgets.txt_firstname_formWidget.datavalue + " " + $scope.Widgets.txtlastname_formWidget.datavalue,
                "maritalStatus": $scope.Widgets.select_maritalstatus_formWidget.datavalue,
                "noOfChildren": parseInt($scope.Widgets.select_childrens_formWidget.datavalue),
                "nationality": "American",
                "gender": $scope.Variables.CreateQuoteData.dataSet.gender === $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue ? $scope.Variables.CreateQuoteData.dataSet.gender : $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue,
                "mobileNumber": $scope.Widgets.txt_mobile_formWidget.datavalue,
                "phoneNumber": $scope.Widgets.txt_phone_formWidget.datavalue,
                "qualification": $scope.Widgets.select_qualification_formWidget.datavalue,
                "company": $scope.Widgets.txt_company_formWidget.datavalue,
                "occupationalHazards": $scope.Widgets.select_occupationhazards_formWidget.datavalue,
                "annualIncome": parseFloat($scope.Widgets.txt_assuredincome_formWidget.datavalue),
                "occupation": $scope.Widgets.select_occupation_formWidget.datavalue
            },
            "Address": {
                "addressType": $scope.Widgets.select_addresstype_formWidget.datavalue,
                "addressLine1": $scope.Widgets.txtaddress1_formWidget.datavalue,
                "addressLine2": $scope.Widgets.txtaddress2_formWidget.datavalue,
                "zip": $scope.Widgets.txt_zip_formWidget.datavalue,
                "stateId": $scope.Widgets.select_state_formWidget.datavalue,
                "country": $scope.Widgets.select_country_formWidget.datavalue
            },
            "clientDetails": {
                "agentId": $scope.Variables.GetAgentID.dataSet.AgentId,
                "uniquePolicyId": $scope.pageDetails.policyid,
                "sumAssured": $scope.Variables.CreateQuoteData.dataSet.cover,
                "premiumToBePaid": $scope.Variables.CreateQuoteData.dataSet.sumassured,
                "premiumType": "yearly",
                "PolicyStatusId": "a9e1bb2b-cb45-11e6-8c86-0242ac11090e",
                "term": parseInt($scope.Variables.CreateQuoteData.dataSet.term),
                "updatedBy": $scope.Variables.loggedInUser.dataSet.id
            }
        }

        $scope.Variables.CreateApplication.setInput("RequestBody", personalRequestBody);
        $scope.Variables.CreateApplication.update({}, function(data) {
            console.log(data);

        });
    };

    $scope.InsertCustomerDetails = function() {

        //    //console.log($scope.Variables.loggedInUser.dataSet.id);
        if ($scope.Variables.CreateQuoteData.dataSet.applicationid == null || $scope.Variables.CreateQuoteData.dataSet.applicationid == '') {
            var personalRequestBody = {
                // "userName": $scope.Widgets.txt_firstname_formWidget.datavalue + " " + $scope.Widgets.txtlastname_formWidget.datavalue,
                "userName": $scope.Widgets.txtemail_formWidget.datavalue,
                "password": "default",
                "client": {
                    "emailId": $scope.Widgets.txtemail_formWidget.datavalue,
                    "dateOfBirth": $scope.Variables.CreateQuoteData.dataSet.dateofbirth,
                    "clientName": $scope.Widgets.txt_firstname_formWidget.datavalue + " " + $scope.Widgets.txtlastname_formWidget.datavalue,
                    "maritalStatus": $scope.Widgets.select_maritalstatus_formWidget.datavalue,
                    "noOfChildren": parseInt($scope.Widgets.select_childrens_formWidget.datavalue),
                    "nationality": "American",
                    "gender": $scope.Variables.CreateQuoteData.dataSet.gender === $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue ? $scope.Variables.CreateQuoteData.dataSet.gender : $scope.Widgets.switch_gender_customerdetails_formWidget.datavalue,
                    "mobileNumber": $scope.Widgets.txt_mobile_formWidget.datavalue,
                    "phoneNumber": $scope.Widgets.txt_phone_formWidget.datavalue,
                    "qualification": $scope.Widgets.select_qualification_formWidget.datavalue,
                    "company": $scope.Widgets.txt_company_formWidget.datavalue,
                    "occupationalHazards": $scope.Widgets.select_occupationhazards_formWidget.datavalue,
                    "annualIncome": parseInt($scope.Widgets.txt_assuredincome_formWidget.datavalue),
                    "occupation": $scope.Widgets.select_occupation_formWidget.datavalue
                },
                "address": {
                    "addressType": $scope.Widgets.select_addresstype_formWidget.datavalue,
                    "addressLine1": $scope.Widgets.txtaddress1_formWidget.datavalue,
                    "addressLine2": $scope.Widgets.txtaddress2_formWidget.datavalue,
                    "zip": $scope.Widgets.txt_zip_formWidget.datavalue,
                    "stateId": $scope.Widgets.select_state_formWidget.datavalue,
                    "country": $scope.Widgets.select_country_formWidget.datavalue
                },
                // personalRequestBody.clientDetails.agentId=$scope.Variables.GetAgentID.dataSet.AgentId;
                "clientDetails": {
                    "agentId": $scope.Variables.GetAgentID.dataSet.AgentId,
                    "uniquePolicyId": $scope.pageDetails.policyid,
                    "sumAssured": parseInt($scope.Variables.CreateQuoteData.dataSet.cover),
                    "policyId": "",
                    "premiumToBePaid": $scope.Variables.CreateQuoteData.dataSet.sumassured,
                    "premiumType": "yearly",
                    "tobaccoIntake": $scope.Variables.CreateQuoteData.dataSet.tobacco,
                    "term": parseInt($scope.Variables.CreateQuoteData.dataSet.term),
                    "updatedBy": $scope.Variables.loggedInUser.dataSet.id
                }

            };
            /*       $scope.pageDetails.data.RequestBodyuname = personalRequestBody.userName;
                   $scope.pageDetails.data.RequestBodyPassword = personalRequestBody.password;*/
            if ($scope.pageDetails.navpath === "Leads") {
                $scope.Variables.LeadQuoteData.dataSet.data = $scope.pageDetails;
                var x = {
                    "agentId": $scope.Variables.GetAgentID.dataSet.AgentId,
                    "uniquePolicyId": $scope.pageDetails.policyid,
                    "sumAssured": parseInt($scope.Variables.LeadQuoteData.dataSet.data.clientdata.SumAssured),
                    "policyId": "",
                    "premiumToBePaid": parseInt($scope.Variables.LeadQuoteData.dataSet.data.clientdata.PremiumToBePaid),
                    "premiumType": "yearly",
                    "tobaccoIntake": $scope.Variables.LeadQuoteData.dataSet.data.clientdata.TobaccoIntake,
                    "term": parseInt($scope.Variables.LeadQuoteData.dataSet.data.clientdata.Term),
                    "updatedBy": $scope.Variables.loggedInUser.dataSet.id
                };
                personalRequestBody.client.dateOfBirth = $scope.pageDetails.clientdata.DateOfBirth
                personalRequestBody.clientDetails = x;
            }


            $scope.Variables.InsertCreateQuotePersonal.setInput("RequestBody", personalRequestBody);
            $scope.Variables.InsertCreateQuotePersonal.update({}, function(data) {

            });
        } else {
            $scope.updateCreateQuote("client");
        }
    };

    $scope.InsertCreateQuotePersonalonSuccess = function(variable, data) {
        //  $scope.showToaster("ApplicationIDCreated");
        if ($scope.pageDetails.navpath === "Leads") {
            var ldata = $scope.pageDetails.clientdata;
            $scope.Variables.UpdateLeads.setInput("LeadID", ldata.LeadId);
            $scope.Variables.UpdateLeads.setInput("Status", false);

            $scope.Variables.UpdateLeads.update();
        }
        $scope.showToaster("ApplicationIDCreated");
        $scope.Variables.CreateQuoteData.dataSet.applicationid = data;
        window.scrollTo(0, 0);
        var clientname = $scope.Widgets.txt_firstname_formWidget.datavalue + " " + $scope.Widgets.txtlastname_formWidget.datavalue;
        $scope.Widgets.policynamewithID.caption = clientname + " | " + data;
        $scope.Widgets.policynamewithID.show = true;
        //  $scope.Variables.CreateQuoteData.dataSet.applicationid = data;
        $scope.Widgets.createapolicywizard.next();
        $scope.Widgets.btn_step2continue.caption = "Update";
        window.scrollTo(0, 0);
    };


    $scope.InsertCreateQuotePersonalonError = function(variable, data) {
        $scope.showToaster("ApplicationIDNotCreated");

        if ($scope.pageDetails.navpath === "Leads") {

            var ldata = $scope.pageDetails.clientdata;
            $scope.Variables.UpdateLeads.setInput("LeadID", ldata.LeadId);
            $scope.Variables.UpdateLeads.setInput("Status", true);
            $scope.Variables.UpdateLeads.update();
        }
    };


    $scope.btn_editClick = function($event, $isolateScope) {
        $scope.Widgets;
        /*        if ($scope.pageDetails.navpath != "selectproduct" || $scope.Variables.GetCreateQuoteData.dataSet.Details.PolicyStatus === 'Pending Application') {
                    //$scope.Variables.WidgetHandling.dataSet.next = true;
                }
        */
        this.Widgets.btn_edit.show = false;
        this.Widgets.btn_next.show = false;
        $scope.Variables.Editableform.dataSet.createquote = false;
        $scope.Variables.Editableform.dataSet.customerdetails = true;
        $scope.Variables.Editableform.dataSet.proposaldetails = true;
    };
    $scope.updateCreateQuote = function(updatetype) {

        var appid = "";
        // var appid = $scope.Variables.GetCreateQuoteData.dataBinding.ApplicationID;
        var clientdetails = $scope.Variables.GetCreateQuoteData.dataSet.Details;
        if (clientdetails == undefined || clientdetails == null) {
            $scope.Variables.GetCreateQuoteData.setInput("ApplicationID", $scope.Variables.CreateQuoteData.dataSet.applicationid);
            $scope.Variables.GetCreateQuoteData.update();
            $scope.Variables.GetCreateQuoteData.getData();
            clientdetails = $scope.Variables.GetCreateQuoteData.dataSet.Details;
        }
        appid = clientdetails.ApplicationId;
        var clientRequestBody = {};
        if (updatetype === "client") {
            clientRequestBody = {
                "emailId": clientdetails.EmailId,
                "dateOfBirth": clientdetails.clientDOB,
                "clientName": clientdetails.ClientName,
                "maritalStatus": clientdetails.MaritalStatus,
                "noOfChildren": parseInt(clientdetails.NoOfChildren),
                "nationality": clientdetails.Nationality,
                "gender": $scope.Widgets.switch_gender_createquote_formWidget.datavalue,
                "mobileNumber": clientdetails.MobileNumber,
                "phoneNumber": clientdetails.PhoneNumber,
                "qualification": clientdetails.Qualification,
                "company": clientdetails.Company,
                "occupationalHazards": clientdetails.OccupationalHazards,
                "annualIncome": parseInt(clientdetails.AnnualIncome),
                "occupation": clientdetails.Occupation,
                "sumAssured": parseInt($scope.Widgets.select_cover.datavalue),
                "premiumToBePaid": parseInt($scope.Widgets.amountlabel.caption.replace(/[^0-9\.]+/g, "")), //parseInt($scope.Widgets.amountlabel.caption.replace("$", '')),
                "tobaccoIntake": $scope.Widgets.switch_tobacco_formWidget.datavalue,
                "term": parseInt($scope.Widgets.select_Term.datavalue),
                "addressType": clientdetails.AddressType,
                "addressLine1": clientdetails.AddressLine1,
                "addressLine2": clientdetails.AddressLine2,
                "zip": clientdetails.Zip,
                "stateId": $scope.Widgets.select_state_createquote.datavalue,
                "country": clientdetails.Country,
                "updatedBy": $scope.Variables.loggedInUser.dataSet.id
            };
        } else if (updatetype === "nominees") {
            clientRequestBody = {
                "firstName": $scope.Widgets.txt_nomineeFirstname_formWidget.datavalue,
                "lastName": $scope.Widgets.txt_nomineelastname_formWidget.datavalue,
                "relationship": $scope.Widgets.select_nomineerelation_formWidget.datavalue,
                "entilementPercentage": $scope.Widgets.txt_EntitlementPercentage_formWidget.datavalue,
                "dateOfBirth": $scope.Widgets.dob_nominee_formWidget.datavalue,
                "mobileNumber": $scope.Widgets.txt_nomineemobile_formWidget.datavalue,
                "phoneNumber": $scope.Widgets.txt_nomineephone_formWidget.datavalue,
                "addressLine1": $scope.Widgets.txt_nomineeaddress1_formWidget.datavalue,
                "addressLine2": $scope.Widgets.txt_nomineeaddress2_formWidget.datavalue,
                "zip": $scope.Widgets.txt_nomineezip_formWidget.datavalue,
                "stateId": $scope.Widgets.select_nomineestate_formWidget.datavalue,
                "country": $scope.Widgets.select_nomineecountry_formWidget.datavalue,
                "height": parseInt($scope.Widgets.txt_height_formWidget.datavalue),
                "weight": parseInt($scope.Widgets.txt_weight_formWidget.datavalue),
                "changeInWeight": $scope.Widgets.select_weightchange_formWidget.datavalue
            };
        }
        //console.log(clientRequestBody);

        $scope.Variables.UpdateCreateQuoteDetails.setInput("updatetype", updatetype);
        $scope.Variables.UpdateCreateQuoteDetails.setInput("applicationid", appid);
        $scope.Variables.UpdateCreateQuoteDetails.setInput("RequestBody", clientRequestBody);
        $scope.Variables.UpdateCreateQuoteDetails.update({}, function(data) {
            $scope.Variables.Editableform.dataSet.createquote = true;
            $scope.Variables.Editableform.dataSet.customerdetails = true;
            $scope.Variables.Editableform.dataSet.proposaldetails = true;
            $scope.Variables.GetCreateQuoteData.setInput("ApplicationID", $scope.Variables.CreateQuoteData.dataSet.applicationid);
            $scope.Variables.GetCreateQuoteData.update();

        });
        $scope.Widgets.btn_next.show = true;
        $scope.Widgets.btn_edit.show = true;
        $scope.Widgets.btn_reset.show = false;
        $scope.Widgets.btn_step2edit.show = true;
        $scope.Widgets.btn_step2next.show = true;
        $scope.Widgets.btn_step3edit.show = true;
        $scope.Widgets.btn_step3next.show = true;
        $scope.Widgets.sameaddress.show = false;
        /*  $scope.showToaster("ApplicationupdatedSuccess");
          $scope.Widgets.createapolicywizard.next();
        */
        window.scrollTo(0, 0);

    };

    $scope.btn_step2editClick = function($event, $isolateScope) {

        $scope.Widgets.btn_step2edit.show = false;
        $scope.Widgets.btn_step2next.show = false;
        $scope.Variables.Editableform.dataSet.customerdetails = false;
    };

    $scope.btn_step3editClick = function($event, $isolateScope) {

        $scope.Variables.Editableform.dataSet.proposaldetails = false;
        $scope.Widgets.sameaddress.show = true;
        $scope.Widgets.btn_step3edit.show = false;
        $scope.Widgets.btn_step3next.show = false
            /*   ////$scope.Variables.WidgetHandling.dataSet.next = false;
               //$scope.Variables.WidgetHandling.dataSet.Edit = false;*/
    };
    $scope.btn_cancelClick = function($event, $isolateScope) {

        if ($scope.pageDetails.navpath === "PoliciesBO") {
            $scope.Variables.goToPage_PoliciesForBO.navigate();
        } else {
            $scope.Variables.goToPage_Dashboard.navigate();
        }
    };


    $scope.btn_step2cancelClick = function($event, $isolateScope) {
        $scope.Widgets.createapolicywizard.prev();
    };


    $scope.UpdateCreateQuoteDetailsonError = function(variable, data) {

        $scope.showToaster("ApplicationIDNotCreated");
        // $scope.Widgets.createapolicywizard.next()
    };


    $scope.UpdateCreateQuoteDetailsonSuccess = function(variable, data) {
        //    $scope.showToaster("ApplicationupdatedSuccess");
        $scope.Widgets.createapolicywizard.next();
        // window.scrollTo(0, 0);
    };


    $scope.InsertNomineeDetails = function() {


        var appid = $scope.Variables.CreateQuoteData.dataSet.applicationid;
        var NomineeRequestBody = {
            // "applicationId": $scope.Variables.CreateQuoteData.dataSet.applicationid,
            "applicationId": appid,
            "relationship": $scope.Widgets.select_nomineerelation_formWidget.datavalue,
            "stateId": $scope.Widgets.select_nomineestate_formWidget.datavalue,
            "entilementPercentage": $scope.Widgets.txt_EntitlementPercentage_formWidget.datavalue,
            "phoneNumber": $scope.Widgets.txt_nomineephone_formWidget.datavalue,
            "firstName": $scope.Widgets.txt_nomineeFirstname_formWidget.datavalue,
            "mobileNumber": $scope.Widgets.txt_nomineemobile_formWidget.datavalue,
            "zip": $scope.Widgets.txt_nomineezip_formWidget.datavalue,
            "lastName": $scope.Widgets.txt_nomineelastname_formWidget.datavalue,
            "dateOfBirth": $scope.Widgets.dob_nominee_formWidget.datavalue,
            "country": $scope.Widgets.select_nomineecountry_formWidget.datavalue,
            "addressLine1": $scope.Widgets.txt_nomineeaddress1_formWidget.datavalue,
            "addressLine2": $scope.Widgets.txt_nomineeaddress2_formWidget.datavalue,
            "client": {
                "weight": $scope.Widgets.txt_weight_formWidget.datavalue,
                "height": $scope.Widgets.txt_height_formWidget.datavalue,
                "changeInWeight": $scope.Widgets.select_weightchange_formWidget.datavalue
            }
        };


        $scope.Variables.InsertCreateQuoteNominee.setInput("RequestBody", NomineeRequestBody);
        $scope.Variables.InsertCreateQuoteNominee.update({}, function(data) {
            // $scope.Widgets;
            // console.log(data);

        });

        // console.log(personalRequestBody);

    };

    $scope.form_proposaldetailsSubmit = function($event, $isolateScope, $formData) {

        if ($scope.Widgets.btn_step3continue.caption === "Update") {
            $scope.updateCreateQuote("nominees");
        } else if ($scope.Widgets.btn_step3continue.caption === "Save & Continue") {
            $scope.InsertNomineeDetails();
        }
    };


    $scope.InsertCreateQuoteNomineeonSuccess = function(variable, data) {

        $scope.showToaster("Applicationupdated");
        // $scope.Variables.GetCreateQuoteData.setInput("ApplicationID", $scope.Variables.CreateQuoteData.dataSet.applicationid);
        $scope.Variables.GetCreateQuoteData.setInput("ApplicationID", $scope.Variables.CreateQuoteData.dataSet.applicationid);
        $scope.Variables.GetCreateQuoteData.update({}, function(data) {
            // console.log(data);
            $scope.Widgets.createapolicywizard.next();
            window.scrollTo(0, 0);
            $scope.Widgets.btn_step3continue.caption = "Update";
        });
    };


    $scope.InsertCreateQuoteNomineeonError = function(variable, data) {
        $scope.showToaster("ApplicationIDNotCreated");
    };


    $scope.sameaddressChange = function($event, $isolateScope, newVal, oldVal) {
        if (newVal === true) {
            $scope.Widgets.txt_nomineeaddress1_formWidget.datavalue = $scope.Widgets.txtaddress1_formWidget.datavalue;
            $scope.Widgets.txt_nomineeaddress2_formWidget.datavalue = $scope.Widgets.txtaddress2_formWidget.datavalue;
            $scope.Widgets.txt_nomineezip_formWidget.datavalue = $scope.Widgets.txt_zip_formWidget.datavalue;
            $scope.Widgets.select_nomineestate_formWidget.datavalue = $scope.Widgets.select_state_formWidget.datavalue;
            $scope.Widgets.select_nomineecountry_formWidget.datavalue = $scope.Widgets.select_country_formWidget.datavalue;
            $scope.Widgets.txt_nomineemobile_formWidget.datavalue = $scope.Widgets.txt_mobile_formWidget.datavalue;
            $scope.Widgets.txt_nomineephone_formWidget.datavalue = $scope.Widgets.txt_phone_formWidget.datavalue;
        } else {
            $scope.Widgets.txt_nomineeaddress1_formWidget.datavalue = "";
            $scope.Widgets.txt_nomineeaddress2_formWidget.datavalue = "";
            $scope.Widgets.txt_nomineezip_formWidget.datavalue = "";
            $scope.Widgets.select_nomineestate_formWidget.datavalue = "";
            $scope.Widgets.select_nomineecountry_formWidget.datavalue = "";
            $scope.Widgets.txt_nomineemobile_formWidget.datavalue = "";
            $scope.Widgets.txt_nomineephone_formWidget.datavalue = "";
        }
    };


    $scope.btn_submitClick = function($event, $isolateScope) {

        $scope.Widgets;
        $scope.Variables.CreateQuoteSubmitJBPM;
        payamount = $scope.Variables.GetCreateQuoteData.dataSet.Details.PremiumToBePaid;
        payamount = payamount * 100;
        var log = $scope.Variables.GetCreateQuoteData.dataSet.Details;
        planBought = {
            plan: $scope.Variables.GetCreateQuoteData.dataSet.Details.policyName,
            amount: parseInt(payamount)
        };

        // Open Checkout with further options:
        handler.open({
            //recommended options
            description: 'Digital Design for Mac', //description for the company or website
            amount: parseInt(payamount), //amount in cents
            //amount: 5555.00,
            zipCode: false, //validate zipcode or not(default false; recommended to set as true)
            billingAddress: false, //specifies whether to collect billing address(default false)
            //optional
            currency: 'USD', //3-letter ISO code for currency of amount(default is USD)
            panelLabel: 'Pay', //label for payment button; if {{amount}} 'data-amount' will be appended to the end of label
            shippingAddress: false, //specifies whether to collect shipping address(default false)
            email: $scope.Variables.GetCreateQuoteData.dataSet.Details.EmailId, //to be prefilled in checkout; if not specified need to fill in checkout form
            allowRememberMe: true, //specifies whether to show "Remember Me" option(default true)
            bitcoin: true, //specifies whether to accept Bitcoin(default false)
            alipay: true, //specifies whether to accept Alipay(default false)
            alipayReusable: true //Specify if you need reusable access to the customer's Alipay account(default false)
        });
        $event.preventDefault();
        openCheckout();
        /*
        if ($scope.Variables.CreateQuoteData.dataSet.age === '' || $scope.Variables.CreateQuoteData.dataSet.age === null || $scope.Variables.CreateQuoteData.dataSet.age === undefined) {
            var Age = moment().diff(moment($scope.Variables.GetCreateQuoteData.dataSet.Details.clientDOB, 'YYYY-MM-DD'), 'years');
            $scope.Variables.CreateQuoteSubmitJBPM.setInput("age", Age);
        } else {
            $scope.Variables.CreateQuoteSubmitJBPM.setInput("age", $scope.Variables.CreateQuoteData.dataSet.age);
        }
      
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("applicationId", $scope.Variables.CreateQuoteData.dataSet.applicationid);
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("custid", "null");
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("custname", "null");
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("loggedInId", $scope.Variables.loggedInUser.dataSet.id);
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("prevHistory", $scope.Widgets.select_weightchange_formWidget.datavalue);
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("productType", "null");
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("status", "Pending Issuance");
        if ($scope.Variables.CreateQuoteData.dataSet.cover === null || $scope.Variables.CreateQuoteData.dataSet.cover === undefined || $scope.Variables.CreateQuoteData.dataSet.cover === '') {
            $scope.Variables.CreateQuoteSubmitJBPM.setInput("sum", $scope.Variables.GetCreateQuoteData.dataSet.Details.SumAssured);
        } else {
            $scope.Variables.CreateQuoteSubmitJBPM.setInput("sum", $scope.Variables.CreateQuoteData.dataSet.cover);
        }
        $scope.Variables.CreateQuoteSubmitJBPM.update();

        $scope.finaldata = {
            "ApplicationID": $scope.Widgets.FinalGrid.dataset.ApplicationId,
            "PremiumAmount": $scope.Widgets.lbl_PremiumAmount.caption
        };*/
        // var FinalSubmit = {
        //     "status": "Pending Issuance",
        //     "applicationId": $scope.finaldata.ApplicationID
        // };
        // $scope.Variables.CreateQuoteFinalUpdate.setInput("applicationid", $scope.finaldata.ApplicationID);
        // $scope.Variables.CreateQuoteFinalUpdate.setInput("status", "Pending Issuance");
        // $scope.Variables.CreateQuoteFinalUpdate.update();
    };
    $scope.button18Click = function($event, $isolateScope) {
        $scope.Widgets;
        if ($scope.Variables.loggedInUser.dataSet.roles[0] === "Agent" && $scope.Variables.viewcomments.dataSet.length === 0) {
            $scope.Variables.goToPage_Dashboard.navigate();
        } else {
            $scope.Widgets.createapolicywizard.prev();
        }


    };
    $scope.CreateQuoteSubmitJBPMonSuccess = function(variable, data) {
        $scope.Widgets;
        // DialogService.showDialog("ConfirmationDialog");

        $scope.Variables.JBPMSucess.dataSet.data = data;

    };


    $scope.btn_PostCommentsClick = function($event, $isolateScope) {

        if ($scope.Widgets.txt_comments.datavalue === '' || $scope.Widgets.txt_comments.datavalue === null || $scope.Widgets.txt_comments.datavalue == undefined) {
            $scope.showToaster("NoComments");
            return;
        }
        debugger
        $scope.Variables.PostComments.setInput("applicationId", $scope.Variables.GetCreateQuoteData.dataSet.Details.ApplicationId);
        $scope.Variables.PostComments.setInput("processInstanceId", $scope.Variables.GetCreateQuoteData.dataSet.Details.ProcessInstanceId);
        $scope.Variables.PostComments.setInput("status", $scope.Variables.loggedInUser.dataSet.roles[0] === "BackOfficeOperator" ? $scope.Widgets.switch_comments.datavalue : "null");
        $scope.Variables.PostComments.setInput("UserId", $scope.Variables.loggedInUser.dataSet.id);
        $scope.Variables.PostComments.setInput("comments", $scope.Widgets.txt_comments.datavalue);
        $scope.Variables.PostComments.update({}, function(data) {
            $scope.Variables.viewcomments.update();
            if ($scope.Variables.loggedInUser.dataSet.roles[0] === "BackOfficeOperator")
                $scope.Variables.goToPage_PoliciesForBO.navigate();
            else if ($scope.Variables.loggedInUser.dataSet.roles[0] === "Agent")
                $scope.Variables.goToPage_Dashboard.navigate();
        });
    };






    $scope.domActivity = function($event, $isolateScope) {
        var tempElement = document.createElement('p');
        tempElement.id = "tempElement";
        //  tempElement.setAttribute("type", "hidden");
        var body = document.body;
        body.appendChild(tempElement);
        document.getElementById("tempElement").innerHTML = "<p id='cname'> Hi </p><br><br> Please find the username and password to access Dublin Portal.<br><br><div class='emailtemp'><p style='display: inline-block; font-size: 12.0pt;font-weight: bold'>Username:</p><p id='uname' style='display: inline-block'></p></div><div class='emailtemp'><p style='display: inline-block;font-size: 12.0pt;font-weight: bold'>Password:</p><p id='pwdname' style='display: inline-block'></p></div><p>To login to the application, click <a href='http://e1d52cdd96e3.cloud.wavemakeronline.com/dev_ui_dublinpublic/#/MyInsurance' target=''>here</a></p><br><br><br><p>Best Regards</p><p>Dublin, Inc.</p><p><img src='https://wavemaker.pramati.com/run-62kfn0cn7x/white_theme_dublin/resources/images/logos/logo_cropped.png'><br></p>";
    }

    $scope.btn_resetClick = function($event, $isolateScope) {

        document.getElementsByName('container_confirmation')[0].classList.add("ng-hide");
        $scope.Widgets.btn_reset.show = false;

    };
    $scope.txtemailChange = function($event, $isolateScope, newVal, oldVal) {

        $scope.Variables.CheckUserExist.setInput("EmailID", newVal);
        $scope.Variables.CheckUserExist.update({}, function(data) {
            $scope.Variables.ExistUser.dataSet.dataValue = data;
        });
    };

    $scope.CreateApplicationonSuccess = function(variable, data) {
        if ($scope.pageDetails.navpath === "Leads") {
            var ldata = $scope.pageDetails.clientdata;
            $scope.Variables.UpdateLeads.setInput("LeadID", ldata.LeadId);
            $scope.Variables.UpdateLeads.setInput("Status", false);

            $scope.Variables.UpdateLeads.update();
        }
        $scope.showToaster("ApplicationIDCreated");
        $scope.Variables.CreateQuoteData.dataSet.applicationid = data;
        window.scrollTo(0, 0);
        var clientname = $scope.Widgets.txt_firstname_formWidget.datavalue + " " + $scope.Widgets.txtlastname_formWidget.datavalue;
        $scope.Widgets.policynamewithID.caption = clientname + " | " + data;
        $scope.Widgets.policynamewithID.show = true;
        //  $scope.Variables.CreateQuoteData.dataSet.applicationid = data;
        $scope.Widgets.createapolicywizard.next();
        window.scrollTo(0, 0);
        /*    
            //  $scope.showToaster("ApplicationIDCreated");
            if ($scope.pageDetails.navpath === "Leads") {
                
                var ldata = $scope.pageDetails.clientdata;
                $scope.Variables.UpdateLeads.setInput("LeadID", ldata.LeadId);
                $scope.Variables.UpdateLeads.setInput("Status", false);

                $scope.Variables.UpdateLeads.update();
            }
            $scope.showToaster("ApplicationIDCreated");
            $scope.Variables.CreateQuoteData.dataSet.applicationid = data;
            //  $scope.Widgets.createapolicywizard.next();
            window.scrollTo(0, 0);
            var clientname = $scope.Widgets.txt_firstname_formWidget.datavalue + " " + $scope.Widgets.txtlastname_formWidget.datavalue;
            $scope.Widgets.policynamewithID.caption = clientname + " | " + data;
            $scope.Widgets.policynamewithID.show = true;
            //  $scope.Variables.CreateQuoteData.dataSet.applicationid = data;
            $scope.Widgets.createapolicywizard.next();
            window.scrollTo(0, 0);*/
    };


    $scope.txtemailKeypress = function($event, $isolateScope) {
        $scope.txtemailChange();
    };
    $scope.txtemailKeyup = function($event, $isolateScope) {
        $scope.txtemailChange();
    };

    $scope.CreateApplicationonError = function(variable, data) {
        $scope.CreateApplicationforExisit();
    };


    $scope.PostCommentsonSuccess = function() {

        var emailchk = $scope.Variables.GetCreateQuoteData.dataSet.Details.EmailId;
        $scope.Variables.CheckUserExist.setInput("EmailID", emailchk);
        $scope.Variables.CheckUserExist.update({}, function(data) {
            $scope.Variables.ExistUser.dataSet.dataValue = data;
        });
        var exist = $scope.Variables.ExistUser.dataSet.dataValue;
        if (exist == false || exist != '') {
            if ($scope.Variables.PostComments.dataBinding.status === "Approved" && $scope.Variables.loggedInUser.dataSet.roles[0] === "BackOfficeOperator") {
                var username = emailchk;
                var password = "default";
                var ClientNamename = $scope.Variables.GetCreateQuoteData.dataSet.Details.ClientName;
                var Subject = "Your Dublin Account Is Now Active";
                var email = $scope.Variables.GetCreateQuoteData.dataSet.Details.EmailId;

                $scope.domActivity();

                var parent = "";
                var textNode = "";
                parent = document.getElementById('uname');
                textNode = document.createTextNode(" " + emailchk);
                parent.appendChild(textNode);

                parent = document.getElementById('pwdname');
                textNode = document.createTextNode(" " + password);
                parent.appendChild(textNode);

                parent = document.getElementById('cname');
                textNode = document.createTextNode(ClientNamename + ",");
                parent.appendChild(textNode);
                var EmailBody = document.getElementById("tempElement").innerHTML;
                $scope.Variables.EmailNotify.setInput("to", email);
                $scope.Variables.EmailNotify.setInput("ebody", document.getElementById("tempElement").innerHTML);
                document.getElementById("tempElement").innerHTML = "";
                $scope.Variables.EmailNotify.setInput("eSubject", Subject);
                $scope.Variables.EmailNotify.update({}, function(data) {
                    return;
                });
            }
        }
    };



    $scope.button25Click = function($event, $isolateScope) {
        payamount = $scope.Variables.GetCreateQuoteData.dataSet.Details.PremiumToBePaid;
        ////payamount = payamount * 100;

        var log = $scope.Variables.GetCreateQuoteData.dataSet.Details;
        console.log(log);

        planBought = {
            plan: $scope.Variables.GetCreateQuoteData.dataSet.Details.policyName,
            amount: payamount
        };
        openCheckout();


    };


    function openCheckout() {
        // Open Checkout with minimal options:

        handler.open({
            description: '', //description for the company or website
            amount: parseInt(payamount) //amount in cents
        });
    }


    $scope.svMakePaymentonSuccess = function(variable, data) {

        console.log(data);

        $scope.showToaster("PaymentSucess");
        if ($scope.Variables.CreateQuoteData.dataSet.applicationid === undefined || $scope.Variables.CreateQuoteData.dataSet.applicationid === '' || $scope.Variables.CreateQuoteData.dataSet.applicationid === null) {
            $scope.Variables.CreateQuoteData.dataSet.applicationid = $scope.pageDetails.policyid
        }
        $scope.Variables.PaymentGateway.setInput("paymentMode", "NetBanking");
        $scope.Variables.PaymentGateway.setInput("agentID", $scope.Variables.loggedInUser.dataSet.id);
        $scope.Variables.PaymentGateway.setInput("status", "Paid");
        $scope.Variables.PaymentGateway.setInput("applicationID", $scope.Variables.CreateQuoteData.dataSet.applicationid);
        $scope.Variables.PaymentGateway.setInput("premiumPaid", $scope.Variables.GetCreateQuoteData.dataSet.Details.PremiumToBePaid);
        $scope.Variables.PaymentGateway.update();
        if ($scope.Variables.CreateQuoteData.dataSet.age === '' || $scope.Variables.CreateQuoteData.dataSet.age === null || $scope.Variables.CreateQuoteData.dataSet.age === undefined) {
            var Age = moment().diff(moment($scope.Variables.GetCreateQuoteData.dataSet.Details.clientDOB, 'YYYY-MM-DD'), 'years');
            $scope.Variables.CreateQuoteSubmitJBPM.setInput("age", Age);
        } else {
            $scope.Variables.CreateQuoteSubmitJBPM.setInput("age", $scope.Variables.CreateQuoteData.dataSet.age);
        }
        //  $scope.Variables.CreateQuoteSubmitJBPM.setInput("age", $scope.Variables.CreateQuoteData.dataSet.age);
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("applicationId", $scope.Variables.CreateQuoteData.dataSet.applicationid);
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("custid", "null");
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("custname", "null");
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("loggedInId", $scope.Variables.loggedInUser.dataSet.id);
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("prevHistory", $scope.Widgets.select_weightchange_formWidget.datavalue);
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("productType", "null");
        $scope.Variables.CreateQuoteSubmitJBPM.setInput("status", "Pending Issuance");
        if ($scope.Variables.CreateQuoteData.dataSet.cover === null || $scope.Variables.CreateQuoteData.dataSet.cover === undefined || $scope.Variables.CreateQuoteData.dataSet.cover === '') {
            $scope.Variables.CreateQuoteSubmitJBPM.setInput("sum", $scope.Variables.GetCreateQuoteData.dataSet.Details.SumAssured);
        } else {
            $scope.Variables.CreateQuoteSubmitJBPM.setInput("sum", $scope.Variables.CreateQuoteData.dataSet.cover);
        }
        $scope.Variables.CreateQuoteSubmitJBPM.update();

        $scope.finaldata = {
            "ApplicationID": $scope.Widgets.FinalGrid.dataset.ApplicationId,
            "PremiumAmount": $scope.Widgets.lbl_PremiumAmount.caption
        };
    };




    $scope.wizard_customerdetailsLoad = function($isolateScope, stepIndex) {
        debugger
        if ($scope.pageDetails.navpath === "Leads") {
            var ldata = $scope.pageDetails.clientdata;
            $scope.Widgets.txt_firstname.datavalue = ldata.FirstName;
            $scope.Widgets.txtlastname.datavalue = ldata.LastName;
            $scope.Widgets.txtemail.datavalue = ldata.Email;
            $scope.Widgets.txt_phone.datavalue = ldata.PhoneNumber;

        }
        if ($scope.Variables.GetCreateQuoteData.dataSet.Details === undefined) {
            $scope.Widgets.form_customerdetails.formWidgets.switch_gender_customerdetails.datavalue = $scope.Variables.CreateQuoteData.dataSet.gender;
        }

    };




    $scope.button24Click = function($event, $isolateScope) {

        if ($scope.pageDetails.navpath === "PoliciesBO" && $scope.Variables.loggedInUser.dataSet.roles[0] != 'Agent') {
            $scope.Variables.goToPage_PoliciesForBO.navigate();
        } else {
            $scope.Variables.goToPage_Policies.navigate();
        }
    };


    $scope.txt_firstnameChange = function($event, $isolateScope, newVal, oldVal) {

        $isolateScope.$parent.Widgets.txt_firstname.datavalue = newVal.replace(/\s/g, '');
    };


    $scope.txtlastnameChange = function($event, $isolateScope, newVal, oldVal) {
        $isolateScope.$parent.Widgets.txtlastname.datavalue = newVal.replace(/\s/g, '');
    };




    $scope.wizard_reviewLoad = function($isolateScope, stepIndex) {

        if ($scope.Variables.GetCreateQuoteData.dataSet.Details.ProcessStatus == "Approved" || $scope.Variables.GetCreateQuoteData.dataSet.Details.ProcessStatus == "Rejected") {
            document.getElementsByClassName('commentbackground')[0].style.display = "none";
        } /* else if ($scope.Variables.GetCreateQuoteData.dataSet.Details.ProcessStatus == "RFIPending" || $scope.Variables.GetCreateQuoteData.dataSet.Details.ProcessStatus == "RFIReceived") {*/

        if ($scope.Variables.GetCreateQuoteData.dataSet.Details.ProcessStatus == "RFIReceived") {
            if ($scope.Variables.loggedInUser.dataSet.roles["0"] == "Agent") {
                $scope.Widgets.comment.show = false;
                document.getElementsByClassName('commentbackground')[0].style.display = "none";
            } else {
                $scope.Widgets.comment.show = true;
            }
        } else if ($scope.Variables.GetCreateQuoteData.dataSet.Details.ProcessStatus == "Pending Issuance" && $scope.Variables.loggedInUser.dataSet.roles["0"] == "BackOfficeOperator") {
            $scope.Widgets.comment.show = true;
        }

    };

}]);

Application.$controller("FinalGridController", ["$scope", "DialogService",
    function($scope, DialogService) {
        "use strict";
        $scope.ctrlScope = $scope;
        $scope.expandRow = function(rowObj) {

            $scope.$root.expandSelectedRow("PlanSummary", rowObj, $scope.Widgets.FinalGrid.fullFieldDefs);
            DialogService.showDialog("Dialog_plansummary");
            $scope.Widgets.FinalGrid.selectedItems.length = 0;
        };
    }
]);

Application.$controller("ConfirmationDialogController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);


Application.$controller("Dialog_plansummaryController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);
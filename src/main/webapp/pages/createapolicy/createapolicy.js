Application.$controller("createapolicyPageController", ["$scope", function($scope, $filter) {
    "use strict";
    $scope.amount = 0;
    var policydetails, agentdetails, selectedpolicydetails;
    $scope.pageDetails;
    $scope.finaldata = {};
    var isNominee = false;
    /* perform any action on widgets/variables within this block */
    $scope.onPageReady = function($filter) {

        /*
         * variables can be accessed through '$scope.Variables' property here
         * e.g. to get dataSet in a staticVariable named 'loggedInUser' use following script
         * $scope.Variables.loggedInUser.getData()
         * $scope.switch_gender_customerdetailsChange = function($event, $isolateScope, newVal, oldVal) {

    };
         * widgets can be accessed through '$scope.Widgets' property here
         * e.g. to get value of text widget named 'username' use following script
         * '$scope.Widgets.username.datavalue'
         */
        $('[data-step-id=4]').on('click', function() {
            debugger;
            alert('welcome');
        });

        $('[data-step-id=3]').addClass('hideelement');
        document.title = "Create a Policy";
        var navpath = $scope.Variables.goToPage_createapolicy.getData();
        $scope.pageDetails = $scope.Variables.PolicyDetails.dataSet;
        debugger;
        if ($scope.pageDetails.navpath === "dashboard") {

            $scope.Widgets.btn_continue.show = false;
            $scope.Widgets.btn_savecontinue.show = false;
            $scope.Widgets.btn_step3save.show = false;
            $scope.Widgets.btn_next.show = true;
            $scope.Widgets.btn_step2next.show = true;
            $scope.Widgets.btn_step3next.show = true;
            $scope.Widgets.btn_update.show = false;
            $scope.Widgets.btn_step2update.show = false;
            $scope.Widgets.btn_step3update.show = false;
            $scope.Widgets.amountlabel.caption = '$' + parseInt($scope.Variables.GetCreateQuoteData.dataSet.Details.PremiumToBePaid);

            $scope.Widgets.container_confirmation.show = true;
            $scope.disablewidgets(true, true, true, true, true);
            if ($scope.Variables.GetCreateQuoteData.dataSet.Nominees.length === 0) {
                isNominee = false;
                $scope.Widgets.btn_step3next.disabled = true;
            } else {
                isNominee = true;
                $scope.Widgets.btn_step3next.disabled = false;
            }
            $scope.$root.refreshBC($scope.activePageName, "Create a Policy", false);
        } else {
            debugger;
            $scope.Widgets.container_confirmation.show = false;
            $scope.Variables.GetCreateQuoteData.dataSet = {};
            // $scope.Variables.GetCreateQuoteData.dataSet;
            $scope.disablewidgets(false, false, false, false, false);
            $scope.$root.refreshBC($scope.activePageName, "Create a Policy", true);
        }
        debugger;
        agentdetails = $scope.Variables.GetAgentID.dataSet;
        // agentdetails = $scope.Variables.GetAgentID.getData();
        // console.log("Get Agent Details" + agentdetails);
        // console.log(agentdetails);
        policydetails = $scope.Variables.GetPolicyID.getData();
        $scope.Variables.GetPolicyID.update({}, function(data) {
            policydetails = data;
            console.log(policydetails);
        });

        console.log("Get Policy details" + policydetails);
        console.log(policydetails);
        // Object {UniquePolicyId: "858e74a4-cb43-11e6-8c86-0242ac11090e", PlanName: "iProtect Plus", CurrentFundValue: 1000000, CashValue: 20000}
        // $scope.Variables.GetPolicyID;
        // $scope.Variables.GetStates;
        // $scope.Variables.GetAgentID;

        // debugger;

    };

    $scope.btn_cancelClick = function($event, $isolateScope) {
        // $scope.Widgets.createapolicywizard.prev();
    };


    $scope.btn_nextClick = function($event, $isolateScope) {
        $scope.Widgets.createapolicywizard.next();
        //  $scope.Widgets.createapolicywizard.next();
        // $scope.disablewidgets = function(enable_disablevalue, step1, step2, step3, all)
        $scope.disablewidgets(true, false, true, false, true);
        $scope.Widgets.btn_step2edit.show = true;
        $scope.Widgets.btn_step2update.show = false;
    };
    $scope.btn_continueClick = function($event, $isolateScope) {
        $scope.CalculatePremium($scope.Widgets.select_cover.datavalue, $scope.Widgets.dob_date.datavalue, $scope.Widgets.switch_gender_createquote.datavalue, $scope.Widgets.select_Term.datavalue, $scope.Widgets.switch_tobacco.datavalue);
        $scope.Widgets.createapolicywizard.next();
    };


    $scope.btn_savecontinueClick = function($event, $isolateScope) {
        debugger;
        $scope.CreateQuotePersonalDetails();
        // $scope.Widgets.createapolicywizard.next();

    };


    $scope.btn_step2cancelClick = function($event, $isolateScope) {
        debugger;
        $scope.Widgets.createapolicywizard.prev();
    };


    $scope.btn_step3saveClick = function($event, $isolateScope) {
        debugger;
        $scope.CreateQuoteNomineeDetails();
        // $scope.Widgets.createapolicywizard.next();
    };


    $scope.btn_step3cancelClick = function($event, $isolateScope) {
        $scope.Widgets;
        debugger;
        $scope.Widgets.createapolicywizard.prev();
        debugger
    };

    $scope.dob_dateChange = function($event, $isolateScope, newVal, oldVal) {
        debugger;
        $scope.CalculatePremium($scope.Widgets.select_cover.datavalue, $scope.Widgets.dob_date.datavalue, $scope.Widgets.switch_gender_createquote.datavalue, $scope.Widgets.select_Term.datavalue, $scope.Widgets.switch_tobacco.datavalue);
        // var amnt = $scope.Widgets.IncomeAmnt.datavalue;
        // var calculatedAmount = parseFloat(amnt * CA * CAI).toFixed(2);
        // var TotalAmount = parseFloat(calculatedAmount * "0.015").toFixed(2);
    };
    $scope.CalculatePremium = function(sumassured, age, gender, term, tobacco) {
        var isvalid = $scope.isValidForm();
        console.log(isvalid);
        if (isvalid === false) {
            // debugger;
            // $scope.Widgets.btn_continue.disabled = true;
            // $scope.showToaster("InvalidValues");
            $scope.Widgets.container_confirmation.show = false;
            // $scope.Widgets.saveAsDraftButton.disabled = false;
            return;
        }
        debugger;
        var SumAssured = sumassured,
            CA = 0,
            CG = 0,
            CS = 0,
            CT = 0,
            CTO = 0;
        var Age = moment().diff(moment(age, 'MM-DD-YYYY'), 'years');
        if (Age >= 18 && Age <= 25) {
            // age_range = "18-25";
            CA = parseFloat(0.80);
        } else if (Age >= 26 && Age <= 39) {
            // age_range = "26-39";
            CA = parseFloat(1.50);
        } else if (Age >= 40 && Age <= 65) {
            // age_range = "40-65";
            CA = parseFloat(2.20);
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
        if (sumassurednumber >= 50000 && sumassurednumber <= 500000) {
            CS = parseFloat(0.0040);
        } else if (sumassurednumber > 500000 && sumassurednumber < 1000000) {
            CS = parseFloat(0.0020);
        } else if (sumassurednumber >= 1000000 && sumassurednumber <= 2000000) {
            CS = parseFloat(0.0007);
        }
        // var termduration = $scope.Widgets.select_Term.datavalue.replace(' Years', '');
        var termduration = term;
        if (termduration >= 5 && termduration < 10) {
            CT = parseFloat(0.70);
        } else if (termduration >= 10 && termduration < 18) {
            CT = parseFloat(0.85);
        } else if (termduration >= 18 && termduration <= 25) {
            CT = parseFloat(1.20);
        }
        if (tobacco === "Yes") {
            CTO = parseFloat(1.00);
        } else if (tobacco === "No") {
            CTO = parseFloat(0.92);
        }
        console.log(SumAssured + " " + CA + " " + " " + CG + " " + CS + " " + CT + " " + CTO);
        var AnnualPremium = 0;

        AnnualPremium = parseFloat(sumassurednumber * CA * CG * CS * CT * CTO).toFixed(2);
        // var amount = nFormatter(AnnualPremium, 1);
        $scope.amount = Number(Math.round(Math.round(AnnualPremium * 100) / 100));
        // $scope.Widgets.amountlabel.caption = $scope.amount;
        $scope.Widgets.container_confirmation.show = true;
        $scope.Widgets.btn_continue.disabled = false;
        // $scope.Widgets.amountlabel.caption = amount;
        console.log(AnnualPremium);
        // sumassured, age, gender, term, tobacco
        $scope.Variables.CreateQuoteData.setData({
            "dateofbirth": age,
            "state": "",
            "gender": gender,
            "tobacco": tobacco,
            "cover": sumassurednumber,
            "term": termduration,
            "sumassured": AnnualPremium
        });
        console.log($scope.Variables.CreateQuoteData.dataSet);
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


    $scope.select_TermChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover.datavalue, $scope.Widgets.dob_date.datavalue, $scope.Widgets.switch_gender_createquote.datavalue, $scope.Widgets.select_Term.datavalue, $scope.Widgets.switch_tobacco.datavalue);
    };


    $scope.select_coverChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover.datavalue, $scope.Widgets.dob_date.datavalue, $scope.Widgets.switch_gender_createquote.datavalue, $scope.Widgets.select_Term.datavalue, $scope.Widgets.switch_tobacco.datavalue);
    };


    $scope.switch_tobaccoChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover.datavalue, $scope.Widgets.dob_date.datavalue, $scope.Widgets.switch_gender_createquote.datavalue, $scope.Widgets.select_Term.datavalue, $scope.Widgets.switch_tobacco.datavalue);
    };


    $scope.switch_gender_createquoteChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover.datavalue, $scope.Widgets.dob_date.datavalue, $scope.Widgets.switch_gender_createquote.datavalue, $scope.Widgets.select_Term.datavalue, $scope.Widgets.switch_tobacco.datavalue);
    };


    $scope.select_state_createquoteChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.CalculatePremium($scope.Widgets.select_cover.datavalue, $scope.Widgets.dob_date.datavalue, $scope.Widgets.switch_gender_createquote.datavalue, $scope.Widgets.select_Term.datavalue, $scope.Widgets.switch_tobacco.datavalue);
    };
    $scope.isValidForm = function() {
        var isvalid = true;
        debugger;
        if (($scope.Widgets.dob_date.datavalue === undefined || $scope.Widgets.dob_date.datavalue === "")) {
            isvalid = false;
        }
        if (isvalid === true && $scope.Widgets.select_state_createquote.datavalue === undefined || $scope.Widgets.switch_gender_createquote.datavalue === undefined || $scope.Widgets.switch_tobacco.datavalue === undefined || $scope.Widgets.select_Term.datavalue === undefined || $scope.Widgets.select_cover.datavalue === undefined) {
            isvalid = false;
        } else {
            isvalid = true;
        }
        return isvalid;

    };
    $scope.isvalidCustomerForm = function() {
        debugger;
        var isvalidcustomerform = true;
        if (($scope.Widgets.txt_firstname.datavalue === undefined || $scope.Widgets.txt_firstname.datavalue === "") || ($scope.Widgets.txtlastname.datavalue === undefined || $scope.Widgets.txtlastname.datavalue === "") || ($scope.Widgets.txtemail.datavalue === undefined || $scope.Widgets.txtemail.datavalue === "") || ($scope.Widgets.txt_company.datavalue === undefined || $scope.Widgets.txt_company.datavalue === "") || ($scope.Widgets.txt_assuredincome.datavalue === undefined || $scope.Widgets.txt_assuredincome.datavalue === "") || ($scope.Widgets.txtaddress1.datavalue === undefined || $scope.Widgets.txtaddress1.datavalue === "") || ($scope.Widgets.txtaddress2.datavalue === undefined || $scope.Widgets.txtaddress2.datavalue === "") || ($scope.Widgets.txt_zip.datavalue === undefined || $scope.Widgets.txt_zip.datavalue === "") || ($scope.Widgets.txt_mobile.datavalue === undefined || $scope.Widgets.txt_mobile.datavalue === "") || ($scope.Widgets.txt_mobile.datavalue === undefined || $scope.Widgets.txt_mobile.datavalue === "") || ($scope.Widgets.txt_phone.datavalue === undefined || $scope.Widgets.txt_phone.datavalue === "")) {
            isvalidcustomerform = false;
            // if (isvalidcustomerform === true && $scope.Widgets.switch_gender_customerdetails.datavalue === undefined && $scope.Widgets.select_maritalstatus.datavalue === undefined && $scope.Widgets.select_childrens.datavalue === undefined && $scope.Widgets.select_qualification.datavalue === undefined && $scope.Widgets.select_occupation.datavalue === undefined && $scope.Widgets.select_occupationhazards.datavalue === undefined && $scope.Widgets.select_addresstype.datavalue == undefined && $scope.Widgets.select_state.datavalue === undefined && $scope.Widgets.select_country.datavalue === undefined) {
            //     isvalidcustomerform = false;
            // }
        }
        if (isvalidcustomerform === true && $scope.Widgets.switch_gender_customerdetails.datavalue === undefined || $scope.Widgets.select_maritalstatus.datavalue === undefined || $scope.Widgets.select_childrens.datavalue === undefined || $scope.Widgets.select_qualification.datavalue === undefined || $scope.Widgets.select_occupation.datavalue === undefined || $scope.Widgets.select_occupationhazards.datavalue === undefined || $scope.Widgets.select_addresstype.datavalue === undefined || $scope.Widgets.select_state.datavalue === undefined || $scope.Widgets.select_country.datavalue === undefined) {
            isvalidcustomerform = false;
        } else {
            isvalidcustomerform = true;
        }
        return isvalidcustomerform;
    };
    $scope.CreateQuotePersonalDetails = function() {
        var isvalid = $scope.isvalidCustomerForm();
        console.log(isvalid);
        if (isvalid === false) {
            // debugger;
            // $scope.Widgets.btn_savecontinue.disabled = true;
            $scope.Widgets.container_confirmation.show = false;
            $scope.showToaster("InvalidValues");
            // $scope.Widgets.saveAsDraftButton.disabled = false;
            return;
        }
        var personalRequestBody = {
            "userName": $scope.Widgets.txt_firstname.datavalue + $scope.Widgets.txtlastname.datavalue,
            "password": "client1",
            "client": {
                "clientNumber": "C17777",
                "emailId": $scope.Widgets.txtemail.datavalue,
                "dateOfBirth": $scope.Variables.CreateQuoteData.dataSet.dateofbirth,
                "clientName": $scope.Widgets.txt_firstname.datavalue + " " + $scope.Widgets.txtlastname.datavalue,
                "maritalStatus": $scope.Widgets.select_maritalstatus.datavalue,
                "noOfChildren": parseInt($scope.Widgets.select_childrens.datavalue),
                "nationality": "American",
                "gender": $scope.Variables.CreateQuoteData.dataSet.gender === $scope.Widgets.switch_gender_customerdetails.datavalue ? $scope.Variables.CreateQuoteData.dataSet.gender : $scope.Widgets.switch_gender_customerdetails.datavalue,
                "mobileNumber": $scope.Widgets.txt_mobile.datavalue,
                "phoneNumber": $scope.Widgets.txt_phone.datavalue,
                "qualification": $scope.Widgets.select_qualification.datavalue,
                "company": $scope.Widgets.txt_company.datavalue,
                "occupationalHazards": $scope.Widgets.select_occupationhazards.datavalue,
                "annualIncome": parseInt($scope.Widgets.txt_assuredincome.datavalue),
                "occupation": $scope.Widgets.select_occupation.datavalue
            },
            "address": {
                "addressType": $scope.Widgets.select_addresstype.datavalue,
                "addressLine1": $scope.Widgets.txtaddress1.datavalue,
                "addressLine2": $scope.Widgets.txtaddress2.datavalue,
                "zip": $scope.Widgets.txt_zip.datavalue,
                "stateId": $scope.Widgets.select_state.datavalue,
                "country": $scope.Widgets.select_country.datavalue
            },
            "clientDetails": {
                "agentId": agentdetails.AgentId,
                "uniquePolicyId": $scope.pageDetails.policyid,
                "sumAssured": parseInt($scope.Variables.CreateQuoteData.dataSet.cover),
                "policyId": "",
                "premiumToBePaid": $scope.Variables.CreateQuoteData.dataSet.sumassured,
                "premiumType": "yearly",
                "tobaccoIntake": $scope.Variables.CreateQuoteData.dataSet.tobacco,
                "term": parseInt($scope.Variables.CreateQuoteData.dataSet.term),
                "updatedBy": ""
            }
        };
        console.log(personalRequestBody);
        $scope.Variables.InsertCreateQuotePersonal.setInput("RequestBody", personalRequestBody);
        $scope.Variables.InsertCreateQuotePersonal.update({}, function(data) {
            $scope.Widgets;
            console.log(data);
            debugger;
        });
        // console.log(personalRequestBody);

    };
    $scope.showToaster = function(variableName) {
        $scope.Variables[variableName].notify();
    };

    $scope.InsertCreateQuotePersonalonSuccess = function(variable, data) {
        debugger;
        $scope.showToaster("ApplicationIDCreated");
        $scope.Variables.CreateQuoteData.dataSet.applicationid = data;
        $scope.Widgets.createapolicywizard.next();
    };


    $scope.InsertCreateQuotePersonalonError = function(variable, data) {
        debugger;
        // $scope.Widgets.btn_savecontinue.disabled = true;
        $scope.showToaster("ApplicationIDNotCreated");
    };


    $scope.txt_firstnameChange = function($event, $isolateScope, newVal, oldVal) {
        // debugger;
        $scope.ifchangevalid();
        // debugger;
    };

    $scope.ifchangevalid = function() {
        var isvalid = $scope.isvalidCustomerForm();
        if (isvalid === false) {
            return;
        } else {
            $scope.Widgets.btn_savecontinue.disabled = false;
        }
    };
    $scope.switch_gender_customerdetailsChange = function($event, $isolateScope, newVal, oldVal) {
        debugger;
        if ($scope.Variables.CreateQuoteData.dataSet.gender === !$scope.Widgets.switch_gender_customerdetails.datavalue) {
            $scope.CalculatePremium($scope.Variables.CreateQuoteData.dataSet.cover, $scope.Variables.CreateQuoteData.dataSet.dateofbirth, $scope.Variables.CreateQuoteData.dataSet.gender, $scopeVariables.CreateQuoteData.dataSet.term, $scope.Variables.CreateQuoteData.dataSet.tobacco);
        }
    };


    $scope.txtlastnameChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifchangevalid();
    };


    $scope.txtemailChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifchangevalid();
    };


    $scope.txt_companyChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifchangevalid();
    };


    $scope.txt_assuredincomeChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifchangevalid();
    };


    $scope.txtaddress1Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifchangevalid();
    };


    $scope.txtaddress2Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifchangevalid();
    };


    $scope.txt_zipChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifchangevalid();
    };


    $scope.txt_cityChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifchangevalid();
    };


    $scope.txt_mobileChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifchangevalid();
    };


    $scope.txt_phoneChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifchangevalid();
    };
    $scope.isvalidNomineeForm = function() {
        debugger;
        var isvalidnomineeform = true;
        if (($scope.Widgets.txt_nomineeFirstname.datavalue === undefined || $scope.Widgets.txt_nomineeFirstname.datavalue === "") || ($scope.Widgets.txt_nomineelastname.datavalue === undefined || $scope.Widgets.txt_nomineelastname.datavalue === "") || ($scope.Widgets.txt_EntitlementPercentage.datavalue === undefined || $scope.Widgets.txt_EntitlementPercentage.datavalue === "") || ($scope.Widgets.txt_nomineeaddress1.datavalue === undefined || $scope.Widgets.txt_nomineeaddress1.datavaluee === "") || ($scope.Widgets.txt_nomineeaddress2.datavalue === undefined || $scope.Widgets.txt_nomineeaddress2.datavalue === "") || ($scope.Widgets.txt_nomineezip.datavalue === undefined || $scope.Widgets.txt_nomineezip.datavalue === "") || ($scope.Widgets.txt_nomineemobile.datavalue === undefined || $scope.Widgets.txt_nomineemobile.datavalue === "") || ($scope.Widgets.txt_nomineephone.datavalue === undefined || $scope.Widgets.txt_nomineephone.datavalue === "") || ($scope.Widgets.txt_height.datavalue === undefined || $scope.Widgets.txt_height.datavalue === "") || ($scope.Widgets.txt_weight.datavalue === undefined || $scope.Widgets.txt_weight.datavalue === "") || ($scope.Widgets.dob_nominee.datavalue === undefined || $scope.Widgets.dob_nominee.datavalue === "")) {
            isvalidnomineeform = false;
            // if (isvalidcustomerform === true && $scope.Widgets.switch_gender_customerdetails.datavalue === undefined && $scope.Widgets.select_maritalstatus.datavalue === undefined && $scope.Widgets.select_childrens.datavalue === undefined && $scope.Widgets.select_qualification.datavalue === undefined && $scope.Widgets.select_occupation.datavalue === undefined && $scope.Widgets.select_occupationhazards.datavalue === undefined && $scope.Widgets.select_addresstype.datavalue == undefined && $scope.Widgets.select_state.datavalue === undefined && $scope.Widgets.select_country.datavalue === undefined) {
            //     isvalidcustomerform = false;
            // }
        }
        if (isvalidnomineeform === true && $scope.Widgets.select_nomineerelation.datavalue === undefined || $scope.Widgets.select_nomineecountry.datavalue === undefined || $scope.Widgets.select_nomineestate.datavalue === undefined || $scope.Widgets.select_weightchange.datavalue === undefined) {
            isvalidnomineeform = false;
        } else {
            isvalidnomineeform = true;
        }
        return isvalidnomineeform;
    };

    $scope.CreateQuoteNomineeDetails = function() {
        debugger;
        var isvalid = $scope.isvalidNomineeForm();
        console.log(isvalid);
        if (isvalid === false) {
            // debugger;
            // $scope.Widgets.btn_step3save.disabled = true;
            if (isNominee === false) {
                // $scope.Widgets.btn_step3update.disabled = true;
            };
            // $scope.Widgets.container_confirmation.show = false;
            $scope.showToaster("InvalidValues");
            // $scope.Widgets.saveAsDraftButton.disabled = false;
            return;
        }
        // $scope.Widgets.btn_step3update.disabled = false;
        var NomineeRequestBody = {
            "applicationId": $scope.Variables.CreateQuoteData.dataSet.applicationid,
            "relationship": $scope.Widgets.select_nomineerelation.datavalue,
            "stateId": $scope.Widgets.select_nomineestate.datavalue,
            "entilementPercentage": $scope.Widgets.txt_EntitlementPercentage.datavalue,
            "phoneNumber": $scope.Widgets.txt_nomineephone.datavalue,
            "firstName": $scope.Widgets.txt_nomineeFirstname.datavalue,
            "mobileNumber": $scope.Widgets.txt_nomineemobile.datavalue,
            "zip": $scope.Widgets.txt_nomineezip.datavalue,
            "lastName": $scope.Widgets.txt_nomineelastname.datavalue,
            "dateOfBirth": $scope.Widgets.dob_nominee.datavalue,
            "country": $scope.Widgets.select_nomineecountry.datavalue,
            "addressLine1": $scope.Widgets.txt_nomineeaddress1.datavalue,
            "addressLine2": $scope.Widgets.txt_nomineeaddress2.datavalue,
            "client": {
                "weight": $scope.Widgets.txt_weight.datavalue,
                "height": $scope.Widgets.txt_height.datavalue,
                "changeInWeight": $scope.Widgets.select_weightchange.datavalue
            }
        };


        $scope.Variables.InsertCreateQuoteNominee.setInput("RequestBody", NomineeRequestBody);
        $scope.Variables.InsertCreateQuoteNominee.update({}, function(data) {
            $scope.Widgets;
            console.log(data);
            debugger;
        });

        // console.log(personalRequestBody);

    };
    $scope.ifnomineechangevalid = function() {
        var isvalid = $scope.isvalidNomineeForm();
        if (isvalid === false) {
            // debugger;
            // $scope.Widgets.btn_step3save.disabled = true;
            // $scope.Widgets.container_confirmation.show = false;
            // $scope.showToaster("InvalidValues");
            // $scope.Widgets.saveAsDraftButton.disabled = false;
            return;
        } else {
            $scope.Widgets.btn_step3save.disabled = false;
        }
    };

    $scope.txt_nomineeFirstnameChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifnomineechangevalid();
    };


    $scope.txt_nomineelastnameChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifnomineechangevalid();
    };


    $scope.txt_EntitlementPercentageChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifnomineechangevalid();
    };


    $scope.txt_nomineeaddress1Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifnomineechangevalid();
    };


    $scope.txt_nomineeaddress2Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifnomineechangevalid();
    };


    $scope.txt_nomineezipChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifnomineechangevalid();
    };


    $scope.txt_nomineemobileChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifnomineechangevalid();
    };


    $scope.txt_nomineephoneChange = function($event, $isolateScope, newVal, oldVal) {
        $scope.ifnomineechangevalid();
    };


    $scope.InsertCreateQuoteNomineeonSuccess = function(variable, data) {
        $scope.showToaster("Applicationupdated");
        $scope.Variables.GetCreateQuoteData.setInput("ApplicationID", $scope.Variables.CreateQuoteData.dataSet.applicationid);
        $scope.Variables.GetCreateQuoteData.update({}, function(data) {
            console.log(data);
            debugger;
            $scope.Widgets.createapolicywizard.next();
        });



    };


    $scope.InsertCreateQuoteNomineeonError = function(variable, data) {
        // $scope.Widgets.btn_step3save.disabled = true;
        $scope.showToaster("ApplicationIDNotCreated");
    };


    $scope.checkbox1Change = function($event, $isolateScope, newVal, oldVal) {
        $scope.Widgets;
        debugger;
        $scope.Widgets.txt_nomineeaddress1.datavalue = $scope.Widgets.txtaddress1.datavalue;
        $scope.Widgets.txt_nomineeaddress2.datavalue = $scope.Widgets.txtaddress2.datavalue;
        $scope.Widgets.txt_nomineezip.datavalue = $scope.Widgets.txt_zip.datavalue;
        $scope.Widgets.select_nomineestate.datavalue = $scope.Widgets.select_state.datavalue;
        $scope.Widgets.select_nomineecountry.datavalue = $scope.Widgets.select_country.datavalue;
        $scope.Widgets.txt_nomineemobile.datavalue = $scope.Widgets.txt_mobile.datavalue;
        $scope.Widgets.txt_nomineephone.datavalue = $scope.Widgets.txt_phone.datavalue;

    };
    $scope.disablewidgets = function(enable_disablevalue, step1, step2, step3, all) {
        // var val=enable_disablevalue;
        debugger;
        if (step1 === true || all === true) {
            $scope.Widgets.dob_date.disabled = enable_disablevalue;
            $scope.Widgets.select_state_createquote.disabled = enable_disablevalue;
            $scope.Widgets.switch_gender_createquote.disabled = enable_disablevalue;
            $scope.Widgets.switch_tobacco.disabled = enable_disablevalue;
            $scope.Widgets.select_Term.disabled = enable_disablevalue;
            $scope.Widgets.select_cover.disabled = enable_disablevalue;
            // $scope.Widgets.btn_update.show = true;
        }
        if (step2 === true || all === true) {
            $scope.Widgets.txt_firstname.disabled = enable_disablevalue;
            $scope.Widgets.txtlastname.disabled = enable_disablevalue;
            $scope.Widgets.txtemail.disabled = enable_disablevalue;
            $scope.Widgets.txt_company.disabled = enable_disablevalue;
            $scope.Widgets.txt_assuredincome.disabled = enable_disablevalue;
            $scope.Widgets.txtaddress1.disabled = enable_disablevalue;
            $scope.Widgets.txtaddress2.disabled = enable_disablevalue;
            $scope.Widgets.txt_zip.disabled = enable_disablevalue;
            $scope.Widgets.txt_mobile.disabled = enable_disablevalue;
            $scope.Widgets.txt_mobile.disabled = enable_disablevalue;
            $scope.Widgets.txt_phone.disabled = enable_disablevalue;
            $scope.Widgets.switch_gender_customerdetails.disabled = enable_disablevalue;
            $scope.Widgets.select_maritalstatus.disabled = enable_disablevalue;
            $scope.Widgets.select_childrens.disabled = enable_disablevalue;
            $scope.Widgets.select_qualification.disabled = enable_disablevalue;
            $scope.Widgets.select_occupation.disabled = enable_disablevalue;
            $scope.Widgets.select_occupationhazards.disabled = enable_disablevalue;
            $scope.Widgets.select_addresstype.disabled = enable_disablevalue;
            $scope.Widgets.select_state.disabled = enable_disablevalue;
            $scope.Widgets.select_country.disabled = enable_disablevalue;
            // $scope.Widgets.btn_step2update.show = true;
        }
        if (step3 === true || all === true) {
            $scope.Widgets.txt_nomineeFirstname.disabled = enable_disablevalue;
            $scope.Widgets.txt_nomineelastname.disabled = enable_disablevalue;
            $scope.Widgets.txt_EntitlementPercentage.disabled = enable_disablevalue;
            $scope.Widgets.txt_nomineeaddress1.disabled = enable_disablevalue;
            $scope.Widgets.txt_nomineeaddress2.disabled = enable_disablevalue;
            $scope.Widgets.txt_nomineezip.disabled = enable_disablevalue;
            $scope.Widgets.txt_nomineemobile.disabled = enable_disablevalue;
            $scope.Widgets.txt_nomineephone.disabled = enable_disablevalue;
            $scope.Widgets.txt_height.disabled = enable_disablevalue;
            $scope.Widgets.txt_weight.disabled = enable_disablevalue;
            $scope.Widgets.dob_nominee.disabled = enable_disablevalue;
            $scope.Widgets.select_nomineerelation.disabled = enable_disablevalue;
            $scope.Widgets.select_nomineecountry.disabled = enable_disablevalue;
            $scope.Widgets.select_nomineestate.disabled = enable_disablevalue;
            $scope.Widgets.select_weightchange.disabled = enable_disablevalue;
            // $scope.Widgets.btn_step3update.show = true;
        }
    };







    $scope.btn_submitClick = function($event, $isolateScope) {
        $scope.Widgets;
        debugger;
        $('[data-step-id=3]').removeClass('hideelement');
        // $scope.finaldata = {
        //     "ApplicationID": $scope.Widgets.FinalGrid.dataset.ApplicationId,
        //     "PremiumAmount": $scope.Widgets.lbl_PremiumAmount.caption
        // };
        // var FinalSubmit = {
        //     "status": "Pending Issuance",
        //     "applicationId": $scope.finaldata.ApplicationID
        // };
        // $scope.Variables.CreateQuoteFinalUpdate.setInput("applicationid", $scope.finaldata.ApplicationID);
        // $scope.Variables.CreateQuoteFinalUpdate.setInput("status", "Pending Issuance");
        // $scope.Variables.CreateQuoteFinalUpdate.update();

    };


    $scope.CreateQuoteFinalSubmitonSuccess = function(variable, data) {

    };


    $scope.CreateQuoteFinalSubmitonError = function(variable, data) {

    };

    $scope.btn_editClick = function($event, $isolateScope) {
        $scope.disablewidgets(false, true, false, false, false);
        $scope.Widgets.btn_edit.show = false;
        $scope.Widgets.btn_update.show = true;
    };

    $scope.btn_step2editClick = function($event, $isolateScope) {
        $scope.disablewidgets(false, false, true, false, false);
        $scope.Widgets.btn_step2edit.show = false;
        $scope.Widgets.btn_step2update.show = true;
    };


    $scope.btn_step3editClick = function($event, $isolateScope) {
        $scope.disablewidgets(false, false, false, true, false);
        $scope.Widgets.btn_step3edit.show = false;
        $scope.Widgets.btn_step3update.show = true;
    };
    $scope.updatefirsttwosteps = function(updatetype) {
        var appid = $scope.Variables.GetCreateQuoteData.dataBinding.ApplicationID;
        var clientRequestBody = {};
        if (updatetype === "client") {
            var isvalid = $scope.isValidForm();
            console.log(isvalid);
            var iscustvalid = $scope.isvalidCustomerForm();
            console.log(iscustvalid);
            if (isvalid === false || iscustvalid === false) {
                // debugger;
                // $scope.Widgets.btn_step2update.disabled = true;
                // $scope.Widgets.container_confirmation.show = false;
                // $scope.showToaster("InvalidValues");
                // $scope.Widgets.btn_savecontinue.disabled = true;
                // $scope.Widgets.container_confirmation.show = false;
                $scope.showToaster("InvalidValues");
                // $scope.Widgets.saveAsDraftButton.disabled = false;
                return;
            }
            clientRequestBody = {
                "emailId": $scope.Widgets.txtemail.datavalue,
                "dateOfBirth": $scope.Widgets.dob_date.datavalue,
                "clientName": $scope.Widgets.txt_firstname.datavalue + " " + $scope.Widgets.txtlastname.datavalue,
                "maritalStatus": $scope.Widgets.select_maritalstatus.datavalue,
                "noOfChildren": parseInt($scope.Widgets.select_childrens.datavalue),
                "nationality": "American",
                "gender": $scope.Widgets.switch_gender_customerdetails.datavalue,
                "mobileNumber": $scope.Widgets.txt_mobile.datavalue,
                "phoneNumber": $scope.Widgets.txt_phone.datavalue,
                "qualification": $scope.Widgets.select_qualification.datavalue,
                "company": $scope.Widgets.txt_company.datavalue,
                "occupationalHazards": $scope.Widgets.select_occupationhazards.datavalue,
                "annualIncome": parseInt($scope.Widgets.txt_assuredincome.datavalue),
                "occupation": $scope.Widgets.select_occupation.datavalue,
                "sumAssured": parseInt($scope.Widgets.select_cover.datavalue),
                "premiumToBePaid": parseInt($scope.Widgets.amountlabel.caption.replace("$", '')),
                "tobaccoIntake": $scope.Widgets.switch_tobacco.datavalue,
                "term": parseInt($scope.Widgets.select_Term.datavalue),
                "addressType": $scope.Widgets.select_addresstype.datavalue,
                "addressLine1": $scope.Widgets.txtaddress1.datavalue,
                "addressLine2": $scope.Widgets.txtaddress2.datavalue,
                "zip": $scope.Widgets.txt_zip.datavalue,
                "stateId": $scope.Widgets.select_state.datavalue,
                "country": $scope.Widgets.select_country.datavalue
            };
            console.log(appid);
            console.log(clientRequestBody);
        } else if (updatetype === "nominees") {
            var isnomineevalid = $scope.isvalidNomineeForm();
            console.log(isnomineevalid);
            if (isnomineevalid === false) {
                // $scope.Widgets.btn_step3update.disabled = true;
                $scope.showToaster("InvalidValues");
                return;
            }
            clientRequestBody = {
                "firstName": $scope.Widgets.txt_nomineeFirstname.datavalue,
                "lastName": $scope.Widgets.txt_nomineelastname.datavalue,
                "relationship": $scope.Widgets.select_nomineerelation.datavalue,
                "entilementPercentage": $scope.Widgets.txt_EntitlementPercentage.datavalue,
                "dateOfBirth": $scope.Widgets.dob_nominee.datavalue,
                "mobileNumber": $scope.Widgets.txt_nomineemobile.datavalue,
                "phoneNumber": $scope.Widgets.txt_nomineephone.datavalue,
                "addressLine1": $scope.Widgets.txt_nomineeaddress1.datavalue,
                "addressLine2": $scope.Widgets.txt_nomineeaddress2.datavalue,
                "zip": $scope.Widgets.txt_nomineezip.datavalue,
                "stateId": $scope.Widgets.select_nomineestate.datavalue,
                "country": $scope.Widgets.select_nomineecountry.datavalue,
                "height": parseInt($scope.Widgets.txt_height.datavalue),
                "weight": parseInt($scope.Widgets.txt_weight.datavalue),
                "changeInWeight": $scope.Widgets.select_weightchange.datavalue
            };
        }
        console.log(clientRequestBody);
        $scope.Variables.UpdateCreateQuoteDetails.setInput("updatetype", updatetype);
        $scope.Variables.UpdateCreateQuoteDetails.setInput("applicationid", appid);
        $scope.Variables.UpdateCreateQuoteDetails.setInput("RequestBody", clientRequestBody);
        $scope.Variables.UpdateCreateQuoteDetails.update({}, function(data) {
            $scope.Variables;
            $scope.Widgets;
            debugger;

        });
    };
    $scope.btn_updateClick = function($event, $isolateScope) {
        $scope.Variables.CreateQuoteData;
        $scope.Variables.GetCreateQuoteData.dataSet;
        debugger;
        $scope.updatefirsttwosteps("client");

    };
    $scope.btn_step2updateClick = function($event, $isolateScope) {
        $scope.updatefirsttwosteps("client");
    };


    $scope.btn_step3updateClick = function($event, $isolateScope) {
        $scope.Variables;
        console.log(isNominee);
        debugger;
        if (isNominee === false) {
            $scope.Variables.CreateQuoteData.dataSet.applicationid = $scope.Variables.GetCreateQuoteData.dataBinding.ApplicationID;
            console.log($scope.Variables.CreateQuoteData.dataSet);
            $scope.CreateQuoteNomineeDetails();
        } else if (isNominee === true) {
            $scope.updatefirsttwosteps("nominees");
        }
        debugger;
        // $scope.CreateQuoteNomineeDetails();
        // $scope.updatefirsttwosteps("nominees");
    };


    $scope.UpdateCreateQuoteDetailsonSuccess = function(variable, data) {
        $scope.showToaster("ApplicationupdatedSuccess");
        $scope.Widgets.createapolicywizard.next();

    };


    $scope.btn_step2nextClick = function($event, $isolateScope) {
        debugger;
        // $scope.disablewidgets(false, false, true, false, true);
        // $scope.disablewidgets = function(enable_disablevalue, step1, step2, step3, all)
        $scope.Widgets.createapolicywizard.next();
        $scope.disablewidgets(true, false, false, true, true);
        $scope.Widgets.btn_step3edit.show = true;
        $scope.Widgets.btn_step3update.show = false;
        // $scope.Widgets.btn_step2edit.show = true;
        // $scope.Widgets.btn_step2update.show = false;
        debugger
    };


    $scope.button22Click = function($event, $isolateScope) {
        $scope.Widgets.createapolicywizard.next();
    };


    $scope.button23Click = function($event, $isolateScope) {
        $scope.sendEmail();
    };



    $scope.sendEmail = function() {


        // var username = $scope.Variables.GetCreateQuoteData.dataSet.Details.EmailId;
        //var password = "default"
        //var ClientNamename = $scope.Variables.GetCreateQuoteData.dataSet.Details.ClientName;
        var Subject = "Your Dublin Account Is Now Active";
        var email = "manikandan.sankar@imaginea.com";
        /*Creating Email Templates*/
        var EmailBody = "document.getElementById(tempElement).innerHTML";
        $scope.Variables.EmailNotify.dataBinding.Name = '';
        $scope.Variables.EmailNotify.dataBinding.to = email;
        $scope.Variables.EmailNotify.dataBinding.ebody = EmailBody;

        $scope.Variables.EmailNotify.dataBinding.eSubject = Subject;
        $scope.Variables.EmailNotify.update({}, function(data) {
            alert("Email Trigged");
            return;
        });
    }
}]);

Application.$controller("FinalGridController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("confirmdialog1Controller", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;
    }
]);

Application.$controller("ConfirmationDialogController", ["$scope",
    function($scope) {
        "use strict";
        $scope.ctrlScope = $scope;

        $scope.ConfirmationDialogClose = function($event, $isolateScope) {

        };

    }
]);
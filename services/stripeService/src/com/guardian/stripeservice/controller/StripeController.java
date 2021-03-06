/**This is a Studio Managed File. DO NOT EDIT THIS FILE. Your changes may be reverted by Studio.*/
package com.guardian.stripeservice.controller;

import com.guardian.stripeservice.StripeService;
import com.guardian.stripeservice.StripeService.PaymentInfo;
import com.stripe.exception.CardException;
import com.stripe.exception.RateLimitException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.APIConnectionException;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import com.wavemaker.tools.api.core.annotations.WMAccessVisibility;
import com.wavemaker.tools.api.core.models.AccessSpecifier;

@RestController
@RequestMapping(value = "/stripe")
public class StripeController {

    @Autowired
    private StripeService stripeservice;

    @RequestMapping(value = "/makePayment", method = RequestMethod.POST)
    @WMAccessVisibility(value = AccessSpecifier.APP_ONLY)
    @ApiOperation(value = "")
    public Charge makePayment(@RequestBody PaymentInfo paymentInfo) throws CardException, RateLimitException, InvalidRequestException, AuthenticationException, APIConnectionException, StripeException {
        return stripeservice.makePayment(paymentInfo);
    }
}

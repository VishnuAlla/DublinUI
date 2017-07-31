/*Copyright (c) 2016-2017 imaginea.com All Rights Reserved.
 This software is the confidential and proprietary information of imaginea.com You shall not disclose such Confidential Information and shall use it only in accordance
 with the terms of the source code license agreement you entered into with imaginea.com*/
package com.guardian.stripeservice;

import javax.servlet.http.HttpServletRequest;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;


import com.wavemaker.runtime.security.SecurityService;
import com.wavemaker.runtime.service.annotations.ExposeToClient;
import com.wavemaker.runtime.service.annotations.HideFromClient;

import java.util.Map;
import java.util.HashMap;
import com.stripe.model.Charge;

// Stripe imports
import com.stripe.Stripe;
//handle exceptions
import com.stripe.*;
import com.stripe.exception.APIConnectionException;
import com.stripe.exception.APIException;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.RateLimitException;
import com.stripe.exception.StripeException;

//import com.payment_web.stripeservice.model.*;

/**
 * This is a singleton class with all its public methods exposed as REST APIs via generated controller class.
 * To avoid exposing an API for a particular public method, annotate it with @HideFromClient.
 *
 * Method names will play a major role in defining the Http Method for the generated APIs. For example, a method name
 * that starts with delete/remove, will make the API exposed as Http Method "DELETE".
 *
 * Method Parameters of type primitives (including java.lang.String) will be exposed as Query Parameters &
 * Complex Types/Objects will become part of the Request body in the generated API.
 */
@ExposeToClient
public class StripeService {

    private static final Logger logger = LoggerFactory.getLogger(StripeService.class);

    @Autowired
    private SecurityService securityService;
    
    public static class PaymentInfo {

        private String tokenId;
        private Integer amount;

        public void setTokenId(String tokenId) {
            this.tokenId = tokenId;
        }

        public String getTokenId() {
            return this.tokenId;
        }

        public void setAmount(Integer amount) {
            this.amount = amount;
        }

        public Integer getAmount() {
            return this.amount;
        }
    }
    
    // This REST endpoint will be called from the UI. (Passing in the stripe token and the amount to be charged)
    public Charge makePayment(PaymentInfo paymentInfo) throws CardException, RateLimitException, InvalidRequestException, AuthenticationException, APIConnectionException, StripeException  {
        
        // Secret key on the server (java), Publishable key on client (javascript)
        Stripe.apiKey = "sk_test_PeL4gE5qKYMX0vg5D2YLy5nZ"; // Secret key

        try {
            // Get the token submitted by the user
            String tokenId = paymentInfo.getTokenId();

            // Create a charge: this will charge the user's card
            Map<String, Object> chargeParams = new HashMap<String, Object>();
            chargeParams.put("amount", paymentInfo.getAmount()); // Amount in cents
            chargeParams.put("currency", "usd");
            chargeParams.put("source", tokenId);
            chargeParams.put("description", "Payment Sucesss"); //included in email recipts if email sending enabled

            try
            {
                Charge charge =  Charge.create(chargeParams);
                return charge;
                //return required data from the charge object to the UI for display or store required info in your database
                
                // HTTP status code summary
                // 200 - OK	Everything worked as expected.
                // 400 - Bad Request	The request was unacceptable, often due to missing a required parameter.
                // 401 - Unauthorized	No valid API key provided.
                // 402 - Request Failed	The parameters were valid but the request failed.
                // 404 - Not Found	The requested resource doesn't exist.
                // 409 - Conflict	The request conflicts with another request (perhaps due to using the same idempotent key).
                // 429 - Too Many Requests	Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.
                // 500, 502, 503, 504 - Server Errors	Something went wrong on Stripe's end. (These are rare.)
                
                // Errors
                
                // TYPES
                // api_connection_error	Failure to connect to Stripe's API.
                // api_error	API errors cover any other type of problem (e.g., a temporary problem with Stripe's servers) and are extremely uncommon.
                // authentication_error	Failure to properly authenticate yourself in the request.
                // card_error	Card errors are the most common type of error you should expect to handle. They result when the user enters a card that can't be charged for some reason.
                // invalid_request_error	Invalid request errors arise when your request has invalid parameters.
                // rate_limit_error	Too many requests hit the API too quickly.
                
                // CODES
                // invalid_number	The card number is not a valid credit card number.
                // invalid_expiry_month	The card's expiration month is invalid.
                // invalid_expiry_year	The card's expiration year is invalid.
                // invalid_cvc	The card's security code is invalid.
                // incorrect_number	The card number is incorrect.
                // expired_card	The card has expired.
                // incorrect_cvc	The card's security code is incorrect.
                // incorrect_zip	The card's zip code failed validation.
                // card_declined	The card was declined.
                // missing	There is no card on a customer that is being charged.
                // processing_error	An error occurred while processing the card.
            }
            catch (CardException e) {
              // Since it's a decline, CardException will be caught
              System.out.println("Status is: " + e.getCode());
              System.out.println("Message is: " + e.getMessage());
              throw e;
            } catch (RateLimitException e) {
              // Too many requests made to the API too quickly
              throw e;
            } catch (InvalidRequestException e) {
              // Invalid parameters were supplied to Stripe's API
              throw e;
            } catch (AuthenticationException e) {
              // Authentication with Stripe's API failed
              // (maybe you changed API keys recently)
              throw e;
            } catch (APIConnectionException e) {
              // Network communication with Stripe failed
              throw e;
            } catch (StripeException e) {
              // Display a very generic error to the user, and maybe send
              // yourself an email
              throw e;
            }
            catch (Exception ex) {
                // Something else happened, completely unrelated to Stripe
                logger.error("******Exception occured while charging the card***** :" + ex);
                throw ex;
            }
        } catch (Exception ex) {
            logger.error("******Exception occured while making payment***** :" + ex);
            throw ex;
        }
    }

}

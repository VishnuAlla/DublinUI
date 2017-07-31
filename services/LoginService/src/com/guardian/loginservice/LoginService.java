/*Copyright (c) 2016-2017 imaginea.com All Rights Reserved.
 This software is the confidential and proprietary information of imaginea.com You shall not disclose such Confidential Information and shall use it only in accordance
 with the terms of the source code license agreement you entered into with imaginea.com*/
package com.guardian.loginservice;
 
import javax.servlet.http.HttpServletRequest;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.ssl.AllowAllHostnameVerifier;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.apache.http.entity.StringEntity;

import java.util.HashMap;
import java.util.Map;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HTTP;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import com.wavemaker.runtime.security.SecurityService;
// import com.wavemaker.runtime.service.annotations.ExposeToClient;
import com.wavemaker.runtime.service.annotations.HideFromClient;
import com.wavemaker.runtime.security.WMCustomAuthenticationManager;
import com.wavemaker.runtime.security.AuthRequestContext;
import com.wavemaker.runtime.security.WMUser;
import com.wavemaker.runtime.service.annotations.ExposeToClient;

import java.util.Enumeration;
//import com.testingapplication.loginservice.model.*;

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
/**
 * This is a singleton class with all of its public methods exposed to the client via controller.
 * Their return values and parameters will be passed to the client or taken
 * from the client respectively.
 */
@Configuration
//Place the file in your javaservice/src folder...
@PropertySource("classpath:ApplicationConfig.properties")
@ExposeToClient
public class LoginService implements WMCustomAuthenticationManager {
 
    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);
    
    //Create an Environment variable to access the config properties
    @Autowired
    private Environment env;
    
    // Create a trust manager that does not validate certificate chains
    private static final TrustManager[] trustAllCerts = new TrustManager[]{new X509TrustManager() {
        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
            return null;
        }

        public void checkClientTrusted(X509Certificate[] certs, String authType) {
        }

        public void checkServerTrusted(X509Certificate[] certs, String authType) {
        }
    }
    };

 public WMUser authenticate(AuthRequestContext authRequestContext) 
 {

     WMUser user = null;
     try
     {
            //Get SSLContext, which validates all the certificates.
            SSLContext sc = getSslContext();
            logger.info("aurequestContext========>"+authRequestContext);
            HttpServletRequest httpServletRequest = authRequestContext.getHttpServletRequest();
            //Retrieve username and password from authRequest Context.
            String userName = authRequestContext.getUsername();
            String password = authRequestContext.getPassword();
            String roleId=httpServletRequest.getParameter("role");
            logger.info("httpServletRequest=========>"+httpServletRequest);
            // String roleId=authRequestContext.getRole();
            logger.info(userName+"=========>"+password+"====================>role"+roleId);
            
            Enumeration enParams = httpServletRequest.getParameterNames(); 
while(enParams.hasMoreElements()){
 String paramName = (String)enParams.nextElement();
//  logger.info("Attribute Name - "+paramName+", Value - "+httpServletRequest.getParameter(paramName));
}

            // logger.info("welcome"+httpServletRequest.getParameterNames());
            //retrieve the login property from the config file
            String url = env.getProperty("login.url");
        // String url = "http://wavemaker-apps.pramati.com/dev_api_dublin/services/profile/userIdByuserName?name="+userName+"&password="+password;
            //Create a HttpClient using ClientBuilder, with the above SSLContext Created.
            HttpClient client = HttpClientBuilder.create().
                    setSslcontext(sc).
                    build();
            
            //Create a HttpPost variable
            // HttpGet get = new HttpGet(url);
            HttpPost post = new HttpPost(url);
            
            //Set Required Headers
            post.setHeader("Content-Type", "application/json");
            // get.setHeader("Content-Type","application/")

            //Create JSON Object to pass in the request body
            Map<String,String> jsonValues = new HashMap <String,String>();
            jsonValues.put("userId",userName);
            jsonValues.put("password",password);
            jsonValues.put("role",roleId);
            JSONObject json = new JSONObject(jsonValues);
            
            //setting json object to post request.
            StringEntity entity = new StringEntity(json.toString(), "UTF8");
            entity.setContentType(new BasicHeader(HTTP.CONTENT_TYPE, "application/json"));
            logger.info(" entity =========>"+entity);
            post.setEntity(entity);
            
            //ALternate way to pass json object to post requets
            //String userPass = "{\"email\":\"xm@faascape.com\",\"password\":\"totototo\"}";
            // post.setEntity(new StringEntity(userPass));
            
            // logger.info("JSON Logged " + json);

            //Execute the post request
            HttpResponse response = client.execute(post);
            // HttpResponse getresponse=client.execute(get);
            // logger.info("getRsponse " + getresponse);
            //Read the response in the buffer reader
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            
            //Login to fetch the required results form the obtained response.
            StringBuffer result = new StringBuffer();
            String line = "";
            logger.info("rd " + rd);
            while ((line = rd.readLine()) != null) 
            {
                result.append(line);
            }
            
          if(result != null)
            {
                String resp = result.toString();
                
                logger.info("Response Logged" + resp);
               
                JSONObject resJson = new JSONObject(resp);
                logger.info("resJson ========>"+resJson);
                // logger.info("welcoe"+resJson.get("UserId"));
                // var json123 = JSON.parse(resJson);
                // logger.info("json123=========>"+json123);
                // logger.info("json123.content========>"+json123.content);
                // logger.info("checki this value"+resJson.get("content");
                if(resJson  != null)
                {
                    logger.info("reJSON!=null"+resJson);
                    List roles=new ArrayList();
                   // List tenantId= new ArrayList();
                     //logger.info("resJson=======>ProfPic"+resJson.getString("ProfPic"));
                    logger.info("resJson=======>UserID"+resJson.getString("UserId"));
                    logger.info("resJson=======>RoleNAme"+resJson.getString("RoleName"));
                    if((((String)resJson.getString("UserId")) != null && ((String)resJson.getString("UserId")).length() >= 0)
                         && (resJson.getString("RoleName") != null && resJson.getString("RoleName").length() >= 0))
                         {
                            //  logger.info("inside if statement");
                            // String resultrolename=resJson.getString("RoleName");
                            // logger.info("resultrolename"+resultrolename);
                            // if (resultrolename.equals("Client")) 
                            //  {
                            //     logger.info("inside resultrolename client if statenment");
                            //      roles.add("Client");
                            //  }
                            //  else if(resultrolename.equals("Agent"))
                            //  {
                            //      roles.add("Agent");
                            //      logger.info("inside resultrolename Agent if statenment");
                            //  }
                             if ((resJson.getString("RoleName")).equals("Client")) 
                             {
                                // logger.info("inside client if statenment");
                                 roles.add("Client");
                                
                             }
                             else if((resJson.getString("RoleName")).equals("Agent"))
                             {
                                
                                 roles.add("Agent");
                                //  logger.info("inside Agent if statenment");
                             }
                             else if((resJson.getString("RoleName")).equals("BackOfficeOperator"))
                             {
                                 roles.add("BackOfficeOperator");
                                //  logger.info("inside Agent if statenment");
                             }
                             logger.info("Roles========>"+roles);
                            //   user = new WMUser(username, username, roles);
                            //  user = new WMUser(resJson.getString("UserId"), userName, roles);
                            user = new WMUser(resJson.getString("UserId"), userName, "", "", 1, roles);
// logger.info("user=========>"+user);
                            // logger.info("user tenantId=========>"+user);
                         }
                    // JSONObject userJson = resJson.getJSONObject("user");
            //         if(userJson != null)
            //         {
            // 			List roles = new ArrayList();
            		
            //             if((((String)userJson.get("id")) != null && ((String)userJson.get("id")).length() >= 0)
            //              && (userJson.getString("email") != null && userJson.getString("email").length() >= 0))
            //             {
            //                 if (userJson.get("superAdmin").toString().charAt(0) == 'Y') 
            //                 {
            //     					roles.add("admin");
            //     			} 
            //     			else 
            //     			{
            //     					roles.add("user");
            //     			} 
            //                 user = new WMUser(userJson.getString("id"), userJson.getString("email"), roles);
                            
            //             }
            //         }
                }
            }
     }
     catch(KeyManagementException ex) 
     {
         logger.error("KeyManagementException " + ex.getMessage());
     }
     catch(Exception ex) 
     {
         
			logger.error("SSL Context Errors Logged " + ex.getMessage());
	 }
  
     return user;
       
 }

private static SSLContext getSslContext() throws KeyManagementException {
        SSLContext sc = null;
        try {
            sc = SSLContext.getInstance("TLS");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        sc.init(null, trustAllCerts, new java.security.SecureRandom());
        return sc;
    }
    
}

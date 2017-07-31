/*Copyright (c) 2016-2017 imaginea.com All Rights Reserved.
 This software is the confidential and proprietary information of imaginea.com You shall not disclose such Confidential Information and shall use it only in accordance
 with the terms of the source code license agreement you entered into with imaginea.com*/
package com.guardian.sendemail;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import java.io.File;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
//import com.policyacceptance.sendemail.model.*;
import com.wavemaker.runtime.service.annotations.ExposeToClient;

/**
 * This is a singleton  class with all of its public methods exposed to the client via controller.
 * Their return values and parameters will be passed to the client or taken
 * from the client respectively.
 */
@ExposeToClient
public class SendEmail {
   private static final Logger logger = LoggerFactory.getLogger(SendEmail.class);
    public  void sendanemail(String Name, String to, String eSubject,String ebody){
//String  eSubject="Policy has been created";
      final String username = "notifications@pramati.com";//change accordingly
      final String password = "Notification@123";//change accordingly
      // Assuming you are sending email through relay.jangosmtp.net
      String host = "relay.jangosmtp.net";
      Properties props = System.getProperties();
      props.put("mail.smtp.starttls.enable", "true");
      props.put("mail.smtp.host", "smtp.gmail.com");
      props.put("mail.smtp.port", "587");
      props.put("mail.smtp.auth", "true");
      props.put("mail.smtp.starttls.required", "true");
     // Session session = Session.getDefaultInstance(props, null);
      // Get the Session object.
      Session session = Session.getInstance(props,
         new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
               return new PasswordAuthentication(username, password);
            }
         });

        try {
         // Create a default MimeMessage object.
         Message message = new MimeMessage(session);
         message.setRecipients(Message.RecipientType.TO,
            InternetAddress.parse(to));
         // Set Subject: header field
         message.setSubject(eSubject);

         // Create the message part
       BodyPart   messageBodyPart = new MimeBodyPart();
     BodyPart messageBodyPart1 = new MimeBodyPart();

         // Now set the actual message
         messageBodyPart.setText(ebody);

         // Create a multipar message
         Multipart multipart = new MimeMultipart();

         // Set text message part
         multipart.addBodyPart(messageBodyPart);
           message.setContent(multipart);
              message.setContent(ebody, "text/html; charset=utf-8");
            // Send message
            Transport.send(message);
         // Send message
         Transport.send(message);
return;
  
      } catch (MessagingException e) {
         throw new RuntimeException(e);
      }
   }
}

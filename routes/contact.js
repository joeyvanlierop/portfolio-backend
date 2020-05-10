const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", (req, res) => {
  // The email to send the message to
  const recipientEmail = process.env.RECIPIENT_EMAIL;

  // The smtp authentication data
  // Credentials are stores using environment variables
  //  - EMAIL_USER (The smtp username)
  //  - EMAIL_PASS (The smtp password)
  const auth = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  };

  // The data posted from the contact form
  //  - name (The senders name)
  //  - email (The senders email)
  //  - message (The senders message)
  const senderData = {
    name: req.body.data.name,
    email: req.body.data.email,
    message: req.body.data.message,
  };

  // Log the request
  console.log(
    `Received contact request:\n${JSON.stringify(senderData, null, 4)}`
  );

  // Initialize the smtp transport
  var smtpTransport = nodemailer.createTransport({
    service: "iCloud",
    auth: auth,
  });

  // The options for the email being sent to the recipient
  var recipientOptions = {
    from: recipientEmail,
    to: recipientEmail,
    subject: `Portfolio - Contact - ${senderData.name}`,
    text: `${senderData.name} (${senderData.email}) says:\n${senderData.message}`,
  };

  // The options for the email confirmation being sent to the sender
  var senderOptions = {
    from: recipientEmail,
    to: senderData.email,
    subject: `Joey Van Lierop - Contact`,
    text: `Hello ${senderData.name}! Thanks for getting in touch. Below is a copy of the email you sent. If you did not send this, please contact me at ${recipientEmail}.\n${senderData.message}`,
  };

  // Send email to the recipient
  smtpTransport.sendMail(recipientOptions, (error, response) => {
    if (error) {
      console.log(`Error sending email to recipient: ${error}`);
      res.send("Error");
    } else {
      console.log(
        `Successfully sent email to recipient: ${JSON.stringify(
          response,
          null,
          4
        )}`
      );
      res.send("Success");
    }
  });

  // Send email to the sender
  smtpTransport.sendMail(senderOptions, (error, response) => {
    if (error) {
      console.log(`Error sending email to sender: ${error}`);
    } else {
      console.log(
        `Successfully sent email to sender: ${JSON.stringify(
          response,
          null,
          4
        )}`
      );
    }
  });

  // Close the smtp transport
  smtpTransport.close();
});

module.exports = router;

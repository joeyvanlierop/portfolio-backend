const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));

app.get("/", (req, res) => res.send("Hey! Listen!"));

app.post("/send", (req, res) => {
  console.log(`Received send email request. Body: ${JSON.stringify(req.body)}`);
  // var data = req.body;

  // var smtpTransport = nodemailer.createTransport({
  //   service: "Gmail",
  //   port: 465,
  //   auth: {
  //     user: "USERNAME",
  //     pass: "PASSWORD",
  //   },
  // });

  // var mailOptions = {
  //   from: data.email,
  //   to: "name@example.com",
  //   subject: "Portfolio - Contact",
  //   html: `<p>${data.name}</p>
  //         <p>${data.email}</p>
  //         <p>${data.message}</p>`,
  // };

  // smtpTransport.sendMail(mailOptions, (error, response) => {
  //   if (error) {
  //     res.send(error);
  //   } else {
  //     res.send("Success");
  //   }
  //   smtpTransport.close();
  // });

  setTimeout(() => res.send("Success"), 1500);
});

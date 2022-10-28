const bcrypt = require("bcrypt");
const db = require("../../models");
var otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const now = new Date();
const {nodemailerCreateTransport} = require("../emailSend");
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const consumerRegisterController = (req, res, next) => {
  const name = req.body.name;
  const dob = req.body.dob;
  const desc = req.body.desc;
  const expdate = AddMinutesToDate(now, 43200);
  const password = req.body.password;
  const email = req.body.email;
  const username = req.body.username;
  const img = req.file;
  let image;
  if (img) image = "http://localhost:"+process.env.APP_PORT+"/" + img["filename"];
  db.consumer.destroy({
    where:{
      email:email,
      status:0
    }
  })

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(400).send({Status: "Failure",Details: err});
    } else {
      var otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      
      const expiration_time = AddMinutesToDate(now, 2);

      const transporter = nodemailer.createTransport(nodemailerCreateTransport);

      const mailOptions = {
        from: `projectrandom1@outlook.com`,
        to: `${email}`,
        subject: "OTP",
        text: `Use OTP ${otp} to access login`,
    };
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

      //Send Email
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.log("Error -> ", err);
          return res.status(400).send({ Status: "Failure", Details: err });
        } else {
          db.consumer.findOne({
            where:{
              email:email
            }
          }).then(async(consumerFoundorNot)=>{
          // console.log("emailPresentOrNot----->",consumerFoundorNot)
          if(consumerFoundorNot==null){
            db.consumer
              .create({
                name: name,
                dob: dob,
                desc: desc,
                expdate: expdate,
                password: hash,
                email: email,
                username: username,
                image: image,
                timestamps: true,
              })
              .then(async (result) => {
                //Create OTP instance in DB
                const otp_instance = await db.otp2
                  .create({
                    consumerId: result.dataValues["id"],
                    otp: otp,
                    expiration_time: expiration_time,
                  })
                  .then((otpTableCreatedResult) => {
                    console.log("otp table created");
                  })
                  .catch((err2) => {
                    console.log("otp table cannot be created\n Error->", err2);
                  });
              })
              .catch((err) => {
                console.log("catch -> executed user table");
                console.log(err);
                return res.status(400).send({ Status: "Failure", Details: err });
                //return res.send("can not sent otp to the number2");
              });
            return res.status(200).send({ Status: "Success", Details: response });
          }else{
            return res.status(400).send({ Status: "Failure", msg:"Registered User" });
          }
        }).catch((consumerFoundOrNotErr)=>{
          return res.status(400).send({ Status: "Failure", Details: consumerFoundOrNotErr});
        })
        }
      });
    }
  });
};

module.exports = {
  consumerRegisterController, //object
};

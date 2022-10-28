//register.js
const bcrypt = require("bcrypt");
const db = require("../../models");
var otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const {Op} = require("sequelize")

const {nodemailerCreateTransport}=require('../emailSend')
//const multer = require('multer');
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

const userRegisterController = async(req, res, next) => {
  const name = req.body.name;
  const dob = req.body.dob;
  const password = req.body.password;
  const email = req.body.email;
  const username = req.body.username || '';
  const img=req.file
  let image
  if(img)
    image = "http://localhost:3000/" + img["filename"];

  // console.log("image name ---> ",image)
  // console.log("image name ---> ",img)

  const result = await db.User.destroy({
    where:{
      email:email,
      status:0
    }
  })
  console.log(result);
  const findUser=await db.User.findOne({
    where:{
      [Op.or]:[{email:email},{username:username}]
    }
  })
  console.log("user is present or not ------>",findUser)
  if(findUser!==null)
  return res.status(500).send({Status: "Failure",msg:"User already present"});

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({Status: "Failure",Details:err});
      //return res.status(500).send({msg: err,});
    } else {
      var otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const now = new Date();
      const expiration_time =  AddMinutesToDate(now,2);

      const transporter = nodemailer.createTransport(nodemailerCreateTransport);

      const mailOptions = {
        from: `projectrandom1@outlook.com`,
        to: `${email}`,
        subject: "OTP",
        text: `Use OTP ${otp} to access login`,
    }
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

      //Send Email
      transporter.sendMail(mailOptions,async(err, response) => {
        if (err) {
          console.log("Error -> ", err);
          return res.status(400).send({ Status: "Failure", Details: err });
        } else {
          await db.User.create({
            name: name,
            dob: dob,
            password: hash,
            email: email,
            username: username,
            image: image,
            timestamps: true
          })
            .then(async (result) => {
              //Create OTP instance in DB
              await db.otp
                .create({
                  userId: result.dataValues["id"],
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
              return res.status(404).send({Status: "Failure",msg: "OTP incorrect",Details:err});
              //return res.send("can not sent otp to the number2");
            });
          return res.send({ Status: "Success", Details: response });
        }
      });
    }
    //console.log(response);
  });
};

module.exports = {
  userRegisterController, //object
};

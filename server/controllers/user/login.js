const db = require("../../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config()

const userLoginController = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var otp=req.body.otp
  console.log("email inserted by user ", email);
  db.User.findOne({
    where: {
      email: email,
    },
  })
    .then((result) => {
      console.log("result -> ", result);
      const userId = result.dataValues["id"];
      const token = jwt.sign({ userId }, process.env.key, { expiresIn: "7d" });
      const tokenCreate = {
        Status: "Success",
        msg: "Logged in!",
        token,
      };
      if ((!password)&&(otp) &&result.dataValues['status']===false) {
        db.otp
          .findOne({
            where: {
              userId: userId,
            },
          })
          .then((otpresult) => {
            console.log("otpresult ", otpresult);
            //const userId=otpresult.dataValues['userId']
            if (otpresult) {
              let date = new Date();
              if (otpresult.dataValues["expiration_time"] >= date.getTime()) {
                if (otp === otpresult.dataValues["otp"]) {
                  db.User.update({
                    status:1
                  },{
                    where:{
                      id:userId
                    }
                  }).then((userStatusResult)=>{
                    db.otp.destroy({
                    where: {
                      userId: userId,
                    },
                    }).then(()=>{
                      return res.status(200).send(tokenCreate);
                    }).catch((err)=>{
                      return res.status(404).send({Status: "Failure",msg: "OTP incorrect",Details:err});
                      //return res.send('otp error2')
                    })
                    
                  }).catch((err)=>{
                    return res.status(404).send({Status: "Failure",Details:err});
                    //return res.send(`status error`)
                  })
                  
                } else {
                  return res.status(404).send({Status: "Failure",msg: "OTP incorrect"});
                  //return res.status(404).send({msg: "OTP incorrect",});
                }
              } else {
                db.User
                  .destroy({
                    where: {
                      id: userId,
                    },
                  })
                  .then((userDestroyResult) => {
                    console.log("otp table data destroyed because it exceeded the expiry time");
                    return res.status(404).send({Status: "Failure",msg: "OTP incorrect",Details:userDestroyResult});
                    //res.status(404).send(`OTP expired\nRegister again`);
                  })
                  .catch((err) => {
                    console.log("otp table has error\n", err);
                    return res.status(404).send({Status: "Failure",msg: "OTP incorrect",Details:err});
                    //res.status(404).send(`otp error`);
                  });
              }
            }else{
              console.log("OTP was deleted from database as it was expired")
              return res.status(404).send({Status: "Failure",msg: "OTP expired",Details:err});
              //res.status(404).send(`OTP expired`);
            }
          })
          .catch((error) => {
            console.error("Error ->",error);
            return res.status(404).send({Status: "Failure",Details:error});
            // res.status(404).send(`Something went wrong`);
          });
      } else if((password) && (!otp) && result.dataValues['status']===true){
        db.User.findOne({
          where:{
            id:userId
          }
        })
        console.log("password ", result.dataValues["password"]);
        bcrypt.compare(
          password,
          result.dataValues["password"],
          (bErr, bResult) => {
            // wrong password
            console.log("bErr: ", bErr);
            console.log("bResult: ", bResult);

            if (bErr) {
              //throw bErr;
              return res.status(404).send({Status: "Failure",msg: "Username or Password is incorrect",Details:bErr});
              //return res.status(401).send({msg: "Username or password is incorrect1!",});
            }

            if (bResult) {
              return res.status(200).send(tokenCreate);
            }
            return res.status(401).send({Status: "Failure",msg: "Username or password is incorrect"});
            //return res.status(401).send({msg: "Username or password is incorrect2!",});
          }
        );
      }
      else{
        return res.status(404).send({Status: "Failure",msg: "User not registered"});
        //res.send(`User not registered yet`)
      }
    })
    .catch((error) => {
      //res.send(`User does not exist`)
      console.error("Wrong email : ", error);
      return res.status(404).send({Status: "Failure",msg: "User not registered",Details:error});
    });
};
module.exports = {
  userLoginController,
};

const db = require("../../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const consumerLoginController = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var otp = req.body.otp;
  console.log("email inserted by user ", email);
  db.consumer
    .findOne({
      where: {
        email: email,
      },
    })
    .then((result) => {
      console.log("result -> ", result);
      const consumerId = result.dataValues["id"];
      const token2 = jwt.sign({ consumerId }, process.env.key2, {
        expiresIn: "7d",
      });
      console.log("key2 ->",process.env.key2)
      console.log("token2->",token2)
      const tokenCreate = {
        Status: "Success",
        msg: "Logged in!",
        token2,
      };
      if (!password && otp && result.dataValues["status"] === false) {
        db.otp2
          .findOne({
            where: {
              consumerId: consumerId,
            },
          })
          .then((otpresult) => {
            console.log("consumerId ", consumerId);
            console.log("otpresult ", otpresult);
            const date = new Date();
            console.log("date.getTime()->",date.getTime(),"\n")
            if (otpresult) {
              if (otpresult.dataValues["expiration_time"] >= date.getTime()) {
                if (otp === otpresult.dataValues["otp"]) {
                  db.consumer
                    .update(
                      {
                        status: 1,
                      },
                      {
                        where: {
                          id: consumerId,
                        },
                      }
                    )
                    .then((userStatusResult) => {
                      db.otp2
                        .destroy({
                          where: {
                            consumerId: consumerId,
                          },
                        })
                        .then(() => {
                          return res.status(200).send(tokenCreate);
                        })
                        .catch((err) => {
                          return res.status(404).send({Status: "Failure",msg: "OTP incorrect",Details:err});
                          //return res.send("otp error2");
                        });
                    })
                    .catch((err) => {
                      return res.status(404).send({Status: "Failure",msg: "Status error",Details:err});
                    });
                } else {
                  return res.status(404).send({Status: "Failure",msg: "OTP incorrect",Details:err});
                }
              } else {
                db.consumer
                  .destroy({
                    where: {
                      id: consumerId,
                    },
                  })
                  .then((userDestroyResult) => {
                    console.log("otp table data destroyed because it exceeded the expiry time");
                    res.status(404).send({Status:"Failure",Details:userDestroyResult});
                  })
                  .catch((err) => {
                    console.log("otp table has error\n", err);
                    res.status(404).send({Status:"Failure",Details:err});
                  });
              }
            } else {
              console.log("OTP was deleted from database as it was expired");
              res.status(404).send({Status:"Failure",Details:otpresult});
            }
          })
          .catch((error) => {
            console.error("Error ->", error);
            res.status(404).send({Status:"Failure",Details:error});
          });
      } else if (password && !otp && result.dataValues["status"] === true) {
        db.consumer.findOne({
          where: {
            id: consumerId,
          },
        });
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
              return res.status(401).send({Status:"Failure",msg: "Username or password is incorrect!",Details:bErr});
            }

            if (bResult) {
              return res.status(200).send(tokenCreate);
            }
            return res.status(401).send({Status:"Failure",msg: "Username or password is incorrect!"});
          }
        );
      }else if((!password)&&(otp)&& result.dataValues["status"] === true){
        res.status(401).send({Status:"Failed",msg:"Registered User"});
        //res.send(`You are registered user, login with password`);
      } else {
        res.status(401).send({Status:"Failure",msg:"Unvalid user"});
        //res.send(`User not registered yet`);
      }
    })
    .catch((error) => {
      res.status(404).send({Status:"Failure",msg:"User not found"});
      // res.send(`User does not exist`);
      // console.error("Wrong email : ", error);
    });
};
module.exports = {
  consumerLoginController,
};

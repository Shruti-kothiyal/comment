module.exports.registerProcess = (userData , userModel , email , password) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if(err) {
        return res.status(500).send({
            msg: err,
          });
    } else {

    }
  });
};

sendMail(email, r767567 , this.UserCreate);

module.exports.sendEmail = (email , otp , callBackFn) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.user,
          pass: process.env.pass,
        },
      });
  
      const mailOptions = {
        from: `projectrandom1@outlook.com`,
        to: `${email}`,
        subject: "OTP",
        text: `Use OTP ${otp} to access login`,
      };
      transporter.sendMail(mailOptions, callBackFn);
}

module.exports.UserCreate = (err, response) => {
    // Create details object containing the email and otp id
    var details = {
      timestamp: now,
      check: email,
      success: true,
      message: "OTP sent to user",
      //otp_id: otp_instance.id,
    };
    if (err) {
      console.log("Error -> ", err);
      return res.status(400).send({ Status: "Failure", Details: err });
    } else {
      db.User.create({
        name: name,
        dob: dob,
        password: hash,
        email: email,
        username: username,
        image: image,
        timestamps: true,
      })
        .then(async (result) => {
          //Create OTP instance in DB
          const otp_instance = await db.otp
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
          return res.send("can not sent otp to the number2");
        });
      return res.send({ Status: "Success", Details: response });
    }
};



bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    return res.status(500).send({
      msg: err,
    });
  } else {
    const userCreate = {
      name: name,
      dob: dob,
      password: hash,
      email: email,
      username: username,
      image: image,
      timestamps: true,
    };

    processData(userCreate);

    var otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 2);

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

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
      // Create details object containing the email and otp id
      var details = {
        timestamp: now,
        check: email,
        success: true,
        message: "OTP sent to user",
        //otp_id: otp_instance.id,
      };
      if (err) {
        console.log("Error -> ", err);
        return res.status(400).send({ Status: "Failure", Details: err });
      } else {
        db.User.create({
          name: name,
          dob: dob,
          password: hash,
          email: email,
          username: username,
          image: image,
          timestamps: true,
        })
          .then(async (result) => {
            //Create OTP instance in DB
            const otp_instance = await db.otp
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
            return res.send("can not sent otp to the number2");
          });
        return res.send({ Status: "Success", Details: response });
      }
    });
  }
  //console.log(response);
});

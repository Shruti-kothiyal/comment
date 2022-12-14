const db = require("../../models");
const bcrypt = require("bcrypt");

const userUpdateController = (req, res) => {
  const userId = req.userId;
  const email = req.body.email;
  const name = req.body.name;
  const dob = req.body.dob;
  const password = req.body.password;
  const username = req.body.username;
  const img = req.file;
  let image;
  if (img) image = "http://localhost:5000/" + img["filename"];

  const updateUser = {
    email: email,
    name: name,
    dob: dob,
    username: username,
    image: image,
    timestamps: true,
  };

  if (password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({Status: "Failure",Details:err});
        //return res.status(500).send({msg: err,});
      } else {
        updateUser.password = hash;
        db.User.update(updateUser, {
          where: {
            id: userId,
          },
        })
          .then((updateResult) => {
            return res.status(202).send({Status: "Success",Details:updateResult});
            //res.send("Updated the database");
          })
          .catch((error) => {
            console.log(error);
            return res.status(404).send({Status: "Failure",Details:error});
            //res.send("Cannot update");
          });
      }
    });
  } else {
    db.User.update(updateUser, {
      where: {
        id: userId,
      },
    })
      .then((updateResult) => {
        return res.status(202).send({Status: "Success",Details:updateResult});
        //res.send("Updated the database");
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).send({Status: "Failure",Details:error});
        //res.send("Cannot update");
      });
  }
};
module.exports = {
  userUpdateController,
};

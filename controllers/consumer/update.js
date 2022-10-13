const db = require("../../models");
const bcrypt = require("bcrypt");

const consumerUpdateController = (req, res) => {
  const consumerId = req.consumerId;
  const email = req.body.email;
  const name = req.body.name;
  const desc=req.body.desc;
  const expdate=req.body.expdate
  const dob = req.body.dob;
  const password = req.body.password;
  const username = req.body.username;
  const img = req.file;
  let image;
  if (img) image = "http://localhost:5000/" + img["filename"];

  const updateConsumer = {
    name: name,
    desc:desc,
    expdate:expdate,
    email: email,
    dob: dob,
    username: username,
    image: image,
    timestamps: true,
  };

  if (password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({
          msg: err,
        });
      } else {
        updateConsumer.password = hash;
        db.consumer
          .update(
            {
              updateConsumer,
            },
            {
              where: {
                id: consumerId,
              },
            }
          )
          .then((updateResult) => {
            res.send("Updated the database");
          })
          .catch((error) => {
            console.log(error);
            res.send("Cannot update");
            //res.send(error)
          });
      }
    });
  } else {
    db.consumer
      .update(updateConsumer, {
        where: {
          id: consumerId,
        },
      })
      .then((updateResult) => {
        res.send("Updated the database");
      })
      .catch((error) => {
        console.log(error);
        res.send("Cannot update");
        //res.send(error)
      });
  }
};
module.exports = {
  consumerUpdateController,
};

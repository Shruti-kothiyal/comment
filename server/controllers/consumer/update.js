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
  if (img) image = "http://localhost:"+process.env.APP_PORT+"/" + img["filename"];

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
        return res.status(500).send({Status: "Failure",Details:err});
        //return res.status(500).send({msg: err,});
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
  }else {
    db.consumer
      .update(updateConsumer, {
        where: {
          id: consumerId,
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
  consumerUpdateController,
};

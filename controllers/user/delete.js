const db = require("../../models");
const userDeleteController = (req, res) => {
  const userId = req.userId;
  db.User.destroy({
    where: {
      id: userId,
    },
  })
    .then((userDestroyResult) => {
      res.status(202).send("Successfully destroyed user table");
    })
    .catch((err) => {
        console.log(err)
      res.status(404).send("could not destroy user table");
    });
};
module.exports = {
  userDeleteController,
};

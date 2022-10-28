const db = require("../../models");
const userDeleteController = (req, res) => {
  const userId = req.userId;
  db.User.destroy({
    where: {
      id: userId,
    },
  })
  .then((userDestroyResult) => {
    res.status(202).send({Status:"Success",Details:userDestroyResult});
  })
  .catch((err) => {
    console.log(err)
    res.status(404).send({Status:"Failure",Details:err});
  });
};
module.exports = {
  userDeleteController,
};

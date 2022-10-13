const db = require("../../models");
const consumerDeleteController = (req, res) => {
  const consumerId = req.consumerId;
  db.consumer.destroy({
    where: {
      id: consumerId,
    },
  })
    .then((userDestroyResult) => {
      res.status(202).send("Successfully destroyed consumer table");
    })
    .catch((err) => {
        console.log(err)
      res.status(404).send("could not destroy consumer table");
    });
};
module.exports = {
    consumerDeleteController,
};

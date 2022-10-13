const db = require("../../../models");
const userCommmentDelete = (req, res) => {
  const id = req.body.id;
  db.userComment
    .destroy({
      where: {
        id: id,
      },
    })
    .then((deletedComment) => {
      if (!deletedComment) res.send("Id does not exist");
      else res.send("Comment deleted");
    })
    .catch((err) => {
      console.log("Comment cannot be deleted => ", err);
    });
};

module.exports = {
  userCommmentDelete,
};

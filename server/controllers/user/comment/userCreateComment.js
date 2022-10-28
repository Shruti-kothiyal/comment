const db = require("../../../models");

const userCommmentCreate = (req, res) => {
  const userId = req.userId;
  const body = req.body.body;
  let mainCommentId = req.body.mainCommentId;
  const chapterId = req.body.chapterId
  db.consumerSubChap.find
  let userData = {
    userId: userId,
    body: body,
    chapterId: chapterId,
    timestamps: true
  };
  if (mainCommentId) {
    userData.isReply = 1;
    userData.mainCommentId = mainCommentId;
  }

  db.userComment
    .create(userData)
    .then(async (result) => {
      return res.status(202).send({Status: "Success",Details:result});
      // return res.status(202).send(`Updated`);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({Status: "Failure",Details:err});
      // return res.status(404).send(`error -> ${err}`);
    });
};

module.exports = {
  userCommmentCreate,
};

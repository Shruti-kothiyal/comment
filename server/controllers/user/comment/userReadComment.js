const db = require("../../../models");
const dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const userCommmentRead = async (req, res) => {
  const chapterId = req.body.chapterId;
  const userId = req.userId;
  let date_ob = new Date();
  console.log("current date ----> ", date_ob);
  const comments = await db.userComment.findAll({
    where: { chapterId: chapterId, isReply: null },
    include: [
      {
        model: db.User,
        attributes: ["username", "email", "image"],
        as: "user",
      },
      { model: db.userComment, as: "replies" },
    ],
  });
  console.log(comments);
  return res.json(comments);
};

module.exports = {
  userCommmentRead,
};

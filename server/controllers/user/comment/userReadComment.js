const db = require("../../../models");
var moment = require('moment');
const userCommmentRead = async (req, res) => {
  const chapterId = req.body.chapterId;
  const page=req.query.page || 1
  let comments = await db.userComment.findAll({
    where: { 
        chapterId: chapterId, 
        isReply: null,
    },
    limit: 5,
    offset:((page-1)*5),
    order:[["createdAt","DESC"]],
    include: [
        {
            model: db.User,
            attributes: ["username", "email", "image"],
            as: "user",
        },
        { 
            model: db.userComment,
            as: "replies",
            include:[
                {
                    model: db.User,
                    attributes: ["username", "email", "image"],
                    as: "user"
                }
            ]
        },
    ],
    raw: true,
    nest: true
  });
  //console.log(comments);
  const result=comments.map(elem => {
    console.log(elem)
    let date= new Date(elem.createdAt);
    elem.createdAt = moment([date.getFullYear(), date.getMonth(), date.getDate(),date.getHours(), date.getMinutes(), date.getSeconds() ]).fromNow()
    return elem
  })
  return res.json(result);
};

module.exports = {
  userCommmentRead,
};

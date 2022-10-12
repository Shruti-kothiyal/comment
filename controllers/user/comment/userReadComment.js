const db = require("../../../models");
const userCommmentRead=(req,res)=>{
    const userId=req.userId
    db.userComment.findAll({
        where:{
            userId:userId
        }
    }).then((userCommentResult)=>{
        res.json(userCommentResult)
    })
}

module.exports={
    userCommmentRead
}
const db = require("../../models");
const userDisplayController=(req,res)=>{
    const userId=req.userId;
    db.User.findAll({
        where:{
            id:userId
        }
    }).then((emailDisplayResult) => {
        res.json(emailDisplayResult);
    })
}
module.exports= {
    userDisplayController
}
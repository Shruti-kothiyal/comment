const db = require("../../models");
const consumerDisplayController=(req,res)=>{
    const consumerId=req.consumerId;
    console.log(consumerId) 
    db.consumer.findAll({
        where:{
            id:consumerId
        }
    }).then((emailDisplayResult) => {
        console.log(emailDisplayResult)
        res.json(emailDisplayResult);
    })
}
module.exports={consumerDisplayController}
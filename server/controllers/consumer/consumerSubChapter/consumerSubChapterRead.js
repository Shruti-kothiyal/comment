const db = require("../../../models");
const consumerSubChapRead=(req,res)=>{
    const consumerId=req.consumerId
    db.consumerSubChap.findAll({
        where:{
            consumerId:consumerId
        }
    }).then((consumerSubChapResult)=>{
        res.json(consumerSubChapResult)
    }).catch((err)=>{
        console.log("consumerSubChap error ->",err)
        res.send(`consumerSubChap error`)
    })
}
module.exports={
    consumerSubChapRead
}
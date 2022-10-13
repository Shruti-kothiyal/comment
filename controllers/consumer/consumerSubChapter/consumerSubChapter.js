const { v4: uuidv4 } = require('uuid');
const db = require("../../../models");

const consumerSubChap=(req,res)=>{
    const chapterName=req.body.chapterName
    const uuid=uuidv4();
    const consumerId=req.consumerId
    console.log("uuid->",uuid)
    db.consumerSubChap.create({
        chapterName:chapterName,
        uuid:uuid,
        consumerId:consumerId
    }).then(async(result)=>{
        res.send(`Inserted`)
    }).catch((err)=>{
        console.log("consumer sub chap err ->",err)
        res.send(`consumer sub chap err`)
    })
}

module.exports={
    consumerSubChap
}
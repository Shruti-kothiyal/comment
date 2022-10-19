const db = require("../../../models");
const consumerSubChapUpdate=(req,res)=>{
    const id=req.body.id
    const chapterName=req.body.chapterName
    db.consumerSubChap.update({
        chapterName:chapterName
    },{
        where:{
            id:id
        }
    })
    .then((updatedChapter) => {
        if (updatedChapter==0) res.send("Id does not exist");
        else res.send("Updated chapter");
      })
      .catch((err) => {
        console.log("Chapter cannot be updated => ", err);
      });
}
module.exports = {
    consumerSubChapUpdate,
  };
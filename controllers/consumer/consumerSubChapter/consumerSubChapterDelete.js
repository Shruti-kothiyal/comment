const db = require("../../../models");
const consumerSubChapDelete=(req,res)=>{
    const id=req.body.id
    db.consumerSubChap.destroy({
        where:{
            id:id
        }
    })
    .then((deletedChapter) => {
        if (!deletedChapter) res.send("Id does not exist");
        else res.send("Comment deleted");
      })
      .catch((err) => {
        console.log("Comment cannot be deleted => ", err);
      });
}
module.exports = {
    consumerSubChapDelete,
  };
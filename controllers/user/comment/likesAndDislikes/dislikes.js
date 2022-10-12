const db=require("../../../../models")
const userCommentDisikes=async(req,res)=>{
    const id=req.body.id;
    let totDislikes=0;
    const findId={
        id:id
    }

    await db.userComment.findOne({
        where:findId
    }).then((userCommentLikesResult)=>{
        totDislikes=1+userCommentLikesResult.dataValues['dislikes']
    }).catch((err)=>{
        res.send(`no comment`)
        console.log("not able to find such comment",err)
    })

    await db.userComment.update({
        dislikes:totDislikes
    },{
        where:findId
    }).then((updatedLike)=>{
        // res.send("Comment updated" , updatedLike)
        if(updatedLike!=0)
        res.send("Dislike updated");
        else
        res.send("Dislike update error")
    })
    .catch((err)=>{
        console.log("Like cannot be updated => ",err)
    })
}

module.exports={
    userCommentDisikes
}
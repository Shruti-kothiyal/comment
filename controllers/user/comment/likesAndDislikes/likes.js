const db=require("../../../../models")
const userCommentLikes=async(req,res)=>{
    const id=req.body.id;
    let totLikes=0;
    const findId={
        id:id
    }

    await db.userComment.findOne({
        where:findId
    }).then((userCommentLikesResult)=>{
        totLikes=1+userCommentLikesResult.dataValues['likes']
    }).catch((err)=>{
        res.send(`no comment`)
        console.log("not able to find such comment",err)
    })

    await db.userComment.update({
        likes:totLikes
    },{
        where:findId
    }).then((updatedLike)=>{
        // res.send("Comment updated" , updatedLike)
        if(updatedLike!=0)
        res.send("Like updated");
        else
        res.send("Like update error")
    })
    .catch((err)=>{
        console.log("Like cannot be updated => ",err)
    })
}

module.exports={
    userCommentLikes
}
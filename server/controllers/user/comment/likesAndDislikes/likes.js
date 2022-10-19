const db = require("../../../../models");
const userCommentLikes = async (req, res) => {
  const id = req.body.id;
  const userId=req.userId


  db.userComment.findOne({
      where: {
        id: id
      }
    })
    .then((userCommentLikesResult) => {
        console.log("userCommentLikesResult---->",userCommentLikesResult)
        const totLikes=0+userCommentLikesResult['likes']
        const totDislikes=0+userCommentLikesResult['dislikes']
        console.log("total likes----->",totDislikes)
        db.userCommentLikeDislike.findOne({
            where:{
                userId:userId
            }
        }).then((userIdFoundResult)=>{
          if(userIdFoundResult){
          console.log("userIdFoundResult ---------->\n",userIdFoundResult)
            let status=userIdFoundResult['status']
            console.log("userIdFoundResult['status'] ---------->\n",status)
            if(status==null){
                 db.userComment.update(
                    {
                      likes: totLikes+1,
                    },
                    {
                      where: {
                        id:id
                      },
                    }
                )
                 db.userCommentLikeDislike.update({
                    status:1
                },{
                    where:{
                        userId:userId
                    }
                })
                res.send('liked')
            }else if(status==1){
                
                 db.userComment.update({
                      likes: (totLikes-1),
                    },
                    {
                      where: {
                        id:id,
                      }
                    }
                )
                 db.userCommentLikeDislike.update({
                    status:null
                },{
                    where:{
                        userId:userId
                    }
                })
                res.send('like removed')
            }else{
                db.userComment.update({
                    likes: (totLikes+1),
                    dislikes: (totDislikes-1)
                  },
                  {
                    where: {
                      id:id,
                    }
                  }
              )
               db.userCommentLikeDislike.update({
                  status:1
              },{
                  where:{
                      userId:userId
                  }
              })
              res.send('liked')
            }
          }else{
            db.userCommentLikeDislike.create({
              userId:userId,
              commentId:id,
              status:1
          }).then((updateLike)=>{
            console.log('update like ----->',updateLike)
            console.log('totDislikes---->',totDislikes)
              db.userComment.update(
                  {
                    likes: totDislikes+1,
                  },
                  {
                    where: {
                      id:id
                    },
                  }
              ).then((userLikedDislikedCommentResult)=>{
                res.send(`like updated`)
                console.log("user comment update ---------->",userLikedDislikedCommentResult)
              })
          })
          }
            
        }).catch((err)=>{
          console.log("error ->",err)
        })



    })
    .catch((err) => {
      //res.send(`no comment`);
      console.log("not able to find such comment", err);
    });
};

module.exports = {
  userCommentLikes,
};

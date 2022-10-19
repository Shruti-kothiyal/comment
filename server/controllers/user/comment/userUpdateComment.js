const db = require("../../../models");

const userCommmentUpdate=(req,res)=>{
    const body=req.body.body
    const id=req.body.id
    db.userComment.update({
        body:body
    },{
        where:{
            id:id
        }
    })
    .then((updatedComment)=>{
        // res.send("Comment updated" , updatedComment)
        if(updatedComment!=0)
        res.send("Comment updated");
        else
        res.send("Id does not exist")
    })
    .catch((err)=>{
        console.log("Comment cannot be updated => ",err)
    })
}

module.exports = {
    userCommmentUpdate
}; 
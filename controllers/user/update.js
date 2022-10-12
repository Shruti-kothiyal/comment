const db = require("../../models");
const bcrypt = require("bcrypt");

const userUpdateController=(req,res)=>{
    const userId=req.userId
    const email=req.body.email;
    const name = req.body.name;
    const dob = req.body.dob;
    const password = req.body.password;
    const username = req.body.username;
    const img = req.file;
    let image;
    if(img)
     image='http://localhost:5000/'+img['filename']
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send({
                msg: err,
            });
        } 
        else {
            db.User.update({
                email:email,
                name: name,
                dob: dob,
                password: hash,
                username: username,
                image:image,
                timestamps: true
                },{
                    where:{
                            id:userId
                    }
            })
            .then((updateResult)=>{
                res.send("Updated the database");
            })
            .catch((error)=>{
                console.log(error)
                res.send("Cannot update")
                //res.send(error)
            })
        }
    });
}
module.exports = {
    userUpdateController
}; 
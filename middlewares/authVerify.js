var jwt = require('jsonwebtoken');

//middleware
const authverify = (req, res, next) => {
    jwt.verify(req.headers.token, "SECRETKEY", (err, decoded) => {
      if (err) {
        return res.json({ message: "token is not valid" });
      } else {
        //const email = req.body.email; 
        //console.log("email inserted by user in auth: ",email)
        req.userId = decoded.userId;
        console.log("userId by auth ",req.userId)
        next();
      }
    });
};
module.exports = {
    authverify //object
};
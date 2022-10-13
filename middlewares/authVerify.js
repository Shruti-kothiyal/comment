var jwt = require('jsonwebtoken');

//middleware
const authverify = (req, res, next) => {
    jwt.verify(req.headers.token, process.env.key, (err, decoded) => {
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

const authverify2 = (req, res, next) => {
  jwt.verify(req.headers.token2, process.env.key2, (err, decoded) => {
    if (err) {
      return res.json({ message: "token is not valid" });
    } else {
      req.consumerId = decoded.consumerId;
      next();
    }
  });
};
module.exports = {
    authverify, 
    authverify2
};
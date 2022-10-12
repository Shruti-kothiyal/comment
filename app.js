const express = require('express')
const app = express()
app.use(express.json())
require("dotenv").config()



//controller

//user controller
const {userRegisterController}=require('./controllers/user/register')       //destructuring object
const {userLoginController}=require('./controllers/user/login')
const {userUpdateController}=require('./controllers/user/update')
const {userDeleteController}=require('./controllers/user/delete')
const {userDisplayController}=require('./controllers/user/display')

//user comment controller
const {userCommmentCreate}=require('./controllers/user/comment/userCreateComment')
const {userCommmentRead}=require('./controllers/user/comment/userReadComment')
const {userCommmentUpdate}=require('./controllers/user/comment/userUpdateComment')
const {userCommmentDelete}=require('./controllers/user/comment/userDeleteComment')
//user comment controller like & dislike
const {userCommentLikes}=require('./controllers/user/comment/likesAndDislikes/likes')
const {userCommentDisikes}=require('./controllers/user/comment/likesAndDislikes/dislikes')
//const {userCommentUnlike}=require('./controllers/user/comment/likesAndDislikes/unlike')


//middleware
const {authverify}=require('./middlewares/authVerify')
const {imageupload}=require('./middlewares/imageUpload')



//user api
app.use(express.static('images'))
app.post('/api/user/register' ,imageupload.single('image') ,userRegisterController );
app.get('/api/user/login',userLoginController);
app.put('/api/user/update',authverify,imageupload.single('image'),userUpdateController);
app.delete('/api/user/delete',authverify,userDeleteController);
app.get('/api/user/display',authverify,userDisplayController);



//user comment api
app.post('/api/comment/create',authverify,userCommmentCreate)
app.get('/api/comment/read',authverify,userCommmentRead)
app.put('/api/comment/update',authverify,userCommmentUpdate)
app.delete('/api/comment/delete',authverify,userCommmentDelete)
//user comment likes and dislikes api
app.get('/api/comment/like',authverify,userCommentLikes)
app.get('/api/comment/dislike',authverify,userCommentDisikes)



//consumer api
/*
app.post('/api/consumer/register' ,imageupload.single('image') ,consumerRegisterController )
app.get('/api/consumer/login',consumerLoginController)
app.put('/api/consumer/update',authverify,imageupload.single('image'),consumerUpdateController)
app.delete('/api/consumer/delete',authverify,consumerDeleteController)
*/

app.listen(process.env.APP_PORT, () => {
    console.log(`app is listening`)
})
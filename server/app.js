const express = require('express')
const app = express()
app.use(express.json())
var cors = require('cors')
app.use(cors())
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


//consumer controller
const {consumerRegisterController}=require('./controllers/consumer/register')
const {consumerLoginController}=require('./controllers/consumer/login')
const {consumerDeleteController}=require('./controllers/consumer/delete')
const {consumerUpdateController}=require('./controllers/consumer/update')
const {consumerDisplayController}=require('./controllers/consumer/display')
//consumer sub chap controller
const {consumerSubChap}=require('./controllers/consumer/consumerSubChapter/consumerSubChapter')
const {consumerSubChapRead}=require('./controllers/consumer/consumerSubChapter/consumerSubChapterRead')
const {consumerSubChapDelete}=require('./controllers/consumer/consumerSubChapter/consumerSubChapterDelete')
const {consumerSubChapUpdate}=require('./controllers/consumer/consumerSubChapter/consumerSubChapterUpdate')


//middleware
const {authverify,authverify2}=require('./middlewares/authVerify')
const {imageupload}=require('./middlewares/imageUpload')
const consumerValidation=require('./middlewares/consumer.validator')
const userValidation=require('./middlewares/user.validator')
const consumerValidationUpdate=require('./middlewares/consumerUpdate.validator')

//user api
app.use(express.static('images'))
app.post('/api/user/register' ,imageupload.single('image') ,userValidation,userRegisterController );
app.post('/api/user/login',userLoginController);
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
app.post('/api/consumer/register' ,imageupload.single('image'),consumerValidation ,consumerRegisterController )
app.get('/api/consumer/login',consumerLoginController)
app.put('/api/consumer/update',authverify2,imageupload.single('image'),consumerValidationUpdate,consumerUpdateController)
app.delete('/api/consumer/delete',authverify2,consumerDeleteController)
app.get('/api/consumer/display',authverify2,consumerDisplayController);
//consumer subchap api
app.post('/api/consumer/subchap' ,authverify2,consumerSubChap)
app.get('/api/consumer/subchapread' ,authverify2,consumerSubChapRead)
app.put('/api/consumer/subchapupdate' ,authverify2,consumerSubChapUpdate)
app.delete('/api/consumer/subchapdelete' ,authverify2,consumerSubChapDelete)


app.listen(process.env.APP_PORT, () => {
    console.log(`app is listening`)
})
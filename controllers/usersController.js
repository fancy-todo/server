const {User} = require ('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
   static register (req, res, next) {
      let newUser = {
         email : req.body.email,
         password : req.body.password
      }
      User.create(newUser)
         .then(data => {
            res.status(201).json(data)
         })
         .catch (err => {
            next(err)
         })
   }

   static login (req, res, next) {
      User.findOne({
         where : {
            email : req.body.email
         }
      })
         .then(data => {
            if (!data) {
               next({code : 404, message: `email / password is wrong`})
            } 
            else {
               let verified = bcrypt.compareSync(req.body.password, data.password);
               if (!verified) {
                  next({code : 404, message: `email / password is wrong`})
               }
               else {
                  var token = jwt.sign({ id: data.id }, process.env.SECRET);
                  res.status(200).json({token, msg: `login successfully`})
               }
            }
         })
         .catch (err => {
            next(err)
         })
   }

   static gSignIn (req, res, next) {
      let email
      client.verifyIdToken({
         idToken: req.body.token,
         audience: process.env.CLIENT_ID
      })
         .then(data => {
            // console.log(data.payload.email, `heiiiiiiiiiiiiiiiii`);
            email = data.payload.email

            return User.findOne({
               where : {
                  email : email
               }
            })
         })
         .then(user => {
            // console.log(user);
            
            if (!user) {
               console.log(`user belum terdaftar di database`);               
               let newUser = {
                  email,
                  password: process.env.SECRET_PASSWORD
               }

               return User.create(newUser)
            }
            else {
               return user
            }
         })
         .then(logUser => {
            // console.log(logUser, `ini masuk then terakhir`);            
            const token = jwt.sign({ id: logUser.id }, process.env.SECRET);
            res.status(200).json({token})
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = UserController
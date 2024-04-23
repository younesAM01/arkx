const model = require('../models/login');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUsers = async (req,res,next) =>{
    try {
      const posts = await model.getAllUsers();
      if (posts) {
          res.send(posts);
      } else {
          const err = new Error('There are no blogs available');
          err.statusCode = 404;
          throw err;
      }
     } catch (err){
      next(err);
  }
}

const login = async (req,res,next) =>{
    try {
        const { username , password} = req.body;
        const user = await model.checkLogin(req.body);
        if (user) {
            const token = jwt.sign({Id : 1 , username : username , password : password }, process.env.Token, { expiresIn: '1h' });
            res.json({ token : token });
        } else {
            const err = new Error('There are no user with this username/password available');
            err.statusCode = 404;
            throw err;
        }
       } catch (err){
        next(err);
    }
}

const createAccount = async (req,res,next) =>{
    try{
      const user = await model.createAccount(req.body);
      if(user){
        res.send('The user was created successfully');
      }
      else{
        const err = new Error('User account creation failed');
            err.statusCode = 404;
            throw err;
      }
    }catch(err){
      next(err);
    }
}

module.exports = {
    getUsers,
    login,
    createAccount
}
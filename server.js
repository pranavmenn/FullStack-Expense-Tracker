const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
var cors=require('cors');
const Data=require('./models/Data');
const User=require('./models/users');
const UserSession = require('./models/UserSession');
const jwt = require('jsonwebtoken');

const app=express();
const userSession=require("./models/UserSession");
app.use(cors());

/*
//JWt authentication
const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
};

const strategy = new JwtStrategy(opts, (payload, next) => {
  User.forge({ id: payload.id }).fetch().then(res =>{
    next(null,res);
  });
});

passport.use(strategy);
app.use(passport.initialize());
*/




const router=express.Router();
const PORT = 4000;

app.use(bodyParser.json());

const dbRoute= 'mongodb+srv://pranavpramod:Lionsschool123@cluster0-kktea.mongodb.net/test?retryWrites=true';
mongoose.Promise = global.Promise;
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", console.error.bind(console,"Connection Error"));


// Register
/*router.route('/register').post(function(req,res){
  let user = new User(req.body);
  user.save()
    .then(game => {
      res.status(200).json({'user': "User added successfully"});
    }).
    catch(err => { res.status(400).send("Registration failed")});
});*/

//Register
router.route('/register').post(function(req,res){

  const { body } = req;
  const { username, password } = body;
  User.find({
    username: username
  }, (err, previousUsers) =>{
 if ( previousUsers.length > 0){
    return  res.send({
        success: false,
        message: "Error: Account already exists"
      });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if(err){
    return    res.send({
          success: false,
          message: "Error: Server Error"
        });
      }
    return  res.send({
        success: true,
        message: "Signed up"
      });
    });
});

})



//Login
router.route('/login').post(function(req,res){
  const { body } = req;
  const { username, password} = body;

  User.find({ username: username}, (err, users) =>{
    if(err){
      return res.send({
        success: false,
        message: 'Error: server Error'
      });
    }
    if(users.length!=1){
      return res.send({
        success: false,
        message: 'Invalid Login'
      });
    }
    user = users[0];

    if(!user.validPassword(password)){
      return res.send({
        success: false,
        message: 'Invalid Login'
      });
    }
    else{
      const JWTToken = jwt.sign({
        username: user.username,
        _id: user._id
      },
    'secret',
  {
    expiresIn: '2h'
  });

      return res.send({
        success: true,
        message: 'Valid Login',
        token: JWTToken
      })

    }

})


});


//User sessions

router.route('/userSession').post(function(req,res){

  const { body } = req;
  const { username } = body;
  UserSession.find({
  username: username
  }, (err, previousUsers) =>{
 if ( previousUsers.length > 0){
    return  res.send({
        success: false,
        message: "Already logged in"
      });
    }

    const newSession = new UserSession();
    newSession.username = username;
    newSession.save((err, user) => {
      if(err){
    return    res.send({
          success: false,
          message: "Error: Server Error"
        });
      }
    return  res.send({
        success: true,
        message: "Session logged"
      });
    });
});

});

//Check sessions
router.route('/checkSession/:id').get(function (req,res){


UserSession.findOne({username: req.params.id}, function(err, data){
  if(!data){
    return res.send({
      success: false,
      message: 'Session Not found'
    });
  }

  else {
    return res.send({
      success: true,
      message: 'Session Found'
    });
  }
});


});

//Logout
router.route('/logout/:id').get(function(req,res){

  UserSession.findOneAndDelete({username: req.params.id}, function (err,username){

    if (err) res.json(err);
    else{
      return res.send({
        success: true,
        message: 'Logout Successful'
      })
    }
  });
});



/*****************************CRUD*****************************************/
//Create
router.route('/putDataToDB/:id').post(function(req,res){
  let data = new Data();
  data.userId = req.params.id;
  data.date = req.body.date;
  data.sno = req.body.sno;
  data.name = req.body.name;
  data.amount = req.body.amount;
  data.save()
  .then(game => {
   res.status(200).json({ 'expense': 'Expense Added Successfully' });
   }).
   catch(err => { res.status(400).send("Adding failed")});
});



//Read
router.route('/getData/:id').get(function(req,res) {
  Data.find({userId: req.params.id}, function(err,expense){
    if(err){
      console.log(err);
    }
    else{
      res.json(expense);
    }
  });
});


//Delete

router.route('/deleteData/:id').get(function(req,res){

  Data.findByIdAndRemove({_id: req.params.id}, function (err,expense){
    if (err) res.json(err);
    else res.json('Expense deleted')
  });
});


//Update
router.route('/edit/:id').post(function (req,res){
Data.findById(req.params.id, function(err, data){
  if(!data)
    res.status(404).send("data is not found");
  else {

    data.name= req.body.name;
    data.amount=req.body.amount;

    data.save().then(data => {
      res.json("Update complete");
    })
    .catch(err => {
      res.status(400).send("unable to update the database");
    });
  }
});


});
app.use("/api",  router);

app.listen(PORT, () => console.log("Listening on PORT 4000"));

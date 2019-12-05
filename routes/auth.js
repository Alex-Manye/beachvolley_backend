const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Team = require("../Models/Team");

const { 
  isLoggedIn, 
  isNotLoggedIn, 
  validationLoggin,
  validationSignUp
} = require("../helpers/middlewares");

//para conectar React con el backend: ¿?¿?

//Para recibir usuario y saber si estas logueado
router.get('/me', isLoggedIn(), (req, res, next) => {
  req.session.currentUser.password = '*';   
  res.json(req.session.currentUser);   
});


//LOGIN
router.post('/login', isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
  const { teamName, email, password } = req.body;
  console.log(req.body)

  try {
    const team = await Team.findOne({ teamName }) ;
    if (!team) {
      next(createError(404));
    } 
    else if (bcrypt.compareSync(password, team.password)) {
      req.session.currentUser = team;
      res
        .status(200)
        .json(team);
      return 
    } 
    else {
      console.log("here")
      next(createError(401));
    }
  } 
  catch (error) {
    next(error);
  }
},);

//SIGNUP

router.post( "/signup", isNotLoggedIn(), validationSignUp(),
  async (req, res, next) => {
    const {teamName, email, password, playerName1, dniPlayer1, playerName2, dniPlayer2}= req.body;
    console.log(req.body)
    //console.log(req.body)
    try {
        const teamExists = await Team.findOne({teamName}, "teamName");
        const emailExists = await Team.findOne({ email }, "email")
      if (teamExists || emailExists ) return next(createError(400)); 
     else { 
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newTeam = await Team.create({ teamName, email, password: hashPass, playerName1, dniPlayer1, playerName2, dniPlayer2 });
        req.session.currentUser = newTeam;
        res
          .status(200) //OK => Works
          .json(newTeam);
    
    } 
  } catch (error) {
      next(error);
    }
  }
);

//  LOGOUT
router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res
    .status(204) 
    .json({ "message": "User logged out!" });
});

//duplicada? Mirar
router.get('/private', isLoggedIn(), (req, res, next) => {
  res
    .status(200)  // OK
    .json({ message: 'Test - User is logged in'});
});

module.exports = router;



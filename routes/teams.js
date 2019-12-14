const express = require('express');
const router = express.Router();
const Team = require('../Models/Team')
const { isLoggedIn, isNotLoggedIn, validationLoggin} = require("../helpers/middlewares");


/* GET Teams listing. No lo necesito (Para Backlog)*/ 
router.get('/', isLoggedIn(), (req, res, next) =>{
  Team.findById()
  .then(team => {
    res.json(team)
    res.status(200)
  })
  .catch(err => next(err))
});


/* GET one Team  /No lo necesito , tengo auth/me (Para Backlog)*/
router.get('/:teamId', isLoggedIn(), (req, res, next) =>{
  const {teamId} = req.params;
  Team.findById(teamId)
  .then(team => {
    res.json(team)
    res.status(200)
  })
  .catch(err => next(err))
});

/* PUT edit ONE Team  /Para backlog (J)*/
//al ser PUT no pongo: '/:teamId/edit'
router.put('/:teamId', isLoggedIn(), (req, res, next) => {
  //console.log('hola')
  const { teamName, email, password, playerName1, dniPlayer1, playerName2, dniName2} = req.body;
  const team = req.session.currentUser;
  const {id} =req.params;
  
  if (id === team._id) {

  Team.findByIdAndUpdate(team._id, { teamName, email, password, playerName1, dniPlayer1, playerName2,dniName2},{ new:true})
    .then(editedUser => {
      req.session.currentUser = editedUser;
      res.json(editedUser);
      res.status(200)
    }).catch(err => next(err))
  } else {
      next(createError(403))
    }
});


module.exports = router;
const express = require('express');
const router = express.Router();
const Event = require('../Models/Event');
const Team = require('../Models/Team');
const {isLoggedIn, isNotLoggedIn, validationLoggin} = require("../helpers/middlewares");

//GET all events
router.get('/', isLoggedIn(), (req, res, next) =>{
  Event.find()
.then(event => {
  res.json(event)
  res.status(200)
})
.catch(err => next(err))
});

//GET one event
router.get('/:eventId', isLoggedIn(), (req, res, next) =>{
    const {eventId} = req.params;
    Event.findById(eventId)
  .then(event => {
    res.json(event)
    res.status(200)
  })
  .catch(err => next(err))
  });

//POST event /add event 
router.post('/add', isLoggedIn(), async (req, res, next) => {
  const { eventName, location, day, time, description } = req.body;
  try {
    const eventExists = await Event.findOne({eventName});
    if (eventExists) {
      res.json(eventExists)
      res.status(400)
    } else { 
      const teams=[]
      const newEvent = await Event.create({ eventName, teams, location, day, time, description });
    res
      .status(200) 
      .json(newEvent);
    } 
  }
    catch (error) {
      next(error);
  }
});
//PUT event //edit event ///

router.put('/:eventId', isLoggedIn(), (req, res, next) => {
  const {eventId} =req.params;
  Event.findByIdAndUpdate(eventId,req.body,{ new:true})
    .then(editedEvent => { res.json({message:`${editedEvent} is updated successfully.`});
      res.status(200)
    }).catch(err => next(err))
});

//DELETE EVENT 

router.delete('/:eventId', isLoggedIn(), (req, res, next)=>{
  const {eventId} = req.params;

    /*if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }*/
  
    Event.findByIdAndRemove(eventId)
      .then(() => {
        res.json({ message: `Event with ${eventId} is removed successfully.` });
      })
      .catch( err => {
        res.json(err);
      })
  })

//JOIN EVENT

  router.put('/joinOneEvent/:eventId', isLoggedIn(), async (req, res, next) => {
    console.log('in bakend');
    const {eventId} =req.params;
    const {_id} = req.session.currentUser
    await Event.findByIdAndUpdate(eventId, {$push: {teams: _id}},{ new:true})
    
    const NewTeam = await Team.findByIdAndUpdate(_id,{$push: {events: eventId}},{ new:true})

    console.log(NewTeam)
    
    res.json({"message": "You have successfully joined the event"})
      
  });


module.exports = router;

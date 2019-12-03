const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const eventSchema = new Schema({
    eventName: String, 
    teams: [{type: ObjectId, ref:"Team"}],
    location: String,
    day: String, //?
    time: String, //?
    description: String,
    
    },{
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      },
    });

const Event = mongoose.model('Event',eventSchema);
module.exports =  Event;
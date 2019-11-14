const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const userSchema = new Schema({
    teamName: String, 
    owner: [{type: ObjectId, ref:"Team"}],
    location: String,
    day: String, //?
    time: String, //?
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    });

const Event = mongoose.Model('Event',userSchema);
module.export =  Event;
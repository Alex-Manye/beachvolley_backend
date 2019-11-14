const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    teamName: String,
    playerName1: String,
    dniName1: String,
    playerName2: String,
    dniName2: String,
    //tengo que ligarlo al evento....
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    });

const Team = mongoose.Model('Team',userSchema);
module.export =  Team;
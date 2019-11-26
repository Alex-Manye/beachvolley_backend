const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const teamSchema = new Schema({
    teamName: String,
    email: String,
    password: String,
    playerName1: String,
    dniPlayer1: {type: String, unique: true},
    playerName2: String,
    dniPlayer2: String,
    events: [{type: ObjectId, ref:"Event"}],
    },{
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      },
    });
    
const Team = mongoose.model('Team',teamSchema);
module.exports =  Team;
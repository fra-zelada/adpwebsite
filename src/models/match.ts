import mongoose, { Schema, model, connect } from 'mongoose';
import { IMatch, IOponent } from '../interfaces/match';


const oponentSchema = new Schema<IOponent>({
    name:     { type: String, required: true},
    votes:     { type: Number, default:0},
    

},
{
        timestamps: true
});

const matchSchema = new Schema<IMatch>({
    title:     { type: String, required: true},
    subtitle:     { type: String, required: true},
    img:     { type: String, required: true},
    oponents:     [{ type: oponentSchema, required: true}],
    eventCode:     { type: String},
    votes:     { type: Number, default: 0},
    event:  { type: Schema.Types.ObjectId, ref: 'ScheduledEvent' }


},
{
        timestamps: true
});



// 3. Create a Model.
export const Match =  mongoose.models.Match || model<IMatch>('Match', matchSchema)  ;

run().catch(err => console.log(err));

async function run() {
    // 4. Connect to MongoDB
    await connect(process.env.MONGO_CONNECTION || '');
}

export default Match;
import mongoose, { Schema, model, connect, Model } from 'mongoose';
import { IEvent } from '../interfaces/event';


const eventSchema = new Schema<IEvent>({
        company:        { type: String, required: true},
        key:            { type: String, required: true},
        value:          { type: String, required: true},
},
{
        timestamps: true
});

// 3. Create a Model.
export const Event:Model<IEvent> =  mongoose.models.Event || model<IEvent>('Event', eventSchema)  ;

run().catch(err => console.log(err));

async function run() {
    // 4. Connect to MongoDB
    await connect(process.env.MONGO_CONNECTION || '');
}

export default Event;
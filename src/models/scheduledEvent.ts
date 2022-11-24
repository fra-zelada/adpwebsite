import mongoose, { Schema, model, connect, Model } from 'mongoose';
import { IScheduledEvent } from '../interfaces/scheduledEvent';


const scheduledEventSchema = new Schema({
        date:     { type: Date, required: true},
        slug:     { type: String  },
        event:  { type: Schema.Types.ObjectId, ref: 'Event' }
        
},
{
        timestamps: true
});

// 3. Create a Model.
export const ScheduledEvent:Model<IScheduledEvent> =  mongoose.models.ScheduledEvent || model<IScheduledEvent>('ScheduledEvent', scheduledEventSchema)  ;

run().catch(err => console.log(err));

async function run() {
    // 4. Connect to MongoDB
    await connect(process.env.MONGO_CONNECTION || '');
}

export default ScheduledEvent;
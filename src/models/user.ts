import mongoose, { Schema, model, connect, Model } from 'mongoose';
import { IUser } from '../interfaces/user';


const userSchema = new Schema<IUser>({
        email:     { type: String, required: true},
        password:     { type: String, required: true},
        name:     { type: String },
        role:     { type: String, required: true },
        avatar:     { type: String },
},
{
        timestamps: true
});

// 3. Create a Model.
export const User:Model<IUser> =  mongoose.models.User || model<IUser>('User', userSchema)  ;
// export const        User:Model<IUser> =  mongoose.models.User || model('User', userSchema);
run().catch(err => console.log(err));

async function run() {
    // 4. Connect to MongoDB
    await connect(process.env.MONGO_CONNECTION || '');
}

export default User;
import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    title: { type: String,  required: true, uppercase: true },
    shortdes: { type: String, required: true },
    img: { type: String, required: true },
    user_id:{type:mongoose.Schema.Types.ObjectId, required:true}


}, {timestamps: true,versionKey: false});

export default mongoose.model('hero', DataSchema);
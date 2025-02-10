import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    title: {type: String,unique: true,required:true,uppercase:true},
    des: {type: String,unique:true,required: true},
    img: {type: String,required: true}

}, {timestamps: true,versionKey: false});

export default mongoose.model('blogs', DataSchema);
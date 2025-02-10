import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    name: {type: String,unique: true,required:true,uppercase:true},
    designation: {type: String,unique:true,required: true},
    img: {type: String,required: true}

}, {timestamps: true,versionKey: false});

export default mongoose.model('teams', DataSchema);
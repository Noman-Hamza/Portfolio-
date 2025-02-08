import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    email: {type: String,unique: true,required:true,lowercase:true},
    password: {type: String,required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    img: {type: String},

}, {timestamps: true,versionKey: false});

export default mongoose.model('users', DataSchema);
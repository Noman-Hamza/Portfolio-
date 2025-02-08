import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    service: {type: String,unique: true,required:true,uppercase:true},
    des: {type: String,unique:true,required: true},
    img: {type: String,required: true},
    user_id:{type:mongoose.Schema.Types.ObjectId, required:true}

}, {timestamps: true,versionKey: false});

export default mongoose.model('services', DataSchema);
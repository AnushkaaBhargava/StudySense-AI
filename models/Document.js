import mongoose from "mongoose";

const chunkSchema= new mongoose.Schema({
    chunkId:{
        type:Number,
        required:true
    },

    text:{
        type:String,
        required:true
    },

    embedding:{
        type:[Number],
        default:[]
    }
});

const documentSchema=new mongoose.Schema({

    fileName:{
        type:String,
        required:true
    },

    summary:{
        type:String,
        default:""
    },

    chunks:[chunkSchema]
},{
    timestamps:true
});

export default mongoose.model("Document",documentSchema);
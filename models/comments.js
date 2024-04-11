import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    
    chargerId: {
        type: Number,
        required: true,
        ref: 'Maps' // have a Charger model
      },
    userName: {
        type:String,
        default:'unKnow'
        
      },
    commentText: {
        type: String,
        required: true
      },
    useruuid:{
     type: String,
     default: '',
      },
    createdAt: {
      type: Date,
      default: Date.now
      }


});

export const Comment = mongoose.model("Comment", CommentSchema);
import mongoose from "mongoose"


const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
         
    },
    priority: {
        type: String,
        required: true,
        
    }
    ,
    deadline: {
        type: String,
        required: true
    },

    desc: {
        type: String,
          required:true,
    }, status: {
        type: String,
        default:"Partial Completed"
    }

}, { timestamps: true })

export default mongoose.model("Task", TaskSchema)
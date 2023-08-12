const mongoose=require('mongoose');

const TaskSchema=mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date
    },
    createdBy:{
        type:String
    },
    description:{
        type:String,
    },
    startDate:{
        type:Date,
    },
    dueDate:{
        type:Date,
    },
    assignedTo:{
        type:String,
    }
})

const Task=module.exports=mongoose.model('Tasks', TaskSchema);
const express=require('express');
const router=express.Router();
const Task=require('../models/tasks');

router.get('/tasks',(req,res,next)=>{
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize);
    let status = req.query.status;

    let findQuery = Task.find((status==undefined)?{}:{status:status}).sort({ createdDate: -1 });
    
    if(pageNo && pageSize){
      findQuery.skip((pageNo - 1) * pageSize).limit(pageSize)
    }

    findQuery.exec((err, documents) => {
      if (err) {
        res.status(500).send({msg: 'unable to fetch data'});
      }
      res.json(documents);
    })
})


router.post('/add',(req,res,next)=>{
    //adding a task

    let newTask=new Task({
      taskName : req.body.taskName,
      status : req.body.status,
      createdDate : req.body.createdDate,
      createdBy : req.body.createdBy,
      description : req.body.description ? req.body.description : null,
      startDate : req.body.startDate ? req.body.startDate : null,
      dueDate : req.body.dueDate ? req.body.dueDate : null,
      assignedTo : req.body.assignedTo ? req.body.assignedTo : null
    })

    newTask.save((err,Task)=>{
        if(err){
            res.status(500).send({msg: 'failed to add task'});
        }
        else{
            res.json({msg: 'task added successfully'});
        }
    })
})

router.delete('/delete',(req,res,next)=>{
  let pageNo = req.query.taskId;
    
    Task.remove({_id:pageNo},function(err,result){
        if(err){
          res.status(500).send({msg: 'failed to remove task'});
        }
        else{
            res.json('task removed successfully');
        }
    })
})

router.post('/updateTaskStatus',(req,res,next)=>{
  const updateTask = {
    status : req.body.status
  };
  Task.updateOne({_id: req.body.taskId}, updateTask).then(
    () => {
      res.status(201).json({
        message: 'task updated successfully'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});




  
module.exports = router;
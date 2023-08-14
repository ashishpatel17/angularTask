import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from 'app/services/task-service.service';



@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  defaultUser:String = "Ashish Patel";
  taskForm: FormGroup;
  validationMessage:any = {};
  errorMessage:any;
  

  constructor(  private fb: FormBuilder , private taskServiceService: TaskServiceService) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: ['', [Validators.required]],
      startDate: [''],
      dueDate: [''],
      assignedTo: [''],
      createdDate:[new Date()],
      createdBy:[this.defaultUser],
      status:['ideal']
    });
  }
  
  @Output() formEvent: EventEmitter<string> = new EventEmitter<string>();


  ngOnInit(): void {
  }

  closeForm(){
    this.formEvent.emit("openCloseForm");
  }

  onSubmit(){
    if(this.taskForm.status == "INVALID"){
      for(const obj in  this.taskForm.controls){
        if(this.taskForm.controls[obj].status == "INVALID"){
          this.validationMessage[obj] = obj + " cannot be empty";
        }else{
          this.validationMessage[obj] = undefined;
        }
      }
    }else{
      this.validationMessage = {};
      let newTaskData = {
        taskName: this.taskForm.value.taskName,
        description: this.taskForm.value.description,
        startDate : this.taskForm.value.startDate,
        dueDate : this.taskForm.value.dueDate,
        assignedTo : this.taskForm.value.assignedTo,
        createdDate : this.taskForm.value.createdDate,
        createdBy : this.taskForm.value.createdBy,
        status : "ideal"
      }
      this.taskServiceService.setLoading(true);
      this.taskServiceService.createTask(newTaskData).subscribe(data => {
        this.taskServiceService.setLoading(false);
        this.errorMessage = undefined;
        this.formEvent.emit(JSON.stringify({"formData":newTaskData}));
        this.taskForm.reset();
        this.closeForm();
      }, error => {
        this.taskServiceService.setLoading(false);
        this.errorMessage = "Error while creating new task";
      })
    }
  }
}

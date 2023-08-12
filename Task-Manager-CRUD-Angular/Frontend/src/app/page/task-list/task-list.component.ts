import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../../services/task-service.service'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskList:any = [];
  isError:any = false;
  savedQuery:any ={};
  @Input() formData : any;

  constructor(
    private taskServiceService: TaskServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  ngOnChanges(changes:any) {
    if (changes.formData && changes.formData.currentValue) {
      let newData = changes.formData.currentValue;
      this.taskList = [newData,...this.taskList];
    }
  }

  onFilterChange(event:any){
    if(event.target.value != "all"){
      this.savedQuery = {status : event.target.value}; 
    }else{
      this.savedQuery = {};
    }
    this.getTaskList(this.savedQuery);
    
  }

  catchCardEvent(event:any){
    if(event == "refresh"){
      this.getTaskList(this.savedQuery);
    }
  }

  getTaskList = (query:any={}) => {
    this.taskServiceService.setLoading(true);
    this.taskServiceService.getAllTasks(query).subscribe(data => {
      this.taskServiceService.setLoading(false);
      this.taskList = data;
      this.isError = false;
    }, error => {
      this.taskServiceService.setLoading(false);
      this.isError = true;
    })
  }

}

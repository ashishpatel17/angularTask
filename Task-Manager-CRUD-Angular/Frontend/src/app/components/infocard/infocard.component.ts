import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskServiceService } from 'app/services/task-service.service';

@Component({
  selector: 'app-infocard',
  templateUrl: './infocard.component.html',
  styleUrls: ['./infocard.component.css']
})
export class InfocardComponent implements OnInit {

  @Input() taskData : any;
  @Output() infoCardEvent: EventEmitter<string> = new EventEmitter<string>();


  constructor(private taskServiceService: TaskServiceService) { }

  ngOnInit(): void {
  }

  onStatusChange(event: any){
    let formData = {
      taskId : this.taskData._id,
      status:event.target.value
    }
    this.taskServiceService.updateStatus(formData).subscribe(data => {
      this.infoCardEvent.emit("refresh");
    }, error => {
      
    })
  }

  deleteTask(event: any){
    this.taskServiceService.deleteTask(this.taskData._id).subscribe(data => {
      this.infoCardEvent.emit("refresh");
    }, error => {
      
    })
  }

}

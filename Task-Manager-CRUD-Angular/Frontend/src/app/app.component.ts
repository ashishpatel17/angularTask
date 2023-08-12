import { Component } from '@angular/core';
import { TaskServiceService } from './services/task-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  hiddenClass:any = "hidden";
  formResponsedata:any;

  constructor(public taskServiceService: TaskServiceService) { }

  ngOnInit(): void {
  }

  taskFormEvent(event : any){
    if(event == "openCloseForm"){
      if(this.hiddenClass=="hidden"){
        this.hiddenClass = false;
      }else{
        this.hiddenClass = "hidden";
      }
    }else if(event.indexOf("formData")>-1){
      event = JSON.parse(event);
      this.formResponsedata = event.formData;
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})

export class TaskServiceService {

 isLoading:boolean=false;

  constructor(private http: HttpClient) { }

    getLoading():boolean{
      return this.isLoading
    }

    setLoading(load:boolean){
      this.isLoading = load;
    }

    createTask(data : any): Observable<any> {
      return this.http.post(`${baseUrl}/add`, data);
    }

    updateStatus(data : any): Observable<any> {
      return this.http.post(`${baseUrl}/updateTaskStatus`, data);
    }

    deleteTask(id : any): Observable<any> {
      let params = new HttpParams().set("taskId", id);
      const options = { params: params};
      return this.http.delete(`${baseUrl}/delete`, options);
    }

    getAllTasks(query:any={}): Observable<any> {
      let params = new HttpParams();
      
      for(let ind in query){
        params=params.set(ind, query[ind]);
      }

      const options = { params: params};
      return this.http.get(`${baseUrl}/tasks`,options);
    }

}

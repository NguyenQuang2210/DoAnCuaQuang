import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverserviceService {

  constructor(private http:HttpClient) { }
  
  // các phương thức khác
  getDriverList():Observable<Array<Driver>>{
     return this.http.get<Array<Driver>>('http://127.0.0.1:8000/driver/');
  }
  postDriver(data:any):Observable<any>{
    return this.http.post<any>('http://127.0.0.1:8000/create_driver/',data);
 }
 getDriverbycode(code:any):Observable<any>{
  return this.http.get<any>(`http://127.0.0.1:8000/driver/`+code);
 }
  deleteDriver(id:number):Observable<any>{
  return this.http.delete<any>(`http://127.0.0.1:8000/delete_driver/${id}`);
 }
 updateDriver(data:any,id:number):Observable<any>{
  return this.http.post<any>('http://127.0.0.1:8000/update_driver/'+id,data);
}
}

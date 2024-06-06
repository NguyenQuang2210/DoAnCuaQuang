import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Buses } from '../models/buses';

@Injectable({
  providedIn: 'root'
})
export class BusesserviceService {


  constructor(private http:HttpClient) { }
  
  // các phương thức khác
  getBusesList():Observable<Array<Buses>>{
     return this.http.get<Array<Buses>>('http://127.0.0.1:8000/buses/');
  }
  postBuses(data:any):Observable<any>{
    return this.http.post<any>('http://127.0.0.1:8000/create_buses/',data);
 }
  deleteBuses(id:number):Observable<any>{
  return this.http.delete<any>(`http://127.0.0.1:8000/delete_buses/${id}`);
 }

  updateBuses(data:any,id:number):Observable<any>{
  return this.http.post<any>('http://127.0.0.1:8000/update_buses/'+id,data);
 }
  getbusesBycode(code:any):Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/buses/`+code);
  }
  checkbusestoday():Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/getbusestoday/`);
  }
  searchbuses(id:number,date:string):Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/searchbuses/?id_tour=${id}&departure_date=${date}`);
  }
}

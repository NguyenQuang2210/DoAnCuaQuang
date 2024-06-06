import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleServiceService {

  constructor(private http:HttpClient) { }
  
  // các phương thức khác
  getVehicleList():Observable<Array<Vehicle>>{
     return this.http.get<Array<Vehicle>>('http://127.0.0.1:8000/vehicle/');
  }
  postVehicle(data:any):Observable<any>{
    return this.http.post<any>('http://127.0.0.1:8000/create_vehicle/',data);
 }
  updateVehicle(data:any,id:number):Observable<any>{
  return this.http.post<any>('http://127.0.0.1:8000/update_vehicle/'+id,data);
  }

  getVehiclebycode(code:any):Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/vehicle/`+code);
   }

  deleteVehicle(id:number):Observable<any>{
  return this.http.delete<any>(`http://127.0.0.1:8000/delete_vehicle/${id}`);
 }
}

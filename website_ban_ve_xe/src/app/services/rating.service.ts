import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rate } from '../models/rate';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http:HttpClient) { }
  
  // các phương thức khác
  getRateList():Observable<Array<Rate>>{
     return this.http.get<Array<Rate>>('http://127.0.0.1:8000/rating/');
  }
  postRate(data:any):Observable<any>{
    return this.http.post<any>('http://127.0.0.1:8000/create_rating/',data);
 }
  deleteRate(id:number):Observable<any>{
  return this.http.delete<any>(`http://127.0.0.1:8000/delete_rating/${id}`);
 }
}
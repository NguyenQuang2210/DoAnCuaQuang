import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeatDetail } from '../models/seatdetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatdetailService {

  constructor(private http:HttpClient) { }

  getseatdetailbyidbuses(id:number):Observable<Array<SeatDetail>>{
    return this.http.get<Array<SeatDetail>>('http://127.0.0.1:8000/seatdetail/'+id);
 }
  getavaiableseat(id:number):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/empty_seats/'+id);
  }
}

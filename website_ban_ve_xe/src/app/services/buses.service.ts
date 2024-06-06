import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  constructor(private http:HttpClient) { }
  searchbuses(id:number,date:string):Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/clientsearchbuses/?id_tour=${id}&departure_date=${date}`);
  }
}

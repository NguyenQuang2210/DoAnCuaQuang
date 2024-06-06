import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketserviceService {

  constructor(private http:HttpClient) { }

  getTicketList(id:number):Observable<Array<Ticket>>{
    return this.http.get<Array<Ticket>>('http://127.0.0.1:8000/getticketlist/'+id);
 }
 postTicket(data:any):Observable<any>{
   return this.http.post<any>('http://127.0.0.1:8000/create_ticket/',data);
}
 deleteTicket(id:number):Observable<any>{
 return this.http.delete<any>(`http://127.0.0.1:8000/delete_ticket/${id}`);
}

 updateTicket(data:any,id:number):Observable<any>{
 return this.http.post<any>('http://127.0.0.1:8000/update_ticket/'+id,data);
}
 getTicketBycode(code:any):Observable<any>{
   return this.http.get<any>(`http://127.0.0.1:8000/ticket/`+code);
 }

 checkbusestoday():Observable<any>{
   return this.http.get<any>(`http://127.0.0.1:8000/getbusestoday/`);
 }
 searchticket(id: number,date:string):Observable<any>{
   return this.http.get<any>(`http://127.0.0.1:8000/searchticket/${id}?phone=${date}`);
 }
 getTicketName(id:number):Observable<any>{
   return this.http.get<any>(`http://127.0.0.1:8000/ticket_name/${id}`);
 }
 createclientticket(data:any):Observable<any>{
  return this.http.post<any>('http://127.0.0.1:8000/create_client_ticket/',data);
 }

 getTicketById(id: number): Observable<any> {
  return this.http.get<any>('http://127.0.0.1:8000/ticket/'+id);
  }
  getTicketByListId(ids: number[]): Observable<any> {
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('ids', id.toString());
    });
    return this.http.get<any>('http://127.0.0.1:8000/tickets/', { params });
  }
}

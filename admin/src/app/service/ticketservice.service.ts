import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Ticket } from '../models/ticket';
import { error } from 'highcharts';
import { Order } from '../models/order';

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
  getOrderListHttp():Observable<any>{
  return this.http.get<any>('http://127.0.0.1:8000/get_order/');
  }

  getOrderList():Observable<any>{
    return this.getOrderListHttp().pipe(
      map(data=>{
        return data.tickets.map((order:any)=>{
          const o = new Order();
          o.setRate(order);
          return o
        })
      }),
      catchError(er=>{
        return of(null);
      })
    );
  }
  
  searchOrderHttp(id_tour:number,date:string,phone:string):Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/searchorder/?id_tour=${id_tour}&phone=${phone}&date=${date}`);
  }
 searchOrder(id_tour:number,date:string,phone:string):Observable<any>{
    return this.searchOrderHttp(id_tour,date,phone).pipe(
      map(data=>{
        return data.tickets.map((order:any)=>{
          const o = new Order();
          o.setRate(order);
          return o
        })
      }),
      catchError(er=>{
        return of(null);
      })
    );
  }

  denyOrder(id:number,message:string):Observable<any>{
    const params = new HttpParams().set('message_text', message);
    return this.http.get<any>(`http://127.0.0.1:8000/deny_order/${id}`,{params});
  }
  getOrderbyid(id:number):Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/get_order/${id}`);
  }
  successOrder(id: number, message: string): Observable<any> {
    const params = new HttpParams().set('message_text', message);
    return this.http.get<any>(`http://127.0.0.1:8000/access_order/${id}`, { params });
  }
  
  receivePayment(id:number):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/receive_payment/'+id)
  }

  getOnlineTicket():Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/onlinetickets/')
  }
  getOfflineTicket():Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/offlinetickets/')
  }
  getrevenuebyyeah(yeah:number):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/get_revenue/'+yeah)
  }
  getnameseatbyTicketid(id:number):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/seat_name_by_ticket_id/'+id)
  }
  getchartbydate(fromDate :string,toDate:string):Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/get_chart_from_to_date/?from_date='+fromDate+'&to_date='+toDate)
  }
}
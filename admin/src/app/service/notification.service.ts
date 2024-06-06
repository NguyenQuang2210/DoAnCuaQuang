import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  getNotificationList():Observable<Array<Notification>>{
    return this.http.get<Array<Notification>>('http://127.0.0.1:8000/notification/');
 }

}

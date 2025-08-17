import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://webapp-api.runasp.net/api/User/' ;

  constructor(private http: HttpClient) { }


  registerUser(user: any): Observable<any> {
      return this.http.post(this.apiUrl+"register", user);
    }

  loginUser(user: any): Observable<any> {
        return this.http.post(this.apiUrl+"loginUser", user);
    }

  sendSummaryEmail(payload: any): Observable<any> {
  return this.http.post(this.apiUrl + "sendSummary", payload);
}



}


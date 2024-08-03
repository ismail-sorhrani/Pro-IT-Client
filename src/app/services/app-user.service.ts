import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appUser } from '../models/model/model.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  private baseUrl = 'http://localhost:8082/users';

  constructor(private http:HttpClient) { }
  getAllUsers():Observable<Array<appUser>>{
    return this.http.get<Array<appUser>>("http://localhost:8082/users");

  }
  

  getAllUsersWithRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/role/${role}`);
}

}

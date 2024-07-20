import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Aeroport} from "../models/model/model.module";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AeroportService {

  constructor(private http:HttpClient) { }

  getAllAeroports():Observable<Array<Aeroport>>{
    return this.http.get<Array<Aeroport>>("http://localhost:8082/admin/aeroports");
  }
}

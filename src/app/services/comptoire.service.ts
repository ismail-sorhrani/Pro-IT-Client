import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ComptoireDTO} from "../models/model/model.module";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComptoireService {

  constructor(private http:HttpClient) {

  }
  getAllComptoires(): Observable<ComptoireDTO[]> {
    return this.http.get<ComptoireDTO[]>("http://localhost:8082/admin/comptoiires");
  }
}

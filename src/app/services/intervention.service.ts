import { Injectable } from '@angular/core';
import {Intervention} from "../models/model/model.module";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthServiceService} from "./auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class InterventionService {


  private baseUrl1 = 'http://localhost:8082/technicien';
  private baseUrl2 = 'http://localhost:8082/helpdesk';

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  getAllInterventions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.baseUrl1}/interventionns`);
  }
  getAllInterventionsHelp(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.baseUrl2}/interventions`);
  }


  addIntervention(intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: intervention.status,
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: intervention.heureFin,
      compagnie: intervention.compagnie,
      appUser: intervention.appUser,
      comptoire: intervention.comptoire,
      equipment: intervention.equipment,
      solution: intervention.solution,
      probleme: intervention.probleme,
      aeroport: intervention.aeroport
    };
    return this.http.post<Intervention>(`${this.baseUrl1}/intervention`, interventionData);
  }

  addInterventionHelp(intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: intervention.status,
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: intervention.heureFin,
      compagnie: intervention.compagnie,
      appUser: intervention.appUser,
      comptoire: intervention.comptoire,
      equipment: intervention.equipment,
      solution: intervention.solution,
      probleme: intervention.probleme,
      aeroport: intervention.aeroport
    };
    console.log("service ", interventionData);
    return this.http.post<Intervention>(`${this.baseUrl2}/intervention`, interventionData);
  }

  updateIntervention(id: number, intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: intervention.status,
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: intervention.heureFin,
      compagnie: intervention.compagnie,
      appUser: intervention.appUser,
      comptoire: intervention.comptoire,
      equipment: intervention.equipment,
      solution: intervention.solution,
      probleme: intervention.probleme,
      aeroport: intervention.aeroport
    };
    return this.http.post<Intervention>(`${this.baseUrl1}/intervention/update`, interventionData);
  }

  updateInterventionHelp(id: number, intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: intervention.status,
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: intervention.heureFin,
      compagnie: intervention.compagnie,
      appUser: intervention.appUser,
      comptoire: intervention.comptoire,
      equipment: intervention.equipment,
      solution: intervention.solution,
      probleme: intervention.probleme,
      aeroport: intervention.aeroport
    };
    return this.http.post<Intervention>(`${this.baseUrl2}/intervention/update`, interventionData);
  }


  endIntervention(intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: 'FERMER', // Set status to 'FERMER'
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: new Date(), // Set heureFin to current time
      compagnie: parseInt(intervention.compagnie.toString(), 10), // Ensure compagnie is a number
      appUser: parseInt(intervention.appUser.toString(), 10), // Ensure appUser is a number
      comptoire: parseInt(intervention.comptoire.toString(), 10), // Ensure comptoire is a number
      equipment: parseInt(intervention.equipment.toString(), 10), // Ensure equipment is a number
      solution: parseInt(intervention.solution.toString(), 10), // Ensure solution is a number
      probleme: parseInt(intervention.probleme.toString(), 10), // Ensure probleme is a number
      aeroport: parseInt(intervention.aeroport.toString(), 10) // Ensure aeroport is a number
    };

    console.log('Sending intervention data to end:', interventionData);

    return this.http.post<Intervention>(`${this.baseUrl1}/intervention/fin`, interventionData);
  }

  endInterventionHelp(intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: 'FERMER', // Set status to 'FERMER'
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: new Date(), // Set heureFin to current time
      compagnie: parseInt(intervention.compagnie.toString(), 10), // Ensure compagnie is a number
      appUser: parseInt(intervention.appUser.toString(), 10), // Ensure appUser is a number
      comptoire: parseInt(intervention.comptoire.toString(), 10), // Ensure comptoire is a number
      equipment: parseInt(intervention.equipment.toString(), 10), // Ensure equipment is a number
      solution: parseInt(intervention.solution.toString(), 10), // Ensure solution is a number
      probleme: parseInt(intervention.probleme.toString(), 10), // Ensure probleme is a number
      aeroport: parseInt(intervention.aeroport.toString(), 10) // Ensure aeroport is a number
    };

    console.log('Sending intervention data to end:', interventionData);

    return this.http.post<Intervention>(`${this.baseUrl2}/intervention/fin`, interventionData);
  }



}

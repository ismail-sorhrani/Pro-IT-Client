import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Intervention} from "../models/model/model.module";
import {InterventionService} from "../services/intervention.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-intervention-historique-aeroport',
  templateUrl: './intervention-historique-aeroport.component.html',
  styleUrl: './intervention-historique-aeroport.component.css'
})
export class InterventionHistoriqueAeroportComponent implements OnInit{
  displayedColumns: string[] = ['id', 'status', 'date', 'heureDebut', 'heureFin','duration', 'compagnie', 'appUser', 'comptoire', 'equipment', 'solution', 'probleme', 'aeroport'];

  @ViewChild('paginatorFermer') paginatorFermer!: MatPaginator;
  public dataSourceFermer: MatTableDataSource<Intervention>;
  isTechnicien: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private interventionService: InterventionService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private authService: AuthServiceService
  ) {
    this.dataSourceFermer = new MatTableDataSource<Intervention>();
  }
  ngOnInit(): void {
    this.isTechnicien = this.authService.roles.includes('TECHNICIEN');
    this.isAdmin = this.authService.roles.includes('ADMIN');
    this.fetchInterventions();
  }

  fetchInterventions(): void {
    if (this.isTechnicien) {
      this.fetchInterventionsTech();
    }
    else {
      this.fetchInterventionsHelp();
    }
  }
  fetchInterventionsTech(): void {
    this.interventionService.getAllInterventionsByAeroport(this.authService.username).subscribe({
      next: data => {
        data.forEach(intervention => {
          if (intervention.heureDebut) {
            intervention.heureDebut = new Date('1970-01-01T' + intervention.heureDebut + 'Z');
          }
          if (intervention.heureFin) {
            intervention.heureFin = new Date('1970-01-01T' + intervention.heureFin + 'Z');
          }
          if (intervention.status === 'FERMER' && intervention.heureDebut && intervention.heureFin) {
            const duration = new Date(intervention.heureFin.getTime() - intervention.heureDebut.getTime());
            intervention.duration = duration.getUTCHours() + 'h ' + duration.getUTCMinutes() + 'm';
          } else {
            intervention.duration = 'N/A';
          }
        });
        console.log("daata : ",data);

        this.dataSourceFermer.data = data.filter(
          intervention => intervention.status === 'FERMER'
        );
        this.dataSourceFermer.paginator = this.paginatorFermer;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Error fetching interventions:', err);
      }
    });
  }

  fetchInterventionsHelp(): void {
    this.interventionService.getAllInterventionsHelp().subscribe({
      next: data => {
        data.forEach(intervention => {
          if (intervention.heureDebut) {
            intervention.heureDebut = new Date('1970-01-01T' + intervention.heureDebut + 'Z');
          }
          if (intervention.heureFin) {
            intervention.heureFin = new Date('1970-01-01T' + intervention.heureFin + 'Z');
          }
        });
        //this.dataSource.data = data;
        //this.dataSource.paginator = this.paginator;
        this.dataSourceFermer.data = data.filter(intervention => intervention.status === 'FERMER');
        //this.dataSourceEncours.paginator = this.paginator;
        //this.dataSourceFermer.paginator = this.paginator;
        this.dataSourceFermer.paginator = this.paginatorFermer;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Error fetching interventions:', err);
      }
    });
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Intervention} from "../models/model/model.module";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {InterventionService} from "../services/intervention.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-intervention-historique',
  templateUrl: './intervention-historique.component.html',
  styleUrl: './intervention-historique.component.css'
})
export class InterventionHistoriqueComponent implements OnInit{
  displayedColumns: string[] = ['id', 'status', 'date', 'heureDebut', 'heureFin', 'compagnie', 'appUser', 'comptoire', 'equipment', 'solution', 'probleme', 'aeroport'];
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginatorEncours') paginatorEncours!: MatPaginator;
  @ViewChild('paginatorFermer') paginatorFermer!: MatPaginator;
  //public dataSource: MatTableDataSource<Intervention>;
  public dataSourceEncours: MatTableDataSource<Intervention>;
  public dataSourceFermer: MatTableDataSource<Intervention>;
  isTechnicien: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private interventionService: InterventionService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private authService: AuthServiceService
  ) {
    //this.dataSource = new MatTableDataSource<Intervention>();
    this.dataSourceEncours = new MatTableDataSource<Intervention>();
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
    this.interventionService.getAllInterventiions().subscribe({
      next: data => {
        data.forEach(intervention => {
          if (intervention.heureDebut) {
            intervention.heureDebut = new Date('1970-01-01T' + intervention.heureDebut + 'Z');
          }
          if (intervention.heureFin) {
            intervention.heureFin = new Date('1970-01-01T' + intervention.heureFin + 'Z');
          }
        });
        console.log("daata : ",data);
        //this.dataSource.data = data;
        //this.dataSource.paginator = this.paginator;
        this.dataSourceEncours.data = data.filter(
          intervention => intervention.status === 'ENCOURS'
          //&& intervention.appUser === this.authService.username
        );
        this.dataSourceFermer.data = data.filter(
          intervention => intervention.status === 'FERMER'
          //&& intervention.appUser === this.authService.username
        );
        //this.dataSourceEncours.paginator = this.paginator;
        //this.dataSourceFermer.paginator = this.paginator;
        this.dataSourceEncours.paginator = this.paginatorEncours;
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
        this.dataSourceEncours.data = data.filter(intervention => intervention.status === 'ENCOURS');
        this.dataSourceFermer.data = data.filter(intervention => intervention.status === 'FERMER');
        //this.dataSourceEncours.paginator = this.paginator;
        //this.dataSourceFermer.paginator = this.paginator;
        this.dataSourceEncours.paginator = this.paginatorEncours;
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

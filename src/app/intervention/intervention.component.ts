import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { InterventionService } from "../services/intervention.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InterventionDialogComponent } from "../intervention-dialog/intervention-dialog.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Intervention } from '../models/model/model.module';
import { AuthServiceService } from '../services/auth-service.service';
import { InterventionDialogHelpComponent } from '../intervention-dialog-help/intervention-dialog-help.component';
import { enableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'status', 'date', 'heureDebut', 'heureFin', 'compagnie', 'appUser', 'comptoire', 'equipment', 'solution', 'probleme', 'aeroport', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //public dataSource: MatTableDataSource<Intervention>;
  public dataSourceEncours: MatTableDataSource<Intervention>;
  public dataSourceFermer: MatTableDataSource<Intervention>;
  formIntervention!: FormGroup;
  isTechnicien: boolean = false;
  constructor(
    private dialog: MatDialog,
    private interventionService: InterventionService,
    private fb: FormBuilder,
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
    this.fetchInterventions();
    this.formIntervention = this.fb.group({
      id: ['' || null],
      status: ['', Validators.required],
      date: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      compagnie: ['', Validators.required],
      appUser: ['', Validators.required],
      comptoire: ['', Validators.required],
      equipment: ['', Validators.required],
      solution: ['', Validators.required],
      probleme: ['', Validators.required],
      aeroport: ['', Validators.required]
    });
  }

  fetchInterventions(): void {
    if (this.isTechnicien) {
      this.fetchInterventionsTech();
    } else {
      this.fetchInterventionsHelp();
    }
  }

  fetchInterventionsTech(): void {
    this.interventionService.getAllInterventions().subscribe({
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
        this.dataSourceEncours.paginator = this.paginator;
        this.dataSourceFermer.paginator = this.paginator;
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
        this.dataSourceEncours.paginator = this.paginator;
        this.dataSourceFermer.paginator = this.paginator;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Error fetching interventions:', err);
      }
    });
  }

  openDialog(intervention?: any): void {
    if(this.isTechnicien){
      const dialogRef = this.dialog.open(InterventionDialogComponent, {data: {
        title: intervention ? 'Modifier Intervention' : 'Ajouter Intervention',
        intervention: intervention || {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchInterventions();
      }
    });
    }else{
      const dialogRef = this.dialog.open(InterventionDialogHelpComponent, {data: {
        title: intervention ? 'Modifier Intervention' : 'Ajouter Intervention',
        intervention: intervention || {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchInterventions();
      }
    });}


  }

  applyFilter(event: Event, dataSource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
  }

  editIntervention(intervention: any): void {
    this.openDialog(intervention);
  }

  finishIntervention(intervention: any): void {
    if (this.isTechnicien) {
      this.finishInterventionTech(intervention);
    } else {
      this.finishInterventionHelp(intervention);
    }
  }

  finishInterventionTech(intervention: any): void {
    this.interventionService.endIntervention(intervention).subscribe({
      next: data => {
        this.snackBar.open('Intervention terminée avec succès', 'Fermer', { duration: 3000 });
        this.fetchInterventionsTech();
      },
      error: err => {
        console.log('Error finishing intervention:', err);
        this.snackBar.open('Erreur lors de la terminaison de l\'intervention', 'Fermer', { duration: 3000 });
      }
    });
  }

  finishInterventionHelp(intervention: any): void {
    this.interventionService.endInterventionHelp(intervention).subscribe({
      next: data => {
        this.snackBar.open('Intervention terminée avec succès', 'Fermer', { duration: 3000 });
        this.fetchInterventionsHelp();
      },
      error: err => {
        console.log('Error finishing intervention:', err);
        this.snackBar.open('Erreur lors de la terminaison de l\'intervention', 'Fermer', { duration: 3000 });
      }
    });
  }
}

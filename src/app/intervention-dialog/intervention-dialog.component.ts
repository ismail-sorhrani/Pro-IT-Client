import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InterventionService } from '../services/intervention.service';
import { CompagnieService } from '../services/compagnie.service';
import { ComptoireService } from '../services/comptoire.service';
import { EquipmentService } from '../services/equipment.service';
import { SolutionService } from '../services/solution.service';
import { ProblemeService } from '../services/probleme.service';
import { AeroportService } from '../services/aeroport.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Intervention } from '../models/model/model.module';

@Component({
  selector: 'app-intervention-dialog',
  templateUrl: './intervention-dialog.component.html',
  styleUrls: ['./intervention-dialog.component.css']
})
export class InterventionDialogComponent implements OnInit {

  formIntervention!: FormGroup;
  compagnies!: any[];
  comptoires!: any[];
  equipments!: any[];
  solutions!: any[];
  problemes!: any[];
  aeroports!: any[];
  minDate: Date;
  minTime: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InterventionDialogComponent>,
    private fb: FormBuilder,
    private interventionService: InterventionService,
    private compagnieService: CompagnieService,
    private comptoireService: ComptoireService,
    private equipmentService: EquipmentService,
    private solutionService: SolutionService,
    private problemeService: ProblemeService,
    private aeroportService: AeroportService,
    private authService: AuthServiceService
  ) {
    // Set minDate to current date
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0);

    // Set minTime to current time in HH:mm format
    const now = new Date();
    this.minTime = now.toTimeString().substr(0, 5);
  }

  ngOnInit(): void {
    // Initialize form first
    this.formIntervention = this.fb.group({
      id: [this.data.intervention?.id || null],
      status: [{ value: 'ENCOURS', disabled: true }, Validators.required],
      date: [{ value: new Date(), disabled: true }, Validators.required],
      heureDebut: [{ value: new Date().toTimeString().substr(0, 5), disabled: true }, Validators.required],
      heureFin: [{ value: '', disabled: true }, Validators.required],
      compagnie: [this.data.intervention?.compagnie?.id || '', Validators.required],
      appUser: [{ value: this.authService.getUsername(), disabled: true }, Validators.required],
      comptoire: [this.data.intervention?.comptoire?.id || '', Validators.required],
      equipment: [this.data.intervention?.equipment?.id || '', Validators.required],
      solution: [this.data.intervention?.solution?.id || '', Validators.required],
      probleme: [this.data.intervention?.probleme?.id || '', Validators.required],
      aeroport: [this.data.intervention?.aeroport?.id || '', Validators.required]
    });

    this.loadDependencies();
  }

  loadDependencies(): void {

    this.compagnieService.getAllCompagnies().subscribe(data => {
      this.compagnies = data;
    });

    this.comptoireService.getAllComptoires().subscribe(data => {
      this.comptoires = data;
    });

    this.equipmentService.getAllEquipments().subscribe(data => {
      this.equipments = data;
      console.log("equiii : ",data);
    });

    this.solutionService.getAllSolutions().subscribe(data => {
      this.solutions = data;
    });

    this.problemeService.getAllProblemss().subscribe(data => {
      this.problemes = data;
    });

    this.aeroportService.getAllAeroports().subscribe(data => {
      this.aeroports = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveIntervention(): void {
    if (this.formIntervention.valid) {
      const formValue = this.formIntervention.getRawValue();
      console.log("from : ",formValue);
      const interventionData: Intervention = {
        id: formValue.id,
        status: formValue.status,
        date: new Date(formValue.date),
        heureDebut: new Date(`1970-01-01T${formValue.heureDebut}:00Z`),
        heureFin: formValue.heureFin ? new Date(`1970-01-01T${formValue.heureFin}:00Z`) : null,
        compagnie: formValue.compagnie,
        appUser: formValue.appUser,
        comptoire: formValue.comptoire,
        equipment: formValue.equipment,
        solution: formValue.solution,
        probleme: formValue.probleme,
        aeroport: formValue.aeroport
      };

      if (interventionData.id) {
        if (interventionData.status === 'FERMER') {
          this.interventionService.endIntervention(interventionData).subscribe({
            next: response => {
              this.dialogRef.close(true);
            },
            error: err => {
              console.error('Error ending intervention:', err);
            }
          });
        } else {
          this.interventionService.updateIntervention(interventionData.id, interventionData).subscribe({
            next: response => {
              this.dialogRef.close(true);
              console.log("updfate tech  : ",interventionData);
            },
            error: err => {
              console.error('Error updating intervention:', err);
            }
          });
        }
      } else {
        this.interventionService.addIntervention(interventionData).subscribe({
          next: response => {
            this.dialogRef.close(true);
          },
          error: err => {
            console.error('Error saving intervention:', err);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
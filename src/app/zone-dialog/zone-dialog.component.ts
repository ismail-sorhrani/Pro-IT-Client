import {Component, Inject, inject, model, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Zone} from "../models/model/model.module";
import {ZoneService} from "../services/zone.service";

@Component({
  selector: 'app-zone-dialog',
  templateUrl: './zone-dialog.component.html',
  styleUrl: './zone-dialog.component.css'
})
export class ZoneDialogComponent implements OnInit{
  formZone!:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef:MatDialogRef<ZoneDialogComponent>,
              private fb:FormBuilder,
              private zoneService:ZoneService) {
  }





  onNoClick() {
    this.dialogRef.close();
  }



  ngOnInit(): void {
    this.formZone = this.fb.group({
      id: [this.data.zone.id || null],
      zoneName: [this.data.zone.zoneName, Validators.required],
      aeroportName: [this.data.zone.aeroportName, Validators.required]
    });
  }

  saveZone(): void {
    if (this.formZone.valid) {
      const zoneData = this.formZone.value;
      if (zoneData.id) {
        // Edit zone
        this.zoneService.updateZone(zoneData.id, zoneData.zoneName, zoneData.aeroportName).subscribe({
          next: response => {
            console.log('Zone updated:', response);
            this.dialogRef.close(true);
          },
          error: err => {
            console.log('Error updating zone:', err);
          }
        });
      } else {
        // Add new zone
        this.zoneService.saveZone(zoneData.zoneName, zoneData.aeroportName).subscribe({
          next: response => {
            console.log('Zone saved:', response);
            this.dialogRef.close(true);
          },
          error: err => {
            console.log('Error saving zone:', err);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  /*saveZone(): void {
    if (this.formZone.valid) {
      const { zoneName, aeroportName } = this.formZone.value;
      console.log(this.formZone.value);
      this.zoneService.saveZone(zoneName, aeroportName).subscribe({
        next: response => {
          console.log('Zone saved:', response);
        },
        error: err => {
          console.log('Error saving zone:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }*/
}


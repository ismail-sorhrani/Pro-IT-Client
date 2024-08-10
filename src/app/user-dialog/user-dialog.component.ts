import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppUserService} from "../services/app-user.service";
import {Aeroport} from "../models/model/model.module";
import {AeroportService} from "../services/aeroport.service";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {
  userForm: FormGroup;
  roles = [{ roleName: 'ADMIN' }, { roleName: 'HELP_DESK' }, { roleName: 'TECHNICIEN' }]; // Example roles
  aeroports : Aeroport[]=[];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: AppUserService,
    private aeroportService:AeroportService
  ) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      roles: [[], Validators.required],
      aeroport: ['']
    });

    if (data.isEdit) {
      this.userForm.patchValue(data.user);
    }
    this.fetchAeroport();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.data.isEdit) {
        /*this.userService.updateUser(this.userForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });*/
      } else {
        /*this.userService.addUser(this.userForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });*/
      }
    }
  }
  fetchAeroport():void{
    this.aeroportService.getAllAeroports().subscribe(data => {
      this.aeroports = data;
    });
  }
}

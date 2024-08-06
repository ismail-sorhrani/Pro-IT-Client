import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AdminComponent } from './admin/admin.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { MatIconModule} from "@angular/material/icon";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import { ZoneComponent } from './zone/zone.component';
import { ComptoireComponent } from './comptoire/comptoire.component';
import { AeroportComponent } from './aeroport/aeroport.component';
import { ReportingComponent } from './reporting/reporting.component';
import { CustomSidebarComponent } from './custom-sidebar/custom-sidebar.component';

import { ZoneDialogComponent } from './zone-dialog/zone-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatInputModule, MatLabel} from "@angular/material/input";
import { MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import { MatPaginatorModule} from "@angular/material/paginator";
import { AeroportDialogComponent } from './aeroport-dialog/aeroport-dialog.component';
import { CompagnieComponent } from './compagnie/compagnie.component';
import { CompagnieDialogComponent } from './compagnie-dialog/compagnie-dialog.component';
import { ComptoireDialogComponent } from './comptoire-dialog/comptoire-dialog.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmentDialogComponent } from './equipment-dialog/equipment-dialog.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { ProblemeDialogComponent } from './probleme-dialog/probleme-dialog.component';
import { SolutionComponent } from './solution/solution.component';
import { SolutionDialogComponent } from './solution-dialog/solution-dialog.component';
import { InterventionComponent } from './intervention/intervention.component';
import { InterventionDialogComponent } from './intervention-dialog/intervention-dialog.component';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatTable, MatTableModule} from "@angular/material/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {InterventionDialogHelpComponent} from "./intervention-dialog-help/intervention-dialog-help.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import { FinishInterventionDialogComponent } from './finish-intervention-dialog/finish-intervention-dialog.component';
import { InterventionFinComponent } from './intervention-fin/intervention-fin.component';
import { InterventionHistoriqueComponent } from './intervention-historique/intervention-historique.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    AdminComponent,
    TechnicienComponent,
    HelpdeskComponent,
    ZoneComponent,
    ComptoireComponent,
    AeroportComponent,
    ReportingComponent,
    CustomSidebarComponent,
    ZoneDialogComponent,
    AeroportDialogComponent,
    CompagnieComponent,
    CompagnieDialogComponent,
    ComptoireDialogComponent,
    EquipmentComponent,
    EquipmentDialogComponent,
    ProblemeComponent,
    ProblemeDialogComponent,
    SolutionComponent,
    SolutionDialogComponent,
    InterventionComponent,
    InterventionDialogComponent,
    InterventionDialogHelpComponent,
    FinishInterventionDialogComponent,
    InterventionFinComponent,
    InterventionHistoriqueComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatLabel,
    MatMenuModule,
    MatMenuTrigger,
    MatSidenavModule,
    MatListModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    MatCardModule,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
    MatTableModule,
    MatTabGroup,
    MatTab
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

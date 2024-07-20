import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { AdminComponent } from './admin/admin.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatDrawerContainer, MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatMenu, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatList, MatListModule} from "@angular/material/list";
import { ZoneComponent } from './zone/zone.component';
import { ComptoireComponent } from './comptoire/comptoire.component';
import { AeroportComponent } from './aeroport/aeroport.component';
import { ReportingComponent } from './reporting/reporting.component';
import { CustomSidebarComponent } from './custom-sidebar/custom-sidebar.component';
import {MatCard, MatCardActions, MatCardModule} from "@angular/material/card";
import {MatTable, MatTableModule} from "@angular/material/table";
import { ZoneDialogComponent } from './zone-dialog/zone-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

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
    ZoneDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,

    MatMenuModule,
    MatMenuTrigger,
    MatSidenavModule,
    MatListModule,
    MatCardActions,
    MatCardModule,
    MatTableModule,
    MatDialogContent,
    MatFormFieldModule,
    MatDialogActions,
    MatFormFieldModule,
    MatDialogClose,
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

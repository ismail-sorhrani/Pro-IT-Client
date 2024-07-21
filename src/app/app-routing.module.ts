import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {TechnicienComponent} from "./technicien/technicien.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {HelpdeskComponent} from "./helpdesk/helpdesk.component";
import {ReportingComponent} from "./reporting/reporting.component";
import {ZoneComponent} from "./zone/zone.component";
import {AeroportComponent} from "./aeroport/aeroport.component";
import {ComptoireComponent} from "./comptoire/comptoire.component";
import {CompagnieComponent} from "./compagnie/compagnie.component";

const routes: Routes = [
  {path : "", redirectTo :"/login" ,pathMatch:"full"},
  {path : "login", component: LoginComponent},
  {path :"admin", component:AdminComponent ,
    canActivate:[AuthenticationGuard],
    children :[

      {path : "compagnie", component: CompagnieComponent},
      {path : "reporting", component: ReportingComponent},
      {path : "zone", component: ZoneComponent},
      {path : "aeroport", component: AeroportComponent},
      {path : "comptoire", component: ComptoireComponent}

    ]},
  {path :"technicien", component:TechnicienComponent ,
    canActivate:[AuthenticationGuard]
    ,children :[

      {path : "products",component:ProductsComponent}

    ]},
  {path :"helpdesk", component:HelpdeskComponent ,
    canActivate:[AuthenticationGuard]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

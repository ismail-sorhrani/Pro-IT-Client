
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {InterventionService} from "../services/intervention.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthServiceService} from "../services/auth-service.service";
import {Interventiion,AppUser} from "../models/model/intervention.model";
import {ComptoireService} from "../services/comptoire.service";
import {Aeroport, ComptoireDTO, Zone} from "../models/model/model.module";
import {AeroportService} from "../services/aeroport.service";
import {AppUserService} from "../services/app-user.service";
import {ZoneService} from "../services/zone.service";

@Component({
  selector: 'app-intervention-historique',
  templateUrl: './intervention-historique.component.html',
  styleUrl: './intervention-historique.component.css'
})
export class InterventionHistoriqueComponent implements OnInit {
  displayedColumns: string[] = ['id', 'status', 'date', 'heureDebut', 'heureFin', 'duration', 'compagnie', 'appUser', 'comptoire', 'equipment', 'solution', 'probleme', 'aeroport'];

  @ViewChild('paginatorFermer') paginatorFermer!: MatPaginator;

  public dataSourceFermer: MatTableDataSource<Interventiion>;
  isTechnicien: boolean = false;
  isAdmin: boolean = false;
  isHelpdesk:boolean=false;

  durationOptions: string[] = ['Supérieur à 10 min',
    'Supérieur à 15 min',
    'Inférieur à 10 min',
    'Inférieur à 15 min'];
  selectedDuration: string = '';
  comptoires: ComptoireDTO[] = []; // Assurez-vous de charger cette liste avec vos comptoires
  selectedComptoire: ComptoireDTO | null = null;
  aeroports:Aeroport[]=[];
  selectedAeroport:Aeroport | null=null;
  techniciens: any[]=[];
  selectedtechnicien: AppUser|null=null;
  selectedDate: Date | null = null;
  zones!: Zone[];
  selectedZone: Zone| null = null;

  constructor(
    private interventionService: InterventionService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private authService: AuthServiceService,
    private comptoireService: ComptoireService,
    private aeroportService: AeroportService,
    private userService:AppUserService,
    private zoneService:ZoneService
  ) {
    this.dataSourceFermer = new MatTableDataSource<Interventiion>();
  }

  ngOnInit(): void {
    this.isTechnicien = this.authService.roles.includes('TECHNICIEN');
    this.isAdmin = this.authService.roles.includes('ADMIN');
    this.isHelpdesk=this.authService.roles.includes('HELP_DESK')
    this.fetchAeroport();
    this.fetchUsers();
    this.fetchZones();
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
    this.interventionService.getAllInterventionsFilter(this.authService.username).subscribe({
      next: data => {
        this.processInterventions(data);
      },
      error: err => {
        console.log('Error fetching interventions:', err);
      }
    });
  }

  fetchInterventionsHelp(): void {
    this.interventionService.getAllInterventionsHelpFiltre().subscribe({
      next: data => {
        this.processInterventions(data);
      },
      error: err => {
        console.log('Error fetching interventions:', err);
      }
    });
  }
  processInterventions(data: Interventiion[]): void {
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

    this.dataSourceFermer.data = data.filter(intervention => intervention.status === 'FERMER');
    this.dataSourceFermer.paginator = this.paginatorFermer;
    this.cdr.detectChanges();
  }


  fetchComptoires(): void {
    console.log("La zone :",this.selectedZone);
    this.comptoireService.getAllComptoires().subscribe({
      next: comptoires => {
        this.comptoires = comptoires.filter(comptoire => comptoire.zoneId === this.selectedZone?.id);
      },
      error: err => {
        console.log('Error fetching comptoires:', err);
      }
    });
    console.log("List Of Comptoires : ",this.comptoires);
  }
  fetchAeroport():void{
    this.aeroportService.getAllAeroports().subscribe(data => {
      this.aeroports = data;
    });
  }



  applyFilter(): void {
    let filteredData = this.dataSourceFermer.data;

    if (this.selectedDuration) {
      if (this.selectedDuration.includes('Supérieur')) {
        const minutes = this.selectedDuration.includes('10 min') ? 10 : 15;
        filteredData = filteredData.filter(intervention =>
          intervention.duration && this.convertToMinutes(intervention.duration) > minutes
          );
      } else if (this.selectedDuration.includes('Inférieur')) {
        const minutes = this.selectedDuration.includes('10 min') ? 10 : 15;
        filteredData = filteredData.filter(intervention =>
          intervention.duration && this.convertToMinutes(intervention.duration) < minutes);
      }
    }


    if (this.selectedComptoire) {
      filteredData = filteredData.filter(intervention =>
        intervention.comptoire?.comptoireName === this.selectedComptoire?.comptoireName

      );
    }
    if (this.selectedAeroport) {
      filteredData = filteredData.filter(intervention =>
        intervention.aeroport?.aeroportName === this.selectedAeroport?.aeroportName

      );
    }
    if(this.selectedtechnicien){
      filteredData=filteredData.filter(intervention =>
        intervention.appUser?.username===this.selectedtechnicien?.username

      );
    }
    if (this.selectedDate) {
      filteredData = filteredData.filter(intervention =>
        new Date(intervention.date).toDateString() === this.selectedDate?.toDateString()
      );
    }

    this.dataSourceFermer.data = filteredData;
  }

  getDurationInMinutes(duration: string): number {
    const [hours, minutes] = duration.split('h').map(Number);
    return (hours * 60) + minutes;
  }

  clearFilter(): void {
    this.selectedDuration = '';
    this.selectedComptoire = null;
    this.selectedAeroport=null;
    this.selectedDate=null;
    this.selectedtechnicien=null;
    this.fetchInterventions();
  }
  convertToMinutes(duration: string): number {
    const parts = duration.split(' ');
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    return hours * 60 + minutes;
  }

    fetchUsers(): void {
      this.userService.getAllUsersWithRole("TECHNICIEN").subscribe(data => {
        this.techniciens=data;
      });

  }

  fetchZones() {
    this.zoneService.getAllZones().subscribe(data => {
      this.zones=data;
    });
  }
}

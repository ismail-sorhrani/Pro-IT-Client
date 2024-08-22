import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Projet} from "../models/model/model.module";
import {InterventionService} from "../services/intervention.service";
import {AeroportService} from "../services/aeroport.service";
import {ProjetService} from "../services/projet.service";
import {ChartDataset, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-tbf-chart',
  templateUrl: './tbf-chart.component.html',
  styleUrl: './tbf-chart.component.css'
})
export class TbfChartComponent implements OnInit{
  form: FormGroup;
  public aeroports!:any;
  public projects!: Projet[];
  public tbfChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public tbfChartData: ChartDataset[] = [{ data: [], label: 'TBF' }];
  public tbfChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right', // Positionner la légende à droite
      },
      title: {
        display: true,
        text: 'TBF par mois pour l\'année sélectionnée'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'TBF (%)'
        }
      }
    }
  };
  public tbfChartType: ChartType = 'line';
  constructor(private interventionservice: InterventionService,
              private aeroportService:AeroportService,
              private projetService:ProjetService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      projet: ['',Validators.required],
      aeroport: ['',Validators.required],
      date: ['',Validators.required]
    });
  }
  ngOnInit(): void {
    this.fetchAeroports();
    this.fetchProjets();
  }
  fetchAeroports(){
    this.aeroportService.getAllAeroports().subscribe({
      next: data => {
        console.log('Data received: ', data);
        this.aeroports = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
  fetchProjets() {
    this.projetService.getAllProjets().subscribe(data => {
      this.projects=data;
    });
  }
  onSubmit(): void {
    if(this.form.valid){
      const selectedProjetId = this.form.get('projet')?.value;
      const selectedAeroportId = this.form.get('aeroport')?.value;
      const selectedDate = this.form.get('date')?.value;
      const year =selectedDate.getFullYear();
      const month=selectedDate.getMonth();
      console.log('Projet ID:', selectedProjetId);
      console.log('Aéroport ID:', selectedAeroportId);
      console.log('Date sélectionnée:', selectedDate);
      console.log('Year sélectionnée:', year);
      console.log('Month sélectionnée:', month);
      this.interventionservice.getTbfYear(selectedProjetId, year, selectedAeroportId).subscribe(data => {
        this.tbfChartData = [{ data: Object.values(data), label: 'TBF' }];
      });
    }
  }
}

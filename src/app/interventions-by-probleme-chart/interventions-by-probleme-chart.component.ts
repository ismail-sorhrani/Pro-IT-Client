import {Component, OnInit} from '@angular/core';
import {ChartData, ChartOptions, ChartType, registerables} from "chart.js";
import {InterventionService} from "../services/intervention.service";
import {Interventiion} from "../models/model/intervention.model";
import {Chart} from 'chart.js/auto';
@Component({
  selector: 'app-interventions-by-probleme-chart',
  templateUrl: './interventions-by-probleme-chart.component.html',
  styleUrl: './interventions-by-probleme-chart.component.css'
})
export class InterventionsByProblemeChartComponent implements OnInit{
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  public barChartLabels: string[] = []; // Labels pour les natures de problème
  public barChartData: ChartData<'bar'> = {
    datasets: [
      {
        data: [], // Données pour le nombre d'interventions
        label: 'Nombre d\'interventions',
        backgroundColor: 'rgba(77, 83, 96, 0.2)',
        borderColor: 'rgba(77, 83, 96, 1)',
        borderWidth: 1,
      }
    ]
  };

  public barChartLegend = true;
  public barChartType: 'bar' = 'bar';

  constructor(private interventionService: InterventionService) { }

  ngOnInit(): void {
    this.interventionService.getInterventionsByProblemType().subscribe(data => {
      this.barChartLabels = data.problems; // Supposons que `data` a une propriété `problems`
      this.barChartData.datasets[0].data = data.counts; // Supposons que `data` a une propriété `counts`
    });
  }
}

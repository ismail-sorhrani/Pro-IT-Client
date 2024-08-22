import { Component } from '@angular/core';
import {Chart, ChartDataset, ChartOptions, ChartType, registerables} from "chart.js";
import {InterventionService} from "../services/intervention.service";
import {DatePipe} from "@angular/common";
import {Interventiion} from "../models/model/intervention.model";

@Component({
  selector: 'app-interventions-by-projet-year',
  templateUrl: './interventions-by-projet-year.component.html',
  styleUrl: './interventions-by-projet-year.component.css'
})
export class InterventionsByProjetYearComponent {
  public dateselected=new Date();
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '\n' +
          'the number of incidents by equipment for the year : '+this.dateselected.getFullYear()
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [
    { data: [], label: 'Interventions' }
  ];

  private allInterventions: Interventiion[] = [];

  constructor(
    private interventionService: InterventionService,
    private datePipe: DatePipe
  ) {
    Chart.register(...registerables);
  }
  private formatDate(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  ngOnInit(): void {
    this.interventionService.getAllInterventiiions().subscribe(data => {
      this.allInterventions = data;
      this.updateChart(new Date());
      this.barChartOptions;
    });
  }

  onDateChange(event: any): void {
    const selectedDate = event.value;
    this.dateselected=event.value;
    this.updateChart(selectedDate);
  }

  updateChart(date: Date): void {
    const selectedYear = date.getFullYear();
    const projetMap = new Map<string, number[]>();

    this.allInterventions.forEach((intervention: Interventiion) => {
      const interventionDate = new Date(intervention.date);
      const month = interventionDate.getMonth();
      const year = interventionDate.getFullYear();

      if (year === selectedYear) {
        if (intervention.projet && intervention.projet?.projetName) {
          const projetName = intervention.projet.projetName;
          if (!projetMap.has(projetName)) {
            projetMap.set(projetName, new Array(12).fill(0));
          }
          projetMap.get(projetName)![month]++;
        }
      }
    });

    this.barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.barChartData = Array.from(projetMap, ([label, data]) => ({ data, label }));
  }
}

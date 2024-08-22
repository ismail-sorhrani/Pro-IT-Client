import { Component } from '@angular/core';
import {Chart, ChartDataset, ChartOptions, ChartType, registerables} from "chart.js";
import {InterventionService} from "../services/intervention.service";
import {DatePipe} from "@angular/common";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-interventions-by-projet',
  templateUrl: './interventions-by-projet.component.html',
  styleUrl: './interventions-by-projet.component.css'
})
export class InterventionsByProjetComponent {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Répartition des interventions par problème pour le mois sélectionné'
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw as number; // Assertion de type
            return `${label}: ${value.toFixed(2)}%`;
          }
        }
      },
      datalabels: {
        anchor: function(context: any) {
          // Logic to determine the anchor position
          return context.dataIndex % 2 === 0 ? 'end' : 'center';
        },
        align: function(context: any) {
          // Logic to align the label
          return context.dataIndex % 2 === 0 ? 'start' : 'center';
        },
        formatter: (value: number) => {
          return `${value.toFixed(2)}%`;
        },
        color: '#000',
        font: {
          weight: 'bold',
          size: 12
        },
        offset: 10

      }
    }
  };
  public pieChartLabels: string[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartData: ChartDataset<'pie'>[] = [
    { data: [], label: 'Interventions', backgroundColor: [] }
  ];

  selectedDate: Date | null = null;

  constructor(private interventionService: InterventionService, private datePipe: DatePipe) {
    Chart.register(...registerables);
    Chart.register(ChartDataLabels); // Enregistrez le plugin ChartDataLabels

  }

  ngOnInit(): void {
    this.loadChartData();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value;
    this.loadChartData();
  }

  private loadChartData(): void {
    this.interventionService.getAllInterventiiions().subscribe(data => {
      const projetMap = new Map<string, number>();
      const colors: string[] = [];
      let totalInterventions = 0;

      data.forEach((intervention: any) => {
        const interventionDate = new Date(intervention.date);
        const month = interventionDate.getMonth();
        const year = interventionDate.getFullYear();

        if (this.selectedDate) {
          const selectedMonth = this.selectedDate.getMonth();
          const selectedYear = this.selectedDate.getFullYear();
          if (month !== selectedMonth || year !== selectedYear) {
            return;
          }
        }

        if (intervention.projet && intervention.projet?.projetName) {
          const projetName = intervention.projet.projetName;
          if (!projetMap.has(projetName)) {
            projetMap.set(projetName, 0);
            colors.push(this.getRandomColor());
          }
          projetMap.set(projetName, projetMap.get(projetName)! + 1);
          totalInterventions++;
        }
      });

      if (totalInterventions > 0) {
        this.pieChartLabels = Array.from(projetMap.keys());
        this.pieChartData = [
          {
            data: Array.from(projetMap.values()).map(count => (count / totalInterventions) * 100),
            label: 'Interventions',
            backgroundColor: colors
          }
        ];
      } else {
        this.pieChartLabels = [];
        this.pieChartData = [
          {
            data: [],
            label: 'Interventions',
            backgroundColor: []
          }
        ];
      }
    });
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}

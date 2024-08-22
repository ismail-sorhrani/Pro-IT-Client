import { Component } from '@angular/core';
import {InterventionService} from "../services/intervention.service";
import {Chart, ChartDataset, ChartOptions, ChartType, registerables} from "chart.js";
import {Interventiion} from "../models/model/intervention.model";
import {DatePipe} from "@angular/common";
import {colors} from "@angular/cli/src/utilities/color";

@Component({
  selector: 'app-interventions-by-equipment-chart',
  templateUrl: './interventions-by-equipment-chart.component.html',
  styleUrl: './interventions-by-equipment-chart.component.css'
})
export class InterventionsByEquipmentChartComponent {
  /*public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Nombre d\'incidents par mois pour chaque équipement'
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
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
    });
  }

  onDateChange(event: any): void {
    const selectedDate = event.value;
    this.updateChart(selectedDate);
  }

  updateChart(date: Date): void {
    const selectedMonth = date.getMonth();
    const selectedYear = date.getFullYear();
    const equipmentMap = new Map<string, number[]>();

    this.allInterventions.forEach((intervention: Interventiion) => {
      const interventionDate = new Date(intervention.date);
      const month = interventionDate.getMonth();
      const year = interventionDate.getFullYear();

      if (year === selectedYear && month === selectedMonth) {
        if (intervention.equipment && intervention.equipment.equipementName) {
          const equipmentName = intervention.equipment.equipementName;
          if (!equipmentMap.has(equipmentName)) {
            equipmentMap.set(equipmentName, new Array(12).fill(0));
          }
          equipmentMap.get(equipmentName)![month]++;
        }
      }
    });

    this.barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.barChartData = Array.from(equipmentMap, ([label, data]) => ({ data, label }));
  }*/
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Répartition des interventions par équipement pour le mois sélectionné'
      }
    }
  };
  public pieChartLabels: string[] = [];
  public pieChartType: ChartType = 'pie';  // Définir le type de graphique ici
  public pieChartLegend = true;

  public pieChartData: ChartDataset[] = [
    { data: [],
      label: 'Interventions' ,
      backgroundColor: []}
  ];

  selectedDate: Date | null = null;

  constructor(private interventionService: InterventionService, private datePipe: DatePipe) {
    // Enregistrez les composants requis
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Initialiser les données sans filtre de date
    this.loadChartData();
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.loadChartData();
  }

  private loadChartData(): void {
    this.interventionService.getAllInterventiiions().subscribe(data => {
      const equipmentMap = new Map<string, number>();
      const colors: string[] = [];
      data.forEach((intervention: Interventiion) => {
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

        if (intervention.equipment && intervention.equipment.equipementName) {
          const equipmentName = intervention.equipment.equipementName;
          if (!equipmentMap.has(equipmentName)) {
            equipmentMap.set(equipmentName, 0);
            colors.push(this.getRandomColor());
          }
          equipmentMap.set(equipmentName, equipmentMap.get(equipmentName)! + 1);
        }
      });

      this.pieChartLabels = Array.from(equipmentMap.keys());
      this.pieChartData = [
        { data: Array.from(equipmentMap.values()),
          label: 'Interventions' ,
          backgroundColor: colors
        }
      ];
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

import { Component } from '@angular/core';
import {InterventionService} from "../services/intervention.service";
import {Chart, ChartDataset, ChartOptions, ChartType, registerables} from "chart.js";
import {Interventiion} from "../models/model/intervention.model";

@Component({
  selector: 'app-interventions-by-equipment-chart',
  templateUrl: './interventions-by-equipment-chart.component.html',
  styleUrl: './interventions-by-equipment-chart.component.css'
})
export class InterventionsByEquipmentChartComponent {
  public barChartOptions: ChartOptions = {
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

  constructor(private interventionService: InterventionService) {
    // Enregistrez les composants requis
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.interventionService.getAllInterventiiions().subscribe(data => {
      const equipmentMap = new Map<string, number[]>();

      /*data.forEach(intervention => {
        const month = new Date(intervention.date).getMonth();
        const equipmentName = intervention.equipment.equipementName;
        console.log("equipmentName chart : ",equipmentName);
        if (!equipmentMap.has(equipmentName)) {
          equipmentMap.set(equipmentName, new Array(12).fill(0));
        }
        equipmentMap.get(equipmentName)![month]++;
      });*/
      data.forEach((intervention: Interventiion) => {
        const month = new Date(intervention.date).getMonth();
        if (intervention.equipment && intervention.equipment.equipementName) {
          const equipmentName = intervention.equipment.equipementName;
          if (!equipmentMap.has(equipmentName)) {
            equipmentMap.set(equipmentName, new Array(12).fill(0));
          }
          equipmentMap.get(equipmentName)![month]++;
        }
      });

      this.barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      this.barChartData = Array.from(equipmentMap, ([label, data]) => ({ data, label }));
    });
  }
}

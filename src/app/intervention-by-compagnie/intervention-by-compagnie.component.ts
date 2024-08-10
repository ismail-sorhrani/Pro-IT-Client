import { Component } from '@angular/core';
import { InterventionService } from '../services/intervention.service';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { Interventiion } from '../models/model/intervention.model';

@Component({
  selector: 'app-intervention-by-compagnie',
  templateUrl: './intervention-by-compagnie.component.html',
  styleUrl: './intervention-by-compagnie.component.css'
})
export class InterventionByCompagnieComponent {


  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Nombre d\'incidents par mois pour chaque compagnie'
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [
    { data: [], label: 'Interventionss' }
  ];

  constructor(private interventionService: InterventionService) {
    // Enregistrez les composants requis
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.interventionService.getAllInterventionsss().subscribe(data => {
      const compagnieMap = new Map<string, number[]>();

    
      data.forEach((intervention: Interventiion) => {
        const month = new Date(intervention.date).getMonth();
        if (intervention.compagnie && intervention.compagnie.compagnieName) {
          const compagnieName = intervention.compagnie.compagnieName;
          if (!compagnieMap.has(compagnieName)) {
            compagnieMap.set(compagnieName, new Array(12).fill(0));
          }
          compagnieMap.get(compagnieName)![month]++;
        }
      });

      this.barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      this.barChartData = Array.from(compagnieMap, ([label, data]) => ({ data, label }));
    });
  }
}

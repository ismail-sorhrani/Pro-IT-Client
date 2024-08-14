import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType, ChartDataset } from "chart.js";
import { InterventionService } from "../services/intervention.service";

@Component({
  selector: 'app-interventions-by-probleme-chart',
  templateUrl: './interventions-by-probleme-chart.component.html',
  styleUrls: ['./interventions-by-probleme-chart.component.css']
})
export class InterventionsByProblemeChartComponent implements OnInit {
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: { 
        beginAtZero: true,
        display: false, 
        ticks: {
          display: false 
        },
        grid: {
          display: false 
        }
      },
      y: { beginAtZero: true }
    },
    plugins: {
      title: {
        display: true,
        text: 'Intervention By Problem',
        font: {
          size: 18
        }
      }
    }
  };

  public barChartLabels: string[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: []
  };

  public barChartLegend = true;
  public barChartType: 'bar' = 'bar';

  public problemColors: { problem: string, color: string }[] = [];

  constructor(private interventionService: InterventionService) {}

  ngOnInit(): void {
    this.interventionService.getInterventionsByProblemType().subscribe(data => {
      this.barChartLabels = data.problems; // Assuming `data` has a `problems` property

      const colors = this.generateLightColors(data.problems.length); // Generate light colors
      this.problemColors = data.problems.map((problem:string, index:number) => ({
        problem,
        color: colors[index]
      }));

      this.barChartData.datasets = data.problems.map((problem:string, index:number) => ({
        data: [data.counts[index]], // Data for each problem
        label: problem,
        backgroundColor: colors[index],
        borderColor: this.adjustColor(colors[index], -20),
        borderWidth: 1
      }));
    });
  }

  private generateLightColors(length: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < length; i++) {
      const hue = (i * 360 / length) % 360;
      const lightness = 80; // Adjust lightness for softer colors
      const saturation = 70; // Adjust saturation for pastel shades
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
  }

  private adjustColor(color: string, amount: number): string {
    // Convert HSL to RGB, adjust the color, and return it
    const hsl = color.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
    if (hsl) {
      const [_, h, s, l] = hsl.map(Number);
      const newL = Math.min(100, Math.max(0, l + amount));
      return `hsl(${h}, ${s}%, ${newL}%)`;
    }
    return color;
  }
}

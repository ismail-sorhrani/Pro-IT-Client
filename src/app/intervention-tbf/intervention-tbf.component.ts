import { Component, OnInit } from '@angular/core';
import { InterventionService } from '../services/intervention.service';
import { EquipmentService } from '../services/equipment.service';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-intervention-tbf',
  templateUrl: './intervention-tbf.component.html',
  styleUrls: ['./intervention-tbf.component.css']
})
export class InterventionTbfComponent implements OnInit {
  equipments: any[] = [];
  selectedEquipment!: number;
  selectedMonth!: number;
  selectedYear!: number;
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [2023, 2024, 2025]; // Example years

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#fff',
          font: {
            size: 14
          }
        }
      },
      y: {
        ticks: {
          color: '#fff',
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: {
            size: 16
          }
        }
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'TBF (%)' }
  ];

  constructor(
    private interventionService: InterventionService,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.equipmentService.getAllEquipments().subscribe(data => {
      this.equipments = data;
    });
  }

  loadTBFData(): void {
    if (this.selectedEquipment && this.selectedMonth && this.selectedYear) {
      this.interventionService.getTBFByEquipmentAndCompany(this.selectedEquipment, this.selectedMonth, this.selectedYear).subscribe(data => {
        this.barChartLabels = Object.keys(data);
        this.barChartData = [
          { data: Object.values(data), label: 'TBF (%)' }
        ];
      });
    }
  }
}

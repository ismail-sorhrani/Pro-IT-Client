import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { InterventionService } from '../services/intervention.service';
import { EquipmentService } from '../services/equipment.service';
import { EquipmentDTO } from '../models/model/model.module';

@Component({
  selector: 'app-tbfdashboard',
  templateUrl: './tbfdashboard.component.html',
  styleUrls: ['./tbfdashboard.component.css']
})
export class TBFDashboardComponent implements OnInit {
  equipments: EquipmentDTO[] = [];
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  selectedEquipment: number | null = null;
  selectedMonth: number | null = null;
  tbfData: Map<string, number> = new Map();
  chart: Chart | undefined;

  constructor(private interventionservice: InterventionService, private equipementservice: EquipmentService) {}

  ngOnInit(): void {
    this.fetchEquipments();
  }

  fetchEquipments() {
    this.equipementservice.getAllEquipments().subscribe(data => this.equipments = data);
  }

  onSubmit() {
    if (this.selectedEquipment && this.selectedMonth) {
      this.interventionservice.getTBF(this.selectedEquipment, this.selectedMonth).subscribe(data => {
        this.tbfData = new Map(Object.entries(data));
        this.updateChart();
      });
    }
  }

  updateChart() {
    const labels = Array.from(this.tbfData.keys());
    const values = Array.from(this.tbfData.values());

    if (this.chart) {
      this.chart.destroy();
    }

    // Get selected equipment name
    const selectedEquipmentName = this.equipments.find(e => e.id === this.selectedEquipment)?.equipmentName || 'Unknown Equipment';

    // Get the selected month name
    const selectedMonthName = this.months.find(m => m.value === this.selectedMonth)?.name || 'Unknown Month';

    this.chart = new Chart('tbfChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'TBF (%)',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `TBF Graph for ${selectedEquipmentName} in ${selectedMonthName}`,
            font: {
              size: 18
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            beginAtZero: true,
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}

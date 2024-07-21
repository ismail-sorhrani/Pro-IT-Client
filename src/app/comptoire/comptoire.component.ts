import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ComptoireDTO} from "../models/model/model.module";
import {MatPaginator} from "@angular/material/paginator";
import {ComptoireService} from "../services/comptoire.service";

@Component({
  selector: 'app-comptoire',
  templateUrl: './comptoire.component.html',
  styleUrl: './comptoire.component.css'
})
export class ComptoireComponent implements OnInit{

  constructor(private comptoireService:ComptoireService) {
  }
  displayedColumns: string[] = ['id', 'comptoireName', 'zoneAeroport'];
  dataSource = new MatTableDataSource<ComptoireDTO>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.comptoireService.getAllComptoires().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      console.log("comptoire",data);
    });

  }

  openDialog() {

  }
}

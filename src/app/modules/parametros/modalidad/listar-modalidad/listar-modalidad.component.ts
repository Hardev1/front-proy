import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { ModalidadService } from 'src/app/services/parametros/modalidad.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralData } from 'src/app/config/general-data';

@Component({
  selector: 'app-listar-modalidad',
  templateUrl: './listar-modalidad.component.html',
  styleUrls: ['./listar-modalidad.component.css']
})
export class ListarModalidadComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  url: string = GeneralData.BUSSINESS_URL
  recordList: ModalidadModel[] = [];
  dataSource = new MatTableDataSource<ModalidadModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'nombre', 'formato', 'acciones'];

  constructor(
    private service: ModalidadService,
  ) { }

  ngAfterViewInit() { // Para definir por fuera del componente
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.GetRecordList()
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: ModalidadModel[]) => {
        this.dataSource.data = data; //Ejecuta el llenado de la tabla de Angular Material
      }
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

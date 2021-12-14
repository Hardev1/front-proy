import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estado-solicitud.model';
import { EstadoSolicitudService } from 'src/app/services/parametros/estado-solicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-estado-sol',
  templateUrl: './listar-estado-sol.component.html',
  styleUrls: ['./listar-estado-sol.component.css']
})
export class ListarEstadoSolComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recordList: EstadoSolicitudModel[] = [];
  dataSource = new MatTableDataSource<EstadoSolicitudModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  columnas = [
    { titulo: "ID", name: "id" },
    { titulo: "Nombre de la estado-solicitud", name: "nombre" }
  ];

  constructor(
    private service: EstadoSolicitudService,
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
      next: (data: EstadoSolicitudModel[]) => {
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


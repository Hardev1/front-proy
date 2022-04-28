import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipo-solicitud.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralData } from 'src/app/config/general-data';

@Component({
  selector: 'app-listar-tipo-sol',
  templateUrl: './listar-tipo-sol.component.html',
  styleUrls: ['./listar-tipo-sol.component.css']
})
export class ListarTipoSolComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  url: string = GeneralData.BUSSINESS_URL
  recordList: TipoSolicitudModel[] = [];
  dataSource = new MatTableDataSource<TipoSolicitudModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  columnas = [
    { titulo: "ID", name: "id" },
    { titulo: "Tipo de solicitud", name: "nombre" }
  ];

  constructor(
    private service: TipoSolicitudService,
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
      next: (data: TipoSolicitudModel[]) => {
        console.log(data)
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

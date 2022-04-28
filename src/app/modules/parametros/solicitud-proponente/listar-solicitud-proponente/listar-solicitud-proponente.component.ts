import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudProponenteModel } from 'src/app/models/parametros/solicitud-proponente.model';
import { SolicitudProponenteService } from 'src/app/services/parametros/solicitud-proponente.service';

@Component({
  selector: 'app-listar-solicitud-proponente',
  templateUrl: './listar-solicitud-proponente.component.html',
  styleUrls: ['./listar-solicitud-proponente.component.css']
})
export class ListarSolicitudProponenteComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  lista: SolicitudProponenteModel[] = []
  dataSource = new MatTableDataSource<SolicitudProponenteModel>(this.lista);
  displayedColumns: string[] = ['id', 'id_solicitud', 'id_proponente', 'acciones'];
  columnas = [
    { titulo: "Id", name: "id" },
    { titulo: "ID Solicitud", name: "id_solicitud" },
    { titulo: "ID Proponente", name: "id_proponente" }
  ];
  
  constructor(
    private Service: SolicitudProponenteService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.Service.GetRecordList().subscribe({
      next: (data: SolicitudProponenteModel[]) => {
        this.dataSource.data = data; //Ejecuta el llenado de la tabla de Angular Material
      }
    });
  };

  ngAfterViewInit() { // Para definir por fuera del componente
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

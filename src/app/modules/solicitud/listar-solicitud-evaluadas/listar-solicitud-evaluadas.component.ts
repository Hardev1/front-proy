import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';

@Component({
  selector: 'app-listar-solicitud-evaluadas',
  templateUrl: './listar-solicitud-evaluadas.component.html',
  styleUrls: ['./listar-solicitud-evaluadas.component.css']
})
export class ListarSolicitudEvaluadasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  url: string = GeneralData.BUSSINESS_URL
  recordList: SolicitudModel[] = [];
  dataSource = new MatTableDataSource<SolicitudModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'fecha', 'nombre_solicitud', 'archivo', 'descripcion', 'tiene_un', 'posee_un', 'pertenece_a', 'tiene_una', 'acciones'];
  columnas = [
    { titulo: "ID", name: "id" },
    { titulo: "Nombre de la solicitud", name: "nombre_solicitud" },
    { titulo: "Descripción", name: "descripcion" }
  ];
  colForaneas = [
    { titulo: "Tipo de Solicitud", name: "tiene_un" },
    { titulo: "Estado de Solicitud", name: "posee_un" },
    { titulo: "Modalidad", name: "pertenece_a" },
    { titulo: "Linea de investigación", name: "tiene_una" }
  ]


  constructor(
    private service: SolicitudService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngAfterViewInit() { // Para definir por fuera del componente
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.GetRecordList()
  }


  GetRecordList() {
    this.service.Evaluadas().subscribe({
      next: (data: SolicitudModel[]) => {
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
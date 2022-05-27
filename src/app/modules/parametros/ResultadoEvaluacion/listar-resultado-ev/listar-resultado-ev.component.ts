import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ResultadoEvaluacionModel } from 'src/app/models/parametros/resultado-evaluacion.model';
import { ResultadoEvaluacionService } from 'src/app/services/parametros/resultado-evaluacion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralData } from 'src/app/config/general-data';

@Component({
  selector: 'app-listar-resultado-ev',
  templateUrl: './listar-resultado-ev.component.html',
  styleUrls: ['./listar-resultado-ev.component.css']
})
export class ListarResultadoEvComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  url: string = GeneralData.BUSSINESS_URL
  recordList: ResultadoEvaluacionModel[] = [];
  dataSource = new MatTableDataSource<ResultadoEvaluacionModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'fecha', 'formato_diligenciado', 'descripcion', 'id_invitacion_evaluar', 'acciones'];
  columnas = [
    { titulo: "ID", name: "id" },
    { titulo: "Descripción", name: "descripcion" }
  ];
  colForaneas = [
    { titulo: "ID Invitación a Evaluar", name: "id_invitacion_evaluar" }
  ]

  constructor(
    private service: ResultadoEvaluacionService,
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
      next: (data: ResultadoEvaluacionModel[]) => {
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

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ResultadoEvaluacionModel } from 'src/app/models/parametros/resultado-evaluacion.model';
import { ResultadoEvaluacionService } from 'src/app/services/parametros/resultado-evaluacion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-resultado-ev',
  templateUrl: './listar-resultado-ev.component.html',
  styleUrls: ['./listar-resultado-ev.component.css']
})
export class ListarResultadoEvComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recordList: ResultadoEvaluacionModel[] = [];
  dataSource = new MatTableDataSource<ResultadoEvaluacionModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'fecha', 'formato_diligenciado', 'descripcion', 'tiene_una'];
  columnas = [
    { titulo: "ID", name: "id" },
    { titulo: "Formato Diligenciado", name: "formato_diligenciado" },
    { titulo: "Descripción", name: "descripcion" }
  ];
  colForaneas = [
    { titulo: "Invitación a Evaluar", name: "tiene_una" }
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

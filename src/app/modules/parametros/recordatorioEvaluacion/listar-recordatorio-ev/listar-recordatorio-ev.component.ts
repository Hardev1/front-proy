import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { RecordatorioModel } from 'src/app/models/parametros/recordatorio.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';
import { RecordatorioService } from 'src/app/services/parametros/recordatorio.service';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';

@Component({
  selector: 'app-listar-recordatorio-ev',
  templateUrl: './listar-recordatorio-ev.component.html',
  styleUrls: ['./listar-recordatorio-ev.component.css']
})
export class ListarRecordatorioEvComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listaRecordatorio: RecordatorioModel[] = [];
  listaInvEvaluar: InvitacionEvaluarModel[] = [];
  listaSolicitudes: SolicitudModel[] = [];
  listaJurados: JuradoModel[] = [];
  dataSource = new MatTableDataSource<RecordatorioModel>(this.listaRecordatorio);
  displayedColumns: string[] = ['id', 'fecha', 'tipo_recordatorio', 'id_invitacion_evaluar', 'descripcion', 'acciones'];

  constructor(
    private invEvaluarService: InvitacionEvaluarService,
    private recordatorioService: RecordatorioService,
    private solicitudService: SolicitudService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
    this.GetIdInvList();
    this.GetSolList();
  }

  GetRecordList() {
    this.recordatorioService.GetRecordList().subscribe({
      next: (data: RecordatorioModel[]) => {
        this.dataSource.data = data; //Ejecuta el llenado de la tabla de Angular Material
      }
    });
    console.log(this.listaRecordatorio)
  };

  GetIdInvList() {
    this.listaRecordatorio.forEach(element => {
        console.log(element)
        let idInv = Number(element.id_invitacion_evaluar)
        this.invEvaluarService.SearchRecord(idInv).subscribe({
          next: (value: InvitacionEvaluarModel) => {
            this.listaInvEvaluar.push(value);
          }
        });
      
    });
  }

  GetSolList() {
    this.listaInvEvaluar.forEach(element => {
      if (element){
        let idInv = Number(element.id_solicitud)
        this.solicitudService.SearchRecord(idInv).subscribe({
          next: (value: InvitacionEvaluarModel) => {
            this.listaSolicitudes.push(value);
          }
        });
      }
    });
  }

  ngAfterViewInit() { // Para definir por fuera del componente
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

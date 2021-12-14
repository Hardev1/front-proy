import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordatorioModel } from 'src/app/models/parametros/recordatorio.model';
import { RecordatorioService } from 'src/app/services/parametros/recordatorio.service';
import { ResultadoEvaluacionService } from 'src/app/services/parametros/resultado-evaluacion.service';

@Component({
  selector: 'app-eliminar-recordatorio-ev',
  templateUrl: './eliminar-recordatorio-ev.component.html',
  styleUrls: ['./eliminar-recordatorio-ev.component.css']
})
export class EliminarRecordatorioEvComponent implements OnInit {

  id:any
  nombre: string | undefined = ""

  constructor(
    private router: Router,
    private service: RecordatorioService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    this.id = parseInt(this.route.snapshot.params["id"]);
  }

  RemoveRecord() {
    console.log(this.id)
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: RecordatorioModel) => {
        this.router.navigate(["/parametros/listar-recordatorio-evaluacion"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

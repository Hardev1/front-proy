import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultadoEvaluacionModel } from 'src/app/models/parametros/resultado-evaluacion.model';
import { ResultadoEvaluacionService } from 'src/app/services/parametros/resultado-evaluacion.service';

@Component({
  selector: 'app-eliminar-resultado-ev',
  templateUrl: './eliminar-resultado-ev.component.html',
  styleUrls: ['./eliminar-resultado-ev.component.css']
})
export class EliminarResultadoEvComponent implements OnInit {

  id:any
  nombre: string | undefined = ""

  constructor(
    private router: Router,
    private service: ResultadoEvaluacionService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ResultadoEvaluacionModel) => {
        if(data.id){
        this.id = data.id
      }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: ResultadoEvaluacionModel) => {
        this.router.navigate(["/parametros/listar-resultado-evaluacion"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo-vinculacion.model';
import { TipoVinculacionService } from 'src/app/services/parametros/tipo-vinculacion.service';

@Component({
  selector: 'app-eliminar-tipo-vinc',
  templateUrl: './eliminar-tipo-vinc.component.html',
  styleUrls: ['./eliminar-tipo-vinc.component.css']
})
export class EliminarTipoVincComponent implements OnInit {

  id:any
  nombre: string | undefined = ""

  constructor(
    private router: Router,
    private service: TipoVinculacionService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: TipoVinculacionModel) => {
        if(data.id && data.nombre ){
        this.id = data.id
        this.nombre = data.nombre
      }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: TipoVinculacionModel) => {
        this.router.navigate(["/parametros/listar-tipo-vinculacion"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

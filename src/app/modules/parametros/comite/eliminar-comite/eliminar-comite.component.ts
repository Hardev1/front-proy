import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { ComiteService } from 'src/app/services/parametros/comite.service';

@Component({
  selector: 'app-eliminar-comite',
  templateUrl: './eliminar-comite.component.html',
  styleUrls: ['./eliminar-comite.component.css']
})
export class EliminarComiteComponent implements OnInit {

  id:any
  nombre: string | undefined = ""

  constructor(
    private router: Router,
    private service: ComiteService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ComiteModel) => {
        if(data.id && data.nombre ){
        this.id = data.id
        this.nombre = data.nombre
      }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: ComiteModel) => {
        this.router.navigate(["/parametros/listar-comite"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}


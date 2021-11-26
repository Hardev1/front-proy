import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';

@Component({
  selector: 'app-eliminar-proponente',
  templateUrl: './eliminar-proponente.component.html',
  styleUrls: ['./eliminar-proponente.component.css']
})
export class EliminarProponenteComponent implements OnInit {

  id:any
  nombre: string | undefined = ""

  constructor(
    private router: Router,
    private service: ProponenteService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ProponenteModel) => {
        if(data.id && data.primerNombre){
        this.id = data.id
        this.nombre = data.primerNombre
      }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: ProponenteModel) => {
        this.router.navigate(["/parametros/listar-proponente"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoProponenteModel } from 'src/app/models/parametros/proponente-departamento.model';
import { DepartamentoProponenteService } from 'src/app/services/parametros/proponente-departamento.service';

@Component({
  selector: 'app-eliminar-proponente-departamento',
  templateUrl: './eliminar-proponente-departamento.component.html',
  styleUrls: ['./eliminar-proponente-departamento.component.css']
})
export class EliminarProponenteDepartamentoComponent implements OnInit {

  id:any

  constructor(
    private router: Router,
    private service: DepartamentoProponenteService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: DepartamentoProponenteModel) => {
        if(data.id){
        this.id = data.id
        }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: DepartamentoProponenteModel) => {
        this.router.navigate(["/parametros/listar-proponente-departamento"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}


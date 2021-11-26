import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { JuradoService } from 'src/app/services/parametros/jurado.service';

@Component({
  selector: 'app-eliminar-jurado',
  templateUrl: './eliminar-jurado.component.html',
  styleUrls: ['./eliminar-jurado.component.css']
})
export class EliminarJuradoComponent implements OnInit {

 
  id: number = 0

  constructor(
    private router: Router,
    private service: JuradoService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }


  SearchRecord() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: JuradoModel) => {
        if(data.id){  
        this.id = data.id
      }
    },
      error: () =>{

      }
    })

    
}
  

  RemoveRecord() {

    this.service.RemoveRecord(this.id).subscribe({
      next: (data: JuradoModel) => {
        this.router.navigate(["/parametros/listar-jurado"]);
      },
      error: (err: any) => {
      }
    });
  }
  close() {
    this.dialog.closeAll();
  }



}

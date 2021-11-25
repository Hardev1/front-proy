import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RolModel } from 'src/app/modules/shared/modelos/rol.model';
import { RolService } from 'src/app/services/shared/rol.service';
@Component({
  selector: 'app-eliminar-rol',
  templateUrl: './eliminar-rol.component.html',
  styleUrls: ['./eliminar-rol.component.css']
})
export class EliminarRolComponent implements OnInit {

  _id:any
  nombre: string | undefined = ""

  constructor(
    private router: Router,
    private service: RolService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let _id = this.route.snapshot.params["_id"];
    this.service.SearchRecord(_id).subscribe({
      next: (data: RolModel) => {
        if(data._id && data.nombre ){
        this._id = data._id
        this.nombre = data.nombre
      }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this._id).subscribe({
      next: (data: RolModel) => {
        this.router.navigate(["/seguridad/listar-rol"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

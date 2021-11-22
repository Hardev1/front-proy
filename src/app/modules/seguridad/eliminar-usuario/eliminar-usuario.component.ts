import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {


  _id: string = ""
  nombre: string = ""
  apellido: string = ""
  documento: string = ""

  constructor(
    private router: Router,
    private service: UsuarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }


  SearchRecord() {
    let id = this.route.snapshot.params["id"];
    this.service.SearchRecord(id).subscribe({
      next: (data: UsuarioModel) => {
        //NO LE COLOQUE MAS PROPIEDADES PARA MOSTRAR EN EL HTML PORQUE SI NO 
        // SE LLENA DE && ESE CONDICIONAL
        if (data._id && data.nombre && data.apellido && data.documento) {
          this._id = data._id
          this.nombre = data.nombre
          this.apellido = data.apellido
          this.documento = data.documento
        }
      }
    });
  }

  RemoveRecord() {

    this.service.RemoveRecord(this._id).subscribe({
      next: (data: UsuarioModel) => {
        this.router.navigate(["/seguridad/listar-usuario"]);
      },
      error: (err: any) => {
      }
    });
  }

}

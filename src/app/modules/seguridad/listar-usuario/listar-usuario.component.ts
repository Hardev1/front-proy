import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  //FALTARIA CREAR UN MODELO PARA LOS ESTADOS Y ASI PODER TRAER EL NOMBRE DEL ESTADO
   
  listaUsuario: UsuarioModel[] = []
  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
   this.GetRecordList();
  }

  GetRecordList() {
    this.usuarioService.GetRecordList().subscribe({
      next: (data: UsuarioModel[]) => {
        this.listaUsuario = data;
        console.log(this.listaUsuario);
        
      }
    });
  }


}

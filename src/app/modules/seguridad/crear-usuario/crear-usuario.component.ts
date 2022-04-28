import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioRolModel } from 'src/app/models/parametros/usuario-rol.model';
import { RolService } from 'src/app/services/shared/rol.service';
import { UsuarioService } from 'src/app/services/shared/usuario.service';
import { UsuarioRolService } from 'src/app/services/parametros/usuario-rol.service';
import { InfoComponent } from '../../shared/components/modals/info/info.component';
import { RolModel } from '../../shared/modelos/rol.model';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  listRol: RolModel[] = [];
  lista: string[] = []  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UsuarioService,
    private usuarioRolservice: UsuarioRolService,
    private rolService: RolService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.GetRecordList()
  }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      documento: ["", [Validators.required, Validators.minLength(GeneralData.DOCUMENT_MIN_LENGHT)]],
      email: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.required, Validators.minLength(GeneralData.CELLPHONE_MIN_LENGHT)]],
      fechaNacimiento: ["", [Validators.required]],
      rol: ["", [Validators.required]] 
    });
  }
  
  SaveRecord() {
    this.lista = this.form.controls.rol.value
    let model = new UsuarioModel();
    model.nombre = this.form.controls.nombre.value;
    model.apellido = this.form.controls.apellido.value;
    model.telefono = this.form.controls.telefono.value;
    model.email = this.form.controls.email.value;
    model.documento = this.form.controls.documento.value;
    model.fechaNacimiento = this.form.controls.fechaNacimiento.value;
    model.clave = "string";
    this.service.SaveRecord(model).subscribe({
      next: (data: UsuarioModel) => {
        this.lista.forEach(element => {
          console.log(element)
          let modelo = new UsuarioRolModel();
          modelo.id_user = data._id
          modelo.id_rol = element
          this.usuarioRolservice.SaveRecord(modelo).subscribe({
            next: (d: UsuarioRolModel) => {
              
            }
          })
        })
         
        this.router.navigate(["/seguridad/listar-usuario"]);
      },
      error: (err: any) => {
      }
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

  GetRecordList() {
    this.rolService.GetRecordList().subscribe({
      next: (data: RolModel[]) => {
        this.listRol = data;

      }
    });
  }

}

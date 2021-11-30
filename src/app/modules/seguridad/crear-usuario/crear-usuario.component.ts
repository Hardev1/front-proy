import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { RolService } from 'src/app/services/shared/rol.service';
import { UsuarioService } from 'src/app/services/shared/usuario.service';
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
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UsuarioService,
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
      fechaNacimiento: ["", [Validators.required]]
  
    });
  }

  SaveRecord() {
    let model = new UsuarioModel();
    model.nombre = this.form.controls.nombre.value;
    model.apellido = this.form.controls.apellido.value;
    model.telefono = this.form.controls.telefono.value;
    model.email = this.form.controls.email.value;
    model.documento = this.form.controls.documento.value;
    model.fechaNacimiento = this.form.controls.fechaNacimiento.value;
    this.service.SaveRecord(model).subscribe({
      next: (data: UsuarioModel) => {
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

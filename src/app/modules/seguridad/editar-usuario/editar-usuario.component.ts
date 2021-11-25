import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { RolData } from 'src/app/models/sesion/rol-data.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { RolService } from 'src/app/services/shared/rol.service';
import { UsuarioService } from 'src/app/services/shared/usuario.service';
import { InfoComponent } from '../../shared/components/modals/info/info.component';
import { RolModel } from '../../shared/modelos/rol.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  rolList: RolModel[] = []
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UsuarioService,
    private rolService: RolService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      _id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      documento: ["", [Validators.required, Validators.minLength(GeneralData.DOCUMENT_MIN_LENGHT)]],
      telefono: ["", [Validators.required, Validators.min(GeneralData.CELLPHONE_MIN_LENGHT)]],
      fechaNacimiento: ["", [Validators.required]],
      estado: ["", [Validators.required]]
    });
  }

  SearchRecord(){
    let id = this.route.snapshot.params["id"];
    this.service.SearchRecord(id).subscribe({
      next: (data: UsuarioModel) => {
        this.form.controls._id.setValue(data._id);
        this.form.controls.nombre.setValue(data.nombre);
        this.form.controls.apellido.setValue(data.apellido);
        this.form.controls.email.setValue(data.email);
        this.form.controls.telefono.setValue(data.telefono);
        this.form.controls.documento.setValue(data.documento);
        this.form.controls.fechaNacimiento.setValue(`${data.fechaNacimiento}`);
        this.form.controls.estado.setValue(data.estado)
      }
    });
  }

  SaveRecord() {
    let model = new UsuarioModel();
    model.nombre = this.form.controls.nombre.value;
    model._id = this.form.controls._id.value;
    model.apellido = this.form.controls.apellido.value;
    model.telefono = this.form.controls.telefono.value;
    model.fechaNacimiento = this.form.controls.fechaNacimiento.value;
    model.email = this.form.controls.email.value;
    model.apellido = this.form.controls.apellido.value;
    model.documento = this.form.controls.documento.value;
    model.estado = parseInt(this.form.controls.estado.value);
    this.service.EditRecord(model).subscribe({
      next: (data: UsuarioModel) => {
        this.router.navigate(["/seguridad/listar-usuario"]);
      },
      error: (err: any) => {
      }
    });
  }

  GetRecordList() {
    this.rolService.GetRecordList().subscribe({
      next: (data: RolModel[]) => {
        this.rolList = data;
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

  get GetForm() {
    return this.form.controls;
  }

}






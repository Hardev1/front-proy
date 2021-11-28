import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { JuradoService } from 'src/app/services/parametros/jurado.service';

@Component({
  selector: 'app-actualizar-jurado',
  templateUrl: './actualizar-jurado.component.html',
  styleUrls: ['./actualizar-jurado.component.css']
})
export class ActualizarJuradoComponent implements OnInit {

  listaJurado: JuradoModel[] = []
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: JuradoService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      documento: ["", [Validators.required, Validators.minLength(GeneralData.DOCUMENT_MIN_LENGHT)]],
      email: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.required, Validators.minLength(GeneralData.CELLPHONE_MIN_LENGHT)]],
      fechaNacimiento: ["", [Validators.required]],
      entidad: ["", [Validators.required]]
    });
  }

  SearchRecord() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: JuradoModel) => {      
        this.form.controls.id.setValue(data.id);
        this.form.controls.nombre.setValue(data.nombre);
        this.form.controls.apellido.setValue(data.apellido);
        this.form.controls.telefono.setValue(data.telefono);
        this.form.controls.documento.setValue(data.documento);
        this.form.controls.email.setValue(data.email);
        this.form.controls.entidad.setValue(data.entidad);
        this.form.controls.fechaNacimiento.setValue(`${data.fechaNacimiento}`);
      }
    });
  }

  SaveRecord() {
    let model = new JuradoModel();
    model.id = this.form.controls.id.value;
    model.nombre = this.form.controls.nombre.value;
    model.apellido = this.form.controls.apellido.value;
    model.telefono = this.form.controls.telefono.value;
    model.email = this.form.controls.email.value;
    model.documento = this.form.controls.documento.value;
    model.fechaNacimiento = this.form.controls.fechaNacimiento.value;
    model.entidad = this.form.controls.entidad.value;
    this.service.EditRecord(model).subscribe({
      next: (data: JuradoModel) => {
        this.router.navigate(["/parametros/listar-jurado"]);
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


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { JuradoService } from 'src/app/services/parametros/jurado.service';

@Component({
  selector: 'app-crear-jurado',
  templateUrl: './crear-jurado.component.html',
  styleUrls: ['./crear-jurado.component.css']
})
export class CrearJuradoComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: JuradoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      documento: ["", [Validators.required, Validators.minLength(GeneralData.DOCUMENT_MIN_LENGHT)]],
      email: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.required, Validators.minLength(GeneralData.CELLPHONE_MIN_LENGHT)]],
      fechaNacimiento: ["", [Validators.required]],
      entidad: ["", [Validators.required]]
  
    });
  }

  SaveRecord() {
    let model = new JuradoModel();
    model.nombre = this.form.controls.nombre.value;
    model.apellido = this.form.controls.apellido.value;
    model.telefono = this.form.controls.telefono.value;
    model.correo = this.form.controls.email.value;
    model.documento = this.form.controls.documento.value;
    model.fechaNacimiento = this.form.controls.fechaNacimiento.value;
    model.entidad = this.form.controls.entidad.value;
    this.service.SaveRecord(model).subscribe({
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

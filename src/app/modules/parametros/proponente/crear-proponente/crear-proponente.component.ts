import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo-vinculacion.model';
import { TipoVinculacionService } from 'src/app/services/parametros/tipo-vinculacion.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';

@Component({
  selector: 'app-crear-proponente',
  templateUrl: './crear-proponente.component.html',
  styleUrls: ['./crear-proponente.component.css']
})
export class CrearProponenteComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipoVinList: TipoVinculacionModel[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private solicitudService: ProponenteService,
    private tipoVinService: TipoVinculacionService,
    public dialog: MatDialog
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      primer_nombre: ["", [Validators.required]],
      otros_nombres: ["", [Validators.required]],
      primer_apellido: ["", [Validators.required]],
      segundo_apellido: ["", [Validators.required]],
      documento: ["", [Validators.required]],
      fecha_nacimiento: ["", [Validators.required]],
      email: ["", [Validators.required]],
      celular: ["", [Validators.required]],
      fotografia: ["", [Validators.required]],
      id_tipo_vinculacion: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SaveRecord() {
    let model = new ProponenteModel();  
    model.primer_nombre = this.form.controls.primer_nombre.value;
    model.otros_nombres = this.form.controls.otros_nombres.value;
    model.primer_apellido = this.form.controls.primer_apellido.value;
    model.segundo_apellido = this.form.controls.segundo_apellido.value;
    model.documento = this.form.controls.documento.value;
    model.fecha_nacimiento = this.form.controls.fecha_nacimiento.value;
    model.email = this.form.controls.email.value;
    model.celular = this.form.controls.celular.value;
    model.fotografia = this.form.controls.fotografia.value;
    model.id_tipo_vinculacion = parseInt(this.form.controls.id_tipo_vinculacion.value);
    
    this.solicitudService.SaveRecord(model).subscribe({
      next: (data: ProponenteModel) => {
        this.router.navigate(["parametros/listar-proponente"]);
      },
      error: (err: any) => {
      }
    });
  }

  GetRecordList() {
    this.tipoVinService.GetRecordList().subscribe({
      next: (data: TipoVinculacionModel[]) => {
        this.tipoVinList = data;
      }
    });
  }

  ngOnInit(): void {
    this.CreateForm();
    this.GetRecordList();
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

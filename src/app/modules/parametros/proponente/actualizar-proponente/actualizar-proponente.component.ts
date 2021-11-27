import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo-vinculacion.model';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { TipoVinculacionService } from 'src/app/services/parametros/tipo-vinculacion.service';
import { InfoComponent } from '../../../shared/components/modals/info/info.component';

@Component({
  selector: 'app-actualizar-proponente',
  templateUrl: './actualizar-proponente.component.html',
  styleUrls: ['./actualizar-proponente.component.css']
})
export class ActualizarProponenteComponent implements OnInit {

  //CAMBIAR NOMBRES DE LAS VARIABLES A LOS METODOS TAL Y COMO ES EN EL MODELO DE PROPONENTE

  form: FormGroup = new FormGroup({});
  tipoVinList: TipoVinculacionModel[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ProponenteService,
    private route: ActivatedRoute,
    private tipoVinService: TipoVinculacionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.GetRecordList();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
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

  GetRecordList() {
    this.tipoVinService.GetRecordList().subscribe({
      next: (data: TipoVinculacionModel[]) => {
        this.tipoVinList = data;
      }
    });
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ProponenteModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.primer_nombre.setValue(data.primer_nombre);
        this.form.controls.otros_nombres.setValue(data.otros_nombres);
        this.form.controls.primer_apellido.setValue(data.primer_apellido);
        this.form.controls.segundo_apellido.setValue(data.segundo_apellido);
        this.form.controls.documento.setValue(`${data.documento}`);
        this.form.controls.fecha_nacimiento.setValue(`${data.fecha_nacimiento}`);
        this.form.controls.email.setValue(`${data.email}`);
        this.form.controls.celular.setValue(`${data.celular}`);
        this.form.controls.fotografia.setValue(`${data.fotografia}`);
        this.form.controls.id_tipo_vinculacion.setValue(`${data.id_tipo_vinculacion}`);
      }
    });
  }

  SaveRecord() {
    let model = new ProponenteModel();
    model.id = this.form.controls.id.value;
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
    this.service.EditRecord(model).subscribe({
      next: (data: ProponenteModel) => {
        this.router.navigate(["/parametros/listar-proponente"]);
      },
      error: (err: any) => {
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }


}

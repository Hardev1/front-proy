import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo-vinculacion.model';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { TipoVinculacionService } from 'src/app/services/parametros/tipo-vinculacion.service';
import { InfoComponent } from '../../../shared/components/modals/info/info.component';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';
import { GeneralData } from 'src/app/config/general-data';

@Component({
  selector: 'app-actualizar-proponente',
  templateUrl: './actualizar-proponente.component.html',
  styleUrls: ['./actualizar-proponente.component.css']
})
export class ActualizarProponenteComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  tipoVinList: TipoVinculacionModel[] = [];
  formFile: FormGroup = new FormGroup({});
  url: string= GeneralData.BUSSINESS_URL;
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

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
    this.CreateFormFile();
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
      id_tipo_vinculacion: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  CreateFormFile(){
    this.formFile = this.fb.group({
      file:["", []]
    });
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
    model.fotografia = this.uploadedFilename;
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

  OnchangeInputFile(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.formFile.controls["file"].setValue(file);
    }
  }

  UploadImage(){
    const formData = new FormData();
    formData.append("file", this.formFile.controls["file"].value);
    this.service.UploadFile(formData).subscribe({
      next: (data: UploadedFileModel) =>{
        this.uploadedFilename = data.filename;
        this.uploadedFile = true;
      }
    });
  }

}

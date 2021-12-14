import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultadoEvaluacionModel } from 'src/app/models/parametros/resultado-evaluacion.model';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { ResultadoEvaluacionService } from 'src/app/services/parametros/resultado-evaluacion.service';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';
import { InfoComponent } from '../../../shared/components/modals/info/info.component';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';
import { GeneralData } from 'src/app/config/general-data';
import { ArchivosService } from 'src/app/services/parametros/archivos.service';

@Component({
  selector: 'app-actualizar-resultado-ev',
  templateUrl: './actualizar-resultado-ev.component.html',
  styleUrls: ['./actualizar-resultado-ev.component.css']
})
export class ActualizarResultadoEvComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  tipoVinList: InvitacionEvaluarModel[] = [];
  formFile: FormGroup = new FormGroup({});
  url: string= GeneralData.BUSSINESS_URL;
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ResultadoEvaluacionService,
    private archivosService: ArchivosService,
    private route: ActivatedRoute,
    private tipoVinService: InvitacionEvaluarService,
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
      fecha: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      id_invitacion_evaluar: ["", [Validators.required]],
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
      next: (data: InvitacionEvaluarModel[]) => {
        this.tipoVinList = data;
      }
    });
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ResultadoEvaluacionModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.fecha.setValue(data.fecha);
        this.form.controls.descripcion.setValue(data.descripcion);
        this.form.controls.id_invitacion_evaluar.setValue(`${data.id_invitacion_evaluar}`);
      }
    });
  }

  SaveRecord() {
    let model = new ResultadoEvaluacionModel();
    model.id = this.form.controls.id.value;
    model.fecha = this.form.controls.fecha.value;
    model.descripcion = this.form.controls.descripcion.value;
    model.formato_diligenciado = this.uploadedFilename;
    model.id_invitacion_evaluar = parseInt(this.form.controls.id_invitacion_evaluar.value);
    this.service.EditRecord(model).subscribe({
      next: (data: ResultadoEvaluacionModel) => {
        this.router.navigate(["/parametros/listar-resultado-evaluacion"]);
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

  UploadFile(){
    const formData = new FormData();
    formData.append("file", this.formFile.controls["file"].value);
    this.archivosService.UploadFile(formData).subscribe({
      next: (data: UploadedFileModel) =>{
        this.uploadedFilename = data.filename;
        this.uploadedFile = true;
      }
    });
  }

}

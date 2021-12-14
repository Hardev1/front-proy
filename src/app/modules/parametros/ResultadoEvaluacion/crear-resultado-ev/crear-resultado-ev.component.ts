import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadoEvaluacionModel } from 'src/app/models/parametros/resultado-evaluacion.model';
import { ResultadoEvaluacionService } from 'src/app/services/parametros/resultado-evaluacion.service';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { GeneralData } from 'src/app/config/general-data';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArchivosService } from 'src/app/services/parametros/archivos.service';

@Component({
  selector: 'app-crear-resultado-ev',
  templateUrl: './crear-resultado-ev.component.html',
  styleUrls: ['./crear-resultado-ev.component.css']
})
export class CrearResultadoEvComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  invEvaluarList: InvitacionEvaluarModel[] = [];
  formFile: FormGroup = new FormGroup({});
  url: string = GeneralData.BUSSINESS_URL;
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private resultadoEvaluacionService: ResultadoEvaluacionService,
    private lineaInvService: InvitacionEvaluarService,
    private archivosService: ArchivosService,
    public dialog: MatDialog
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      id_invitacion_evaluar: ["", [Validators.required]],
    });
  }

  CreateFormFile() {
    this.formFile = this.fb.group({
      file: ["", []]
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  get GetFormFile() {
    return this.formFile.controls;
  }

  SaveRecord() {
    let model = new ResultadoEvaluacionModel();
    model.id = this.form.controls.id.value;
    model.descripcion = this.form.controls.descripcion.value;
    model.id_invitacion_evaluar = parseInt(this.form.controls.id_invitacion_evaluar.value);
    model.formato_diligenciado = this.uploadedFilename;
    this.resultadoEvaluacionService.EditRecord(model).subscribe({
      next: (data: ResultadoEvaluacionModel) => {
        this.router.navigate(["/parametros/listar-resultado-evaluacion"]);
      },
      error: (err: any) => {
      }
    });
  }

  GetRecordList() {
    this.lineaInvService.GetRecordList().subscribe({
      next: (data: InvitacionEvaluarModel[]) => {
        this.invEvaluarList = data;
        this.invEvaluarList.forEach(invEvaluar => {
          console.log(invEvaluar.pertenece_a?.nombre);
        });
        
      }
    });
  }

  ngOnInit(): void {
    this.CreateForm();
    this.GetRecordList();
    this.CreateFormFile();
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }
  OnchangeInputFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formFile.controls["file"].setValue(file);
    }
  }

  UploadFile() {
    const formData = new FormData();
    formData.append("file", this.formFile.controls["file"].value);
    this.archivosService.UploadFile(formData).subscribe({
      next: (data: UploadedFileModel) => {
        this.uploadedFilename = data.filename;
        this.uploadedFile = true;
      }
    });
  }

}
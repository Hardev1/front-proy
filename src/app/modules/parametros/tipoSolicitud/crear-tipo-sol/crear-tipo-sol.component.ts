import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipo-solicitud.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { GeneralData } from 'src/app/config/general-data';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';
import { ArchivosService } from 'src/app/services/parametros/archivos.service';

@Component({
  selector: 'app-crear-tipo-sol',
  templateUrl: './crear-tipo-sol.component.html',
  styleUrls: ['./crear-tipo-sol.component.css']
})
export class CrearTipoSolComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formFile: FormGroup = new FormGroup({});
  url: string= GeneralData.BUSSINESS_URL;
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private TipoSolicitudService: TipoSolicitudService,
    private archivosService: ArchivosService,
    public dialog: MatDialog
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
    });
  }

  CreateFormFile(){
    this.formFile = this.fb.group({
      file:["", []]
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  get GetFormFile() {
    return this.formFile.controls;
  }

  SaveRecord() {
    let model = new TipoSolicitudModel();
    model.nombre = this.form.controls.nombre.value;
    model.formato = this.uploadedFilename;
    
    this.TipoSolicitudService.SaveRecord(model).subscribe({
      next: (data: TipoSolicitudModel) => {
        this.router.navigate(["parametros/listar-tipo-solicitud"]);
      },
      error: (err: any) => {
      }
    });
  }

  ngOnInit(): void {
    this.CreateForm();
    this.CreateFormFile();
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

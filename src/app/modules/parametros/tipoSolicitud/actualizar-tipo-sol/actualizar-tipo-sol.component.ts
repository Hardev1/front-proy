import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipo-solicitud.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { GeneralData } from 'src/app/config/general-data';
import { ArchivosService } from 'src/app/services/parametros/archivos.service';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';

@Component({
  selector: 'app-actualizar-tipo-sol',
  templateUrl: './actualizar-tipo-sol.component.html',
  styleUrls: ['./actualizar-tipo-sol.component.css']
})
export class ActualizarTipoSolComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formFile: FormGroup = new FormGroup({});
  url: string= GeneralData.BUSSINESS_URL;
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;
   
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TipoSolicitudService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public archivosService: ArchivosService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
    this.CreateFormFile();
  }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
    });
  }


  CreateFormFile(){
    this.formFile = this.fb.group({
      file:["", []]
    });
  }

  get GetFormFile() {
    return this.formFile.controls;
  }

  get GetForm() {
    return this.form.controls;
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: TipoSolicitudModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.nombre.setValue(data.nombre);
        this.formFile.controls.file.setValue(data.formato)
      }
    });
  }

  SaveRecord() {
    let model = new TipoSolicitudModel();
    model.id = this.form.controls.id.value;
    model.nombre = this.form.controls.nombre.value;
    model.formato = this.uploadedFilename;
    this.service.EditRecord(model).subscribe({
      next: (data: TipoSolicitudModel) => {
        this.router.navigate(["/parametros/listar-tipo-solicitud"]);
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

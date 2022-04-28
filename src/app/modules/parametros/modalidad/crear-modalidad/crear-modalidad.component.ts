import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { ModalidadService } from 'src/app/services/parametros/modalidad.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/create/create.component';
import { ArchivosService } from 'src/app/services/parametros/archivos.service';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';

@Component({
  selector: 'app-crear-modalidad',
  templateUrl: './crear-modalidad.component.html',
  styleUrls: ['./crear-modalidad.component.css']
})
export class CrearModalidadComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formFile: FormGroup = new FormGroup({});
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ModalidadService: ModalidadService,
    private archivosService: ArchivosService,
    public dialog: MatDialog
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]]
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
    let model = new ModalidadModel();
    model.nombre = this.form.controls.nombre.value;
    model.formato = this.uploadedFilename;
    
    this.ModalidadService.SaveRecord(model).subscribe({
      next: (data: ModalidadModel) => {
        this.router.navigate(["parametros/listar-modalidad"]);
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

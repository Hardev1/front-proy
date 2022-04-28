import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { ModalidadService } from 'src/app/services/parametros/modalidad.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { ArchivosService } from 'src/app/services/parametros/archivos.service';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';

@Component({
  selector: 'app-actualizar-modalidad',
  templateUrl: './actualizar-modalidad.component.html',
  styleUrls: ['./actualizar-modalidad.component.css']
})
export class ActualizarModalidadComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formFile: FormGroup = new FormGroup({});
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ModalidadService,
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

  get GetForm() {
    return this.form.controls;
  }

  get GetFormFile() {
    return this.formFile.controls;
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ModalidadModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.nombre.setValue(data.nombre);
        this.uploadedFilename = data.formato
      }
    });
  }

  SaveRecord() {
    let model = new ModalidadModel();
    model.id = this.form.controls.id.value;
    model.nombre = this.form.controls.nombre.value;
    model.formato = this.uploadedFilename;
    this.service.EditRecord(model).subscribe({
      next: (data: ModalidadModel) => {
        this.router.navigate(["/parametros/listar-modalidad"]);
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

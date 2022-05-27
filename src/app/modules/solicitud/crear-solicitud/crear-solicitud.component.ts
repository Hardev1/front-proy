import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipo-solicitud.model';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea-investigacion.model';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
import { LineaInvestigacionService } from 'src/app/services/parametros/linea-investigacion.service';
import { ModalidadService } from 'src/app/services/parametros/modalidad.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/create/create.component';
import { GeneralData } from 'src/app/config/general-data';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';
import { ArchivosService } from 'src/app/services/parametros/archivos.service';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { SolicitudProponenteModel } from 'src/app/models/parametros/solicitud-proponente.model';
import { SolicitudProponenteService } from 'src/app/services/parametros/solicitud-proponente.service';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  tipoSolList: TipoSolicitudModel[] = []
  lineaInvList: LineaInvestigacionModel[] = []
  modalidadList: ModalidadModel[] = []
  proponenteList: ProponenteModel[] = []
  
  formFile: FormGroup = new FormGroup({});
  url: string= GeneralData.BUSSINESS_URL;
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private solicitudService: SolicitudService,
    private solicitudProponenteService: SolicitudProponenteService,
    private archivosService: ArchivosService,
    private tipoSolService: TipoSolicitudService,
    private lineaInvService: LineaInvestigacionService,
    private modalidadService: ModalidadService,
    private proponenteService: ProponenteService,
    public dialog: MatDialog
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      fecha: ["",[Validators.required]],    
      nombre_solicitud: ["",[Validators.required]],
      descripcion: ["",[]],
      id_tipo_solicitud: ["",[Validators.required]],
      id_modalidad: ["",[Validators.required]],
      id_linea_investigacion: ["",[Validators.required]],
      id_proponente: ["",[Validators.required]]
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
    let model = new SolicitudModel();
    let union = new SolicitudProponenteModel();
    model.fecha = this.form.controls.fecha.value;
    model.nombre_solicitud = this.form.controls.nombre_solicitud.value;
    model.descripcion = this.form.controls.descripcion.value;
    model.id_modalidad = parseInt(this.form.controls.id_modalidad.value);
    model.id_linea_investigacion = parseInt(this.form.controls.id_linea_investigacion.value);
    model.id_tipo_solicitud = parseInt(this.form.controls.id_tipo_solicitud.value);
    model.archivo = this.uploadedFilename;
    union.id_proponente = parseInt(this.form.controls.id_proponente.value);
    console.log(model);
    
    this.solicitudService.SaveRecord(model).subscribe({
      next: (data: SolicitudModel) => {
        union.id_solicitud = data.id,
        console.log(union);
        
        this.solicitudProponenteService.SaveRecord(union).subscribe({
          next: (data: SolicitudProponenteModel) => {
            this.router.navigate(["solicitud/listar-solicitud"]);
          },
          error: (err: any) => {
          }
        });
      },
      error: (err: any) => {
      }
    });
  }

  GetRecordList() {
    this.tipoSolService.GetRecordList().subscribe({
      next: (data: TipoSolicitudModel[]) => {
        this.tipoSolList = data;
      }
    });
    this.modalidadService.GetRecordList().subscribe({
      next: (data: ModalidadModel[]) => {
        this.modalidadList = data;
      }
    });
    this.lineaInvService.GetRecordList().subscribe({
      next: (data: LineaInvestigacionModel[]) => {
        this.lineaInvList = data;
      }
    });
    this.proponenteService.GetRecordList().subscribe({
      next: (data: ProponenteModel[]) => {
        this.proponenteList = data;
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

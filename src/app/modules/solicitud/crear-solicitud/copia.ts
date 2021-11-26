import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipo-solicitud.model';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea-investigacion.model';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
import { LineaInvestigacionService } from 'src/app/services/parametros/linea-investigacion.service';
import { ModalidadService } from 'src/app/services/parametros/modalidad.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { GeneralData } from 'src/app/config/general-data';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';
import { UploadedFileModel } from 'src/app/models/parametros/uploaded.file.model';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formFile: FormGroup = new FormGroup({}); //
  tipoSolList: TipoSolicitudModel[] = []
  lineaInvList: LineaInvestigacionModel[] = []
  modalidadList: ModalidadModel[] = []
  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;
  file:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private solicitudService: SolicitudService,
    private tipoSolService: TipoSolicitudService,
    private lineaInvService: LineaInvestigacionService,
    private modalidadService: ModalidadService,
    public dialog: MatDialog,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { 
    this.token = this.localStorageService.GetToken();
  }

  CreateForm() {
    this.form = this.fb.group({
      fecha: ["", [Validators.required]],
      nombre_solicitud: ["", [Validators.required]],
      descripcion: ["", [Validators.minLength(0)]],
      id_tipo_solicitud: ["", [Validators.required]],
      id_modalidad: ["", [Validators.required]],
      id_linea_investigacion: ["", [Validators.required]],
      file:["", []]
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SaveRecord() {
    let model = new SolicitudModel();
    model.fecha = this.form.controls.fecha.value;
    model.nombre_solicitud = this.form.controls.nombre_solicitud.value;
    model.archivo = this.file.name;
    model.descripcion = this.form.controls.descripcion.value;
    model.id_tipo_solicitud = parseInt(this.form.controls.id_tipo_solicitud.value);
    model.id_modalidad = parseInt(this.form.controls.id_modalidad.value);
    model.id_linea_investigacion = parseInt(this.form.controls.id_linea_investigacion.value);
    
    this.solicitudService.SaveRecord(model).subscribe({
      next: (data: SolicitudModel) => {
        this.router.navigate(["solicitud/listar-solicitud"]);
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
  }

  ngOnInit(): void {
    this.CreateForm();
    this.GetRecordList();
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

  OnChangeInputFile(event: any) {
    if(event.target.files.length > 0) { //true si seleccionan algo
      this.file = event.target.files[0]
      console.log(this.file.name);
      
      this.form.controls["file"].setValue(this.file.name); //busca en el html a file y se le asigna lo de la ventana emergente
    }
  }

  UploadImage(){
    const formData = new FormData();
    formData.append("file", this.form.controls["file"].value);
    this.solicitudService.UploadFile(formData).subscribe({
      next: (data: UploadedFileModel) =>{
        this.form.controls["main_image"].setValue(data.filename)
        console.log(data.filename);
        
        this.uploadedFilename = data.filename;
        this.uploadedFile = true;
      }
    });
  }

}

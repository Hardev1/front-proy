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
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { GeneralData } from 'src/app/config/general-data';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';

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
  
  formFile: FormGroup = new FormGroup({});
  url: string= GeneralData.BUSSINESS_URL;
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private solicitudService: SolicitudService,
    private tipoSolService: TipoSolicitudService,
    private lineaInvService: LineaInvestigacionService,
    private modalidadService: ModalidadService,
    public dialog: MatDialog
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      fecha: ["", [Validators.required]],
      nombre_solicitud: ["", [Validators.required]],
      descripcion: ["", [Validators.minLength(0)]],
      id_tipo_solicitud: ["", [Validators.required]],
      id_modalidad: ["", [Validators.required]],
      id_linea_investigacion: ["", [Validators.required]],
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

  SaveRecord() {
    let model = new SolicitudModel();
    model.fecha = this.form.controls.fecha.value;
    model.nombre_solicitud = this.form.controls.nombre_solicitud.value;
    model.archivo = this.uploadedFilename
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

  UploadImage(){
    const formData = new FormData();
    formData.append("file", this.formFile.controls["file"].value);
    this.solicitudService.UploadFile(formData).subscribe({
      next: (data: UploadedFileModel) =>{
        this.uploadedFilename = data.filename;
        this.uploadedFile = true;
      }
    });
  }


  /**
   * PONER ESTO EN EL CONTROLADOR DE CARGA DE ARCHIVOS
   * 
   *  @post('/CargarDocumentoSolicitud', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de un archivo a facultad.',
      },
    },
  })
  async cargarDocumento(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request
  ): Promise<object | false> {
    const rutaImagenProducto = path.join(__dirname, Configuracion.carpetaDocumentoSolicitud);
    let res = await this.StoreFileToPath(rutaImagenProducto, Configuracion.nombreCampoDocumentoSolicitud, request, response, Configuracion.extensionesPermitidasDOC);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }
   */
}

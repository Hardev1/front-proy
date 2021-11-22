import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estado-solicitud.model';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea-investigacion.model';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipo-solicitud.model';
import { EstadoSolicitudService } from 'src/app/services/parametros/estado-solicitud.service';
import { LineaInvestigacionService } from 'src/app/services/parametros/linea-investigacion.service';
import { ModalidadService } from 'src/app/services/parametros/modalidad.service';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
import { InfoComponent } from '../../shared/components/modals/info/info.component';

@Component({
  selector: 'app-actualizar-solicitud',
  templateUrl: './actualizar-solicitud.component.html',
  styleUrls: ['./actualizar-solicitud.component.css']
})
export class ActualizarSolicitudComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  tipoSolList: TipoSolicitudModel[] = []
  lineaInvList: LineaInvestigacionModel[] = []
  modalidadList: ModalidadModel[] = []
  estadoSolList: EstadoSolicitudModel[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SolicitudService,
    private route: ActivatedRoute,
    private tipoSolService: TipoSolicitudService,
    private lineaInvService: LineaInvestigacionService,
    private modalidadService: ModalidadService,
    private estadoSolService: EstadoSolicitudService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.GetRecordList();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      fecha: ["", [Validators.required]],
      nombre_solicitud: ["", [Validators.required]],
      archivo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      id_tipo_solicitud: ["", [Validators.required]],
      id_estado_solicitud: ["", [Validators.required]],
      id_modalidad: ["", [Validators.required]],
      id_linea_investigacion: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
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
    this.estadoSolService.GetRecordList().subscribe({
      next: (data: EstadoSolicitudModel[]) => {
        this.estadoSolList = data;
      }
    });
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: SolicitudModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.fecha.setValue(data.fecha);
        this.form.controls.nombre_solicitud.setValue(data.nombre_solicitud);
        this.form.controls.archivo.setValue(data.archivo);
        this.form.controls.descripcion.setValue(data.descripcion);
        this.form.controls.id_tipo_solicitud.setValue(`${data.id_tipo_solicitud}`);
        this.form.controls.id_estado_solicitud.setValue(`${data.id_estado_solicitud}`);
        this.form.controls.id_modalidad.setValue(`${data.id_modalidad}`);
        this.form.controls.id_linea_investigacion.setValue(`${data.id_linea_investigacion}`);
      }
    });
  }

  SaveRecord() {
    let model = new SolicitudModel();
    model.id = this.form.controls.id.value;
    model.fecha = this.form.controls.fecha.value;
    model.nombre_solicitud = this.form.controls.nombre_solicitud.value;
    model.archivo = this.form.controls.archivo.value;
    model.descripcion = this.form.controls.descripcion.value;
    model.id_tipo_solicitud = parseInt(this.form.controls.id_tipo_solicitud.value);
    model.id_estado_solicitud = parseInt(this.form.controls.id_estado_solicitud.value);
    model.id_modalidad = parseInt(this.form.controls.id_modalidad.value);
    model.id_linea_investigacion = parseInt(this.form.controls.id_linea_investigacion.value);
    this.service.EditRecord(model).subscribe({
      next: (data: SolicitudModel) => {
        this.router.navigate(["/solicitud/listar-solicitud"]);
      },
      error: (err: any) => {
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

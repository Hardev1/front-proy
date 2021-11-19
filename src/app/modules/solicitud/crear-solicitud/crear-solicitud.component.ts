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
      archivo: ["", [Validators.required]],
      descripcion: ["", [Validators.minLength(0)]],
      id_tipo_solicitud: ["", [Validators.required]],
      id_modalidad: ["", [Validators.required]],
      id_linea_investigacion: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SaveRecord() {
    let model = new SolicitudModel();
    model.fecha = this.form.controls.fecha.value;
    model.nombre_solicitud = this.form.controls.nombre_solicitud.value;
    model.archivo = this.form.controls.archivo.value;
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

}

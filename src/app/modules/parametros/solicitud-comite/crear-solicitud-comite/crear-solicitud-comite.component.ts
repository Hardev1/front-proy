import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudComiteModel } from 'src/app/models/parametros/solicitud-comite.model';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/create/create.component';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
import { ComiteService } from 'src/app/services/parametros/comite.service';
import { SolicitudComiteService } from 'src/app/services/parametros/solicitud-comite.service';

@Component({
  selector: 'app-crear-solicitud-comite',
  templateUrl: './crear-solicitud-comite.component.html',
  styleUrls: ['./crear-solicitud-comite.component.css']
})
export class CrearSolicitudComiteComponent implements OnInit {

  comite: ComiteModel[] = []
  solicitud: SolicitudModel[] = []
  form: FormGroup = new FormGroup({})
  id: number = 0;
  lista: string[] = []

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private comiteService: ComiteService,
    private service: SolicitudComiteService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.GetRecordSolicitud();
    this.GetRecordComite();
    this.CrearFormulario();
  }

  CrearFormulario() {
    this.form = this.fb.group({
      id_comite: ["", [Validators.required]],
      id_solicitud: ["", [Validators.required]]
    })
  }

  SaveRecord() { 
    let model = new SolicitudComiteModel();
    model.id_comite = parseInt(this.form.controls.id_comite.value);
    model.id_solicitud = parseInt(this.form.controls.id_solicitud.value);
    this.service.SaveRecord(model).subscribe({
      next: (data: SolicitudComiteModel) => {
        console.log(data)
        this.router.navigate(["/parametros/listar-solicitud-comite"])   
      }
    })
  }


  get GetForm() {
    return this.form.controls;
  }

  GetRecordSolicitud() {
    this.solicitudService.GetRecordList().subscribe({
      next: (data: SolicitudModel[]) => {
        this.solicitud = data;
      }
    });
  }
  GetRecordComite() {
    this.comiteService.GetRecordList().subscribe({
      next: (data: ComiteModel[]) => {
        this.comite = data;
      }
    });
  }
}
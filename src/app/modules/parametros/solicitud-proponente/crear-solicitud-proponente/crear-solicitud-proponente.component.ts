import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { SolicitudProponenteModel } from 'src/app/models/parametros/solicitud-proponente.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/create/create.component';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { SolicitudProponenteService } from 'src/app/services/parametros/solicitud-proponente.service';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';

@Component({
  selector: 'app-crear-solicitud-proponente',
  templateUrl: './crear-solicitud-proponente.component.html',
  styleUrls: ['./crear-solicitud-proponente.component.css']
})
export class CrearSolicitudProponenteComponent implements OnInit {

  proponente?: ProponenteModel;
  solicitud: SolicitudModel[] = []
  form: FormGroup = new FormGroup({})
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private proponenteService: ProponenteService,
    private solicitudService: SolicitudService,
    private service: SolicitudProponenteService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.GetRecordProponente();
    this.GetRecordSolicitud();
    this.CrearFormulario();
  }

  CrearFormulario() {
    this.form = this.fb.group({
      id_solicitud: ["", [Validators.required]],
      id_proponente: ["", [Validators.required]]
         })
  }

  SaveRecord() {
    let model = new SolicitudProponenteModel ();
    model.id_solicitud = parseInt(this.form.controls.id_solicitud.value);
    model.id_proponente = Number(this.proponente?.id);
    this.service.SaveRecord(model).subscribe({
      next: (data: SolicitudProponenteModel) => {
        console.log(data)
        this.router.navigate(["/parametros/listar-solicitud-proponente"])   
      },
      error: (err: any) => {
      }
    });
  }


  get GetForm() {
    return this.form.controls;
  }

  GetRecordProponente() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.proponenteService.SearchRecord(id).subscribe({
      next: (data: ProponenteModel) => {
        this.proponente = data;
      }
    });
  }

  GetRecordSolicitud() {
    this.solicitudService.GetRecordList().subscribe({
      next: (data: SolicitudModel[]) => {
        this.solicitud = data;
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

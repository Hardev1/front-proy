import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JuradoLineaInvestigacionModel } from 'src/app/models/parametros/jurado-linea-investigacion.model';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea-investigacion.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/create/create.component';
import { JuradoService } from 'src/app/services/parametros/jurado.service';
import { LineaInvestigacionService } from 'src/app/services/parametros/linea-investigacion.service';
import { JuradoLineaInvestigacionService } from 'src/app/services/parametros/jurado-linea-investigacion.service';

@Component({
  selector: 'app-crear-jurado-lineaInvestigacion',
  templateUrl: './crear-jurado-lineaInvestigacion.component.html',
  styleUrls: ['./crear-jurado-lineaInvestigacion.component.css']
})
export class CrearJuradoLineaInvestigacionComponent implements OnInit {

  linea: LineaInvestigacionModel[] = [];
  jurado: JuradoModel[] = [];
  form: FormGroup = new FormGroup({})
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private juradoService: JuradoService,
    private lineaService: LineaInvestigacionService,
    private service: JuradoLineaInvestigacionService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.GetRecordJurado();
    this.GetRecordLineaInvestigacion();
    this.CrearFormulario();
  }

  CrearFormulario() {
    this.form = this.fb.group({
      id_linea: ["", [Validators.required]],
      id_jurado: ["", [Validators.required]]
    })
  }

  get GetForm() {
    return this.form.controls;
  }

  SaveRecord() {
    let model = new JuradoLineaInvestigacionModel();
    model.id_linea_investigacion = parseInt(this.form.controls.id_linea.value);
    model.id_jurado = parseInt(this.form.controls.id_jurado.value);
    this.service.SaveRecord(model).subscribe({
      next: (data: JuradoLineaInvestigacionModel) => {
        console.log(data)
      }
    })
  }

  GetRecordJurado() {
    this.juradoService.GetRecordList().subscribe({
      next: (data: JuradoModel[]) => {
        this.jurado = data;
      }
    });
  }
  GetRecordLineaInvestigacion() {
    this.lineaService.GetRecordList().subscribe({
      next: (data: LineaInvestigacionModel[]) => {
        this.linea = data;
      }
    });
  }
}
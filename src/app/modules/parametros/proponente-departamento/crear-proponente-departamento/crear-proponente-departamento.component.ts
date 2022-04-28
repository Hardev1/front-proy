import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/create/create.component';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { DepartamentoService } from 'src/app/services/parametros/departamento.service';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoProponenteModel } from 'src/app/models/parametros/proponente-departamento.model';
import { DepartamentoProponenteService } from 'src/app/services/parametros/proponente-departamento.service';

@Component({
  selector: 'app-crear-proponente-departamento',
  templateUrl: './crear-proponente-departamento.component.html',
  styleUrls: ['./crear-proponente-departamento.component.css']
})
export class CrearProponenteDepartamentoComponent implements OnInit {

  proponente: ProponenteModel[] = []
  departamento: DepartamentoModel[] = []
  form: FormGroup = new FormGroup({})
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private proponenteService: ProponenteService,
    private departamentoService: DepartamentoService,
    private service: DepartamentoProponenteService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.GetRecordProponente();
    this.GetRecordDepartamento();
    this.CrearFormulario();
  }

  CrearFormulario() {
    this.form = this.fb.group({
      id_departamento: ["", [Validators.required]],
      id_proponente: ["", [Validators.required]]
         })
  }

  SaveRecord() {
    let model = new DepartamentoProponenteModel ();
    model.id_departamento = parseInt(this.form.controls.id_departamento.value);
    model.id_proponente = parseInt(this.form.controls.id_proponente.value);
    this.service.SaveRecord(model).subscribe({
      next: (data: DepartamentoProponenteModel) => {
        console.log(data)
        this.router.navigate(["/parametros/listar-proponente-departamento"])   
      },
      error: (err: any) => {
      }
    });
  }


  get GetForm() {
    return this.form.controls;
  }

  GetRecordProponente() {
    this.proponenteService.GetRecordList().subscribe({
      next: (data: ProponenteModel[]) => {
        this.proponente = data;
      }
    });
  }

  GetRecordDepartamento() {
    this.departamentoService.GetRecordList().subscribe({
      next: (data: DepartamentoModel[]) => {
        this.departamento = data;
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

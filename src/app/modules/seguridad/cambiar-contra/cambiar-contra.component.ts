import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { SessionData } from 'src/app/models/sesion/session-data.model';
import { SecurityService } from 'src/app/services/shared/security.service';
import { CambioClaveModel } from 'src/app/models/cambio-clave.model';
import { Router } from '@angular/router';
import { InfoComponent } from '../../shared/components/modals/info/info.component';

@Component({
  selector: 'app-cambiar-contra',
  templateUrl: './cambiar-contra.component.html',
  styleUrls: ['./cambiar-contra.component.css']
})
export class CambiarContraComponent implements OnInit {

  sesion: boolean = false;
  subscription: Subscription = new Subscription();
  form: FormGroup = new FormGroup({});

  constructor(
    private securityService: SecurityService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      id_user: [
        '',
        [
          Validators.required
        ],
      ],
      clave_actual: [
        '123456789',
        [
          Validators.required,
          Validators.minLength(GeneralData.PASSWORD_MIN_LENGHT),
        ],
      ],
      nueva_clave: [
        'cambiar contra works',
        [
          Validators.required,
          Validators.minLength(GeneralData.PASSWORD_MIN_LENGHT),
        ],
      ]
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.CreateForm()
    this.subscription = this.securityService.GetSessionStatus().subscribe(
      {
        next: (data: SessionData) => {
          this.sesion = data.isLoggedIn;
          this.form.controls.id_user.setValue(`${data.usuario?._id}`);
          console.log(this.form.controls.id_user.value);

        },
        error: (err) => {
          console.log('Error al conectar con el backend');
        }
      }
    );
  }

  ChangePassword(): void {
    let modelo = new CambioClaveModel();
    modelo.id_user = this.GetForm.id_user.value;
    modelo.clave_actual = this.GetForm.clave_actual.value;
    modelo.nueva_clave = this.GetForm.nueva_clave.value;
    if (this.sesion) {
      this.securityService.ChangePassword(modelo).subscribe({
        next: () => {
          this.router.navigate(['/inicio'])
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    };
  };

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

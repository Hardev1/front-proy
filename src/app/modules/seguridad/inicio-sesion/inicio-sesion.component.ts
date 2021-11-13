import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { InfoComponent } from '../../shared/components/modals/info/info.component';
import { UserCredentialsModel } from '../../../models/user-credentials.models';
import { MD5 } from 'crypto-js';
import { SecurityService } from 'src/app/services/shared/security.service';
import { RolModel } from '../../shared/modelos/rol.model';
import { RolService } from 'src/app/services/shared/rol.service';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})

export class InicioSesionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private securityService: SecurityService,
    private router: Router,
    private service: RolService,
    private localStorage: LocalStorageService
  ) //
  //private localStorageService: localStorageService,
  //private router: Router
  { }
  recordList: RolModel[] = []

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.CreateForm();
    this.GetRecordList();
  }

  CreateForm() {
    this.form = this.fb.group({
      username: [
        'humberto.1701913052@ucaldas.edu.co',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(GeneralData.EMAIL_MIN_LENGHT),
        ],
      ],
      password: [
        'hidMcBqo',
        [
          Validators.required,
          Validators.minLength(GeneralData.PASSWORD_MIN_LENGHT),
        ],
      ],
      rol: [
        [
          Validators.required
        ]
      ],
    });
  }

  get GetForm() {
    return this.form.controls;
  }
  openDialog() {
    this.dialog.open(InfoComponent);
  }

  Login() {
    if (this.form.invalid) {
      console.log();
    } else {
      console.log();
      let modelo = new UserCredentialsModel();
      modelo.username = this.GetForm.username.value;
      modelo.password = MD5(this.GetForm.password.value).toString();
      modelo.rol = this.GetForm.rol.value;
      this.securityService.Login(modelo).subscribe({
        next: (data: any) => {
          this.localStorage.SaveSessionData(data);
          data.isLoggedIn = true;
          this.securityService.RefreshSessionData(data);
          this.router.navigate(['/inicio'])
        },
        error: (error: any) => {
          console.log('Error al conectar con el backend');
        }
      });
    }
  }


  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: RolModel[]) => {
        this.recordList = data;
      }
    });
  }
}
interface Animal {
  name: string;
  sound: string;
}
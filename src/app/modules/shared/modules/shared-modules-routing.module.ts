import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadReadCsvComponent } from './upload-read-csv/upload-read-csv.component';

const routes: Routes = [
  {
    path: "importar-jurados",
    component: UploadReadCsvComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedModulesRoutingModule { }

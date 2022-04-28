import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoComponent } from 'src/app/modules/shared/components/modals/create/create.component';

@Component({
  selector: 'app-crear-recordatorio-ev',
  templateUrl: './crear-recordatorio-ev.component.html',
  styleUrls: ['./crear-recordatorio-ev.component.css']
})
export class CrearRecordatorioEvComponent implements OnInit {

  id:any;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    this.id = parseInt(this.route.snapshot.params["id"]);
  }

}

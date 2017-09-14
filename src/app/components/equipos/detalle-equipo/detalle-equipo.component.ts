import { Component, OnInit } from '@angular/core';
import{EquipoService} from '../../../services/equipo.service';
@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.component.html',
  styleUrls: ['./detalle-equipo.component.css']
})
export class DetalleEquipoComponent implements OnInit {
  edicion_equipo:any
  constructor() { }

  ngOnInit() {
    this.edicion_equipo=JSON.parse(localStorage.getItem('equipoSeleccionado'));
    console.log(this.edicion_equipo);
  }

}

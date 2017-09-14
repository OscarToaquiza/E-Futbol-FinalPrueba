import { Component, OnInit,DoCheck } from '@angular/core';
import { NuevoPersonalComponent } from './nuevo-personal/nuevo-personal.component';
import { SeccionEquipoComponent } from './seccion-equipo/seccion-equipo.component';
import { SeccionPersonalEquipoComponent } from './seccion-personal-equipo/seccion-personal-equipo.component';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

  public verLista:boolean=false;
  public verNuevoPersonal=false;
  public equipo:any;
  constructor() { }
  ngOnInit() {
  }
 

  mostrarDescripcionEquipo(evento){
    if(evento.mensaje.elementoSeleccionado){
      this.equipo=evento.mensaje.elementoSeleccionado;
      console.log("este equipo resivo");
      console.log(this.equipo);
      this.verLista=true;
      // this.verNuevoPersonal=false;
    }
  }
  

  
  mostrarNuevoPer(event){
    this.verNuevoPersonal=event.mostrarAgregarPersonal;
  }
}

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
  public msgEvent:any;
  public persona:any;
  public msgEventEliminacion:any;
  constructor() { }
  ngOnInit() {
  }
 

  mostrarDescripcionEquipo(evento){
    if(evento.mensaje.elementoSeleccionado){
      this.equipo=evento.mensaje.elementoSeleccionado;
      // console.log("este equipo resivo");
      // console.log(this.equipo);
      this.verLista=true;
      // this.verNuevoPersonal=false;
    }
  }

  actualizarSeccionPersonal(evento){
    this.msgEvent=evento.mensaje;
  }
  eliminarGroupPersonal(evento){
    this.msgEventEliminacion=evento.mensaje;
  }
  actualizarPersonal(evento)
  {
    this.msgEvent=evento.mensaje;
  }
  mostrarNuevoPer(event){
    this.verNuevoPersonal=event.mostrarAgregarPersonal;
    this.persona=event.personal;
  }
}

import { Component,DoCheck,Output,EventEmitter, OnInit } from '@angular/core';
import{EquipoService} from '../../../services/equipo.service';
import { Equipo } from '../../../models/equipo.model';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-seccion-equipo',
  templateUrl: './seccion-equipo.component.html',
  styleUrls: ['./seccion-equipo.component.css']
})
export class SeccionEquipoComponent implements OnInit,DoCheck {

  public url;

  public equipos:Equipo[];
  public equipo;
  private selectUndefinedOptionValue:any;
  

  @Output() mostrar=new EventEmitter();
  
  constructor(
       private _ES:EquipoService
  ) {
    this.url = GLOBAL.url;
    //  this.equipo=new Equipo('','',0,'','','','',null,true,null);
   }

  ngOnInit() {
    //  this.equipo=this._ES.getEquipos();
     console.log(this._ES.getEquipos());
     this.obtenerequipos();
     
  }
  emitirEvento(elementoSeleccionado){
    this.mostrar.emit({
      'mensaje':{
        'elementoSeleccionado':elementoSeleccionado
      }
    });
}
  
  ngDoCheck() {
    // this.identity = this._userService.getIdentity();
    // this.token = this._userService.getToken();
    console.log(this.equipo);
    this.emitirEvento(this.equipo);

  }

  obtenerequipos() {
    this._ES.getEquipos().subscribe(
      response => {
        if (!response.equiposEncontrados) {
          console.log(" La categoria no tiene Equipos ");
        } else {
          this.equipos = response.equiposEncontrados;
          console.log(this.equipos);
        }
      },
      error => {
        var errorMessage = <any>error;

        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          //this.alertMessage = body.message;
          console.log(error);
        }

      });
  }

}

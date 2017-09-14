import { Component, DoCheck, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TemporadaService } from '../../../services/temporada.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Temporada } from '../../../models/temporada.models';

import swal from 'sweetalert2';

@Component({
  selector: 'app-lista-temporada',
  templateUrl: './lista-temporada.component.html',
  styleUrls: ['./lista-temporada.component.css']
})
export class ListaTemporadaComponent implements OnInit {
  
  @Output() notify = new EventEmitter();
  //@Output() notify2: EventEmitter <boolean> = new EventEmitter <boolean>();
  @Output() DatosTemporadaEditar=new EventEmitter();
  


  public ver_nuevo_formulario=false;
  public identity;
  public token;

  public estado: boolean;

  public temporadas : Temporada[];

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _temporadaService: TemporadaService
  ) {
    this.identity = _userService.getIdentity();
   }

  ngOnInit() {
    this.obtenerTemporadas();
    console.log(this.estado)
  }

  ver_formulario(event){
    this.notify.emit({'mensaje':
    {
    'estado':true,
    'ngSwitch':'nueva-temporada'
    }
    });
  }

  obtenerTemporadas() {
    this._temporadaService.getTemporadas().subscribe(
      response => {
        if (!response) {

        } else {
          this.temporadas = response;
          console.log(this.temporadas);
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          console.log(body);
        }
      }
    );
  }

  datos_temporada(event,elementoSeleccionado:string){
    this.DatosTemporadaEditar.emit({
        'mensaje':{
          'componente':elementoSeleccionado
        }
      });
  }
}
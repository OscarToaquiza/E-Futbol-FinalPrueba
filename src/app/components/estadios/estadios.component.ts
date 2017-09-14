import { Component, OnInit } from '@angular/core';
import { EstadioService } from '../../services/estadio.service';

import { Estadio } from '../../models/estadio.model';

@Component({
  selector: 'app-estadios',
  templateUrl: './estadios.component.html',
  styleUrls: ['./estadios.component.css']
})
export class EstadiosComponent implements OnInit {

  public titulo = 'Agregar Nuevo Estadio';
  public estadio_nuevo: Estadio;
  public estadios: Estadio[];
  constructor(
    private _estadioService: EstadioService
  ) { 
    // this.estadio_nuevo = new Estadio('', '', '', '', '' , true);
  }

  ngOnInit() {
    this.obtenerEstadios();
  }

  obtenerEstadios(){
  this._estadioService.getEstadios().subscribe(
    response =>{
      if(!response){
        console.log("Error al traer estadios");
      }else{
        this.estadios = response;
      }
    },
    error =>{

    });
}


  /*
  .....
<div class="collapse" id="AgregarEstadio">
    <div class="card container">
      <div class="card-header text-center">
        <h3>{{titulo}}</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-10">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon frm-addon" style="width: 2.6rem">
                        <i class="fa fa-clipboard" aria-hidden="true"></i>
                    </div>  
                    <input type="text" name="name" class="form-control" placeholder="Nombre del Estadio" #nombre_estadio="ngModel" [(ngModel)]="estadio_nuevo.nombre_estadio" required autofocus>
                    <div class="invalid-feedback">
                      Please provide a valid city.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon frm-addon" style="width: 2.6rem"><i class="fa fa-map-marker" aria-hidden="true"></i></div>
                    <textarea type="text" class="form-control" name="" placeholder="Direccion del Estadio"
                    #direccion_estadio="ngModel" [(ngModel)]="estadio_nuevo.direccion_estadio">
                    </textarea>
                    <div class="invalid-feedback">
                        Please provide a valid city.
                      </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon frm-addon" style="width: 2.6rem"><i class="fa fa-map" aria-hidden="true"></i></div>
                    <textarea type="text" class="form-control" name="" placeholder="Descripción del Estadio"
                    #observacion_estadio="ngModel" [(ngModel)]="observacion_estadio.direccion_estadio">
                    </textarea>
                    <div class="invalid-feedback">
                        Please provide a valid city.
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="form-group">
              <input type="file" (change)="imagen($event)" name="file-5[]" id="file-5" class=" inputfile inputfile-4" />
              <label for="file-5" ><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg></figure> <span>{{nombre_escudo}}</span></label>
            </div>
          </div>
        </div>
  
      </div>
      <div class="card-footer">
        <button class="btn btn-success pull-left" type="submit" (click)="guardarEquipo()">Guardar Equipo </button>
        <a class="btn btn-danger pull-right" role="button" data-toggle="collapse" href="#AgregarEquipo" aria-expanded="true" aria-controls="AgregarEquipo"
        >Cancelar</a>
      </div>
    </div>
  </div>
  ....
  */

}

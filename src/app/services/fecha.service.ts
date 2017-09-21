import { Fecha } from './../models/fecha.model';
import { Injectable } from '@angular/core';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import{Observable} from 'rxjs/Observable';
import{GLOBAL} from './global';

@Injectable()
export class FechaService {
  public url:any;
  constructor(private _http:Http) { 
    this.url=GLOBAL.url;
  } 
  // equipos[],idCategoria,segunda_vuelta(true|false)
  generarCalendario(token,param) {
    let params = JSON.stringify(param);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url + 'fecha/guardar', params, { headers: headers })
      .map(res => res.json());
  }



  getFechaByIdCategoria(idCategoria){    
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this._http.get(this.url + 'fecha/by/categoria/'+idCategoria, { headers: headers })
      .map(res => res.json())      
  }

  getFechaByIdCategoriaAdministrador(idCategoria){    
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this._http.get(this.url + 'fecha/by/categoriaAdministrador/'+idCategoria, { headers: headers })
      .map(res => res.json())      
  }

  updateCalendario(token,param,id) {
    let params = JSON.stringify(param);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.put(this.url + 'fecha/actualizar/'+id, params, { headers: headers })
      .map(res => res.json());
  }
}

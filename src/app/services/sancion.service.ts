import { GLOBAL } from './global';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import{Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Sancion } from './../models/sancion.model';

@Injectable()
export class SancionService {
  public sancion:Sancion;
  public url: string;
  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  saveSancion(token, sancion: Sancion){
    let params = JSON.stringify(sancion);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url + 'sancion/guardar', params, { headers: headers })
      .map(res => res.json());
  }

  updateSancion(token, id: string, sancion: Sancion){
    let params = JSON.stringify(sancion);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.put(this.url + 'sancion/actualizar/' + id, params, { headers: headers })
      .map(res => res.json());    
  }

  getSancion(){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this._http.get(this.url + 'sancion/', { headers: headers })
      .map(res => res.json());
  }  
}

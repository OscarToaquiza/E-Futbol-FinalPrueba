import { Injectable } from '@angular/core';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import{Observable} from 'rxjs/Observable';
import{GLOBAL} from './global';

@Injectable()
export class EstadioService {
  public url: string;
  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getEstadios() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this._http.get(this.url + 'estadio/',{headers: headers})
      .map(res => res.json());

  }

}

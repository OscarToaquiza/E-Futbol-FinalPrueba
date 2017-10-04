import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers ,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

import { Equipo } from '../models/equipo.model';
import{UserService} from './user.service';


@Injectable()
export class EquipoService {
  public url: string;
  public token;
  
  constructor(private _http: Http, private _US:UserService) {
    this.url = GLOBAL.url;
    this.token=_US.getToken();
  }

  getEquipos() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.log("una solo vezzzzzzzzzzzz");
    return this._http.get(this.url + 'equipo/listartodos',{headers: headers})
      .map(res => res.json());

  }
  
  //Nueva
  addEquipo( url: string, params: Equipo, files:Array<File>,token: string,name:string){   
    return new Promise(function(resolve,reject) {
      //simular el comportamiento de un formulario.
      var formData : any = new FormData();
      var xhr = new XMLHttpRequest();
      //recorrer los ficheros que hay en la base de datos
      if(files!=undefined){
        for(var i = 0;i < files.length;i++) {
            formData.append(name, files[i], files[i].name);
        }
      }
      for (var key in params) {
        console.log(key);
        if(key=='logros_equipo' || key=='personal_equipo')
          {              
            formData.append(key,JSON.stringify(params[key])); 
          }else{
            formData.append(key,params[key]); 
          }
      }      
      xhr.onreadystatechange = function() {
          if(xhr.readyState == 4) {
              if(xhr.status ==200) { resolve(JSON.parse(xhr.response)); } 
              else { reject(xhr.response); }
          }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
      }); 
  }

    //Actualizar
    updateEquipo( url: string, params: Equipo, files:Array<File>,token: string,name:string){   
      return new Promise(function(resolve,reject) {
        //simular el comportamiento de un formulario.
        var formData : any = new FormData();
        var xhr = new XMLHttpRequest();
        //recorrer los ficheros que hay en la base de datos
        if(files!=undefined){
          for(var i = 0;i < files.length;i++) {
            formData.append(name, files[i], files[i].name);
          }
        }     
        console.log(formData);
        for (var key in params) {
          console.log(key);
          if(key=='logros_equipo' || key=='personal_equipo')
            {              
              formData.append(key,JSON.stringify(params[key])); 
            }else{
              formData.append(key,params[key]); 
            }
        }      
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                 if(xhr.status ==200) { resolve(JSON.parse(xhr.response)); } 
                else { reject(xhr.response); }
            }
        }
        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send(formData);
        }); 
    }


      //Eliminar 
  deleteEquipo(token,id){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token  
    })
    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'equipo/delete/'+id,options)
    .map(res => res.json());
  }

  deleteONEPersonalEquipo(token,idEQUIPO: String,idPERSONAL:string){
    let params = {'personal_equipo': idPERSONAL};
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return this._http.put(this.url + 'equipo/quitarPERSONAL/' + idEQUIPO, params, {headers:headers})
                                                                    .map(res => res.json());
  }

  deleteAllPersonalEquipo(token,id){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token  
    })
    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'equipo/deleteAllPersonal/'+id,options)
    .map(res => res.json());
  }
  addPersonalAEquipo(idPersonal,idEquipo){
    // let params=JSON.stringify(equipo_to_update);
    let params={"personal_equipo":idPersonal};
    let headers=new Headers({
      'Content-Type':'application/json',
      'Authorization':this.token
    });
    return this._http.put(this.url+'equipo/agregarPERSONAL/'+idEquipo,params,{headers:headers})
                                                                    .map(res=>res.json());

  }

}

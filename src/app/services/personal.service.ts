import { Injectable } from '@angular/core';
import{HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import{Observable} from 'rxjs/Observable';
import{GLOBAL} from './global';

import {Personal} from '../models/personal.model';

@Injectable()
export class PersonalService {
  public url:string;
  constructor(private _http:Http) { 
    this.url=GLOBAL.url;
  }

  addExcelPersonal( url: string, files:Array<File>,token: string,name:string){   
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
  //Nueva
  addPersonal( url: string, params: Personal, files:Array<File>,token: string,name:string){   
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
        console.log("keyyyyyyyyy");
        console.log(key);
        formData.append(key,params[key]); 
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


  //  Actualizar
  updatePersonal( url: string, params: Personal, files:Array<File>,token: string,name:string){   
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
        formData.append(key,params[key]); 
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

  //Listar
//   getNoticias(page){
//     let headers = new Headers({
//          'Content-Type':'application/json'  
//     })
//     let options = new RequestOptions({headers:headers});
//     return this._http.get(this.url+'noticia/lista/'+page,options)
//     .map(res => res.json());
//   }
  //Actualizar
//   updateNoticia( url: string, params: Personal, files:Array<File>,token: string,name:string){   
//     return new Promise(function(resolve,reject) {
//       //simular el comportamiento de un formulario.
//       var formData : any = new FormData();
//       var xhr = new XMLHttpRequest();
//       //recorrer los ficheros que hay en la base de datos
//       if(files!=undefined){
//         for(var i = 0;i < files.length;i++) {
//           formData.append(name, files[i], files[i].name);
//         }
//       }     
//       console.log(formData);
//       for (var key in params) {
//         console.log(key);
//         formData.append(key,params[key]); 
//       }      
//       xhr.onreadystatechange = function() {
//           if(xhr.readyState == 4) {
//                if(xhr.status ==200) { resolve(JSON.parse(xhr.response)); } 
//               else { reject(xhr.response); }
//           }
//       }
//       xhr.open('PUT', url, true);
//       xhr.setRequestHeader('Authorization', token);
//       xhr.send(formData);
//       }); 
//   }
  //Eliminar Group Personal
  eliminarGroupPersonal(token,array){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token  
    })
    let params=JSON.stringify(array);
    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'personal/eliminarGroup/'+params,options)
    .map(res => res.json());
  }

  eliminarONEPersonal(token,idPersonal){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token  
    })
    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'personal/eliminar/' + idPersonal, options)
    .map(res => res.json());
  }

}

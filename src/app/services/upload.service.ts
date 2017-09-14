//
import { Injectable } from '@angular/core';
//
import { Http, Response, Headers } from '@angular/http';
//mapear objetos y cosas
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
//
import { Observable } from 'rxjs/Observable';
//para poder inyectar dependecias y utilizar en otros componentes 
@Injectable()
export class UploadService {
    public url :String;
    //url de la api res
    //para poder usar el servicio gttp para poder inyectar aqui
    constructor(private _http:Http) {
        this.url = GLOBAL.url;
    }

    makeFileRequest(url: string, params: Array<string>, files:Array<File>,token: string,name:string) {
        //recoger el token de nuestra aplicacion
        //es necesario decodificar el token
        //enlazar el codigo 
        return new Promise(function(resolve,reject) {
            //simular el comportamiento de un formulario.
            var formData : any = new FormData();
            var xhr = new XMLHttpRequest();
            //recorrer los ficheros que hay en la base de datos
            for(var i = 0;i < files.length;i++) {
                formData.append(name, files[i], files[i].name);
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

}
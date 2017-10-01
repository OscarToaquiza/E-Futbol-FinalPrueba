import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Personal } from '../../../models/personal.model';
import { PersonalService } from '../../../services/personal.service';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { EquipoService } from '../../../services/equipo.service';
import{NgForm} from '@angular/forms';

import swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-personal',
  templateUrl: './nuevo-personal.component.html',
  styleUrls: ['./nuevo-personal.component.css']
})
export class NuevoPersonalComponent implements OnInit, OnChanges {
  private selectUndefinedOptionValue2:any;
  public title:string;
  public personal: Personal;
  public fileSuccess: Boolean;
  public url: string;
  public srcH: any;
  public identity;
  public token;
  public filesToUpload: Array<File>;

  public aux: any;
  public personalCreado: any;
  @Input() IdEquipo: any;
  @Input() PersonaRecibida:Personal;

  public rol;

  // public btnGuardarNoticia:boolean=true;
  // public btnUpdateNoticia:boolean=false;

  constructor(private _PS: PersonalService, private _US: UserService, private _ES: EquipoService) {
    this.personal = new Personal('','', '', '', this.aux, '', 0, 0, 0, this.aux, '', '', true);
    console.log(this.personal.fecha_nacimiento_personal);
    this.title="Agregar miembro";
    this.url = GLOBAL.url;
    this.fileSuccess = false;
    this.identity = this._US.getIdentity();
    this.token = _US.getToken();
  }

  ngOnChanges() {
    //  alert("darwin es el mejor");
    console.log("darwin es el mejor y siempre lo sera");
     if(this.PersonaRecibida!=null && this.PersonaRecibida != undefined){
       this.personal=this.PersonaRecibida;
     }
  }

  ngOnInit() {
    // this.srcH=this.url+'personal/get-image-noticia/default.jpg';   

  }

  imagen(fileInput: any) {
    // var files = fileInput.srcElement.files[0].name;
    // this.nombre_documento = files;
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(fileInput);
  }

  guardarPersonal() {
   
    this._PS.addPersonal(this.url+'personal/guardar',this.personal,this.filesToUpload,this.token,'url_foto_personal')
      .then(response=>{

        if(!response){
          console.log("Hubo un error");
        }else{
          console.log(response);
          this.personalCreado = response;
           this._ES.addPersonalAEquipo(this.personalCreado.personal._id,this.IdEquipo)
                  .subscribe(response=>{
                    if(response){
                      swal(
                        'El ' + this.personalCreado.personal.rol_personal + ' ' +  this.personalCreado.personal.nombre_personal,
                        'ha sido regisrtrado y agregado al equipo de manera exitosa',
                        'success'
                      );
                    }else{
                      console.log("error");                      
                    }
                  },error=>{
                    alert("este es el ide del personal"+this.personalCreado.personal._id);

                    alert("este es el ide del equipo "+this.IdEquipo);
                    console.log(error);

                  });
        }
      }).catch((e) => {
    let body = JSON.parse(e);
    // console.log(body.mensaje);
    swal(
      '¡' + body.mensaje + '!',
      '',
      'error'
    );
  });
  }

  updatePersonal() {
    
     this._PS.updatePersonal(this.url+'personal/actualizar/'+this.personal._id,this.personal,this.filesToUpload,this.token,'url_foto_personal')
       .then(response=>{
 
         if(!response){
           console.log("Hubo un error");
         }else{
           console.log(response);
           this.personal = new Personal('','', '', '', this.aux, '', 0, 0, 0, this.aux, '', '', true);           
           this.personalCreado = response;
            // this._ES.addPersonalAEquipo(this.personalCreado.personal._id,this.IdEquipo)
            //        .subscribe(response=>{
            //          if(response){
            //            swal(
            //              'El ' + this.personalCreado.personal.rol_personal + ' ' +  this.personalCreado.personal.nombre_personal,
            //              'Se ha actulizado correctamente',
            //              'success'
            //            );
            //          }else{
            //            console.log("error");                      
            //          }
            //        },error=>{
            //          alert("este es el ide del personal"+this.personalCreado.personal._id);
 
            //          alert("este es el ide del equipo "+this.IdEquipo);
            //          console.log(error);
 
            //        });
         }
       }).catch((e) => {
      let body = JSON.parse(e);
     swal(
       '¡' + body.mensaje + '!',
       '',
       'error'
     );
   });
   }


}

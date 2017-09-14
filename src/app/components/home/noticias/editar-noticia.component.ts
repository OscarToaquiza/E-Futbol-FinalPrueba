import { Component, Input,OnInit,Output,EventEmitter } from '@angular/core';
import {Noticia} from '../../../models/noticia.model';
import {NoticiaService} from '../../../services/noticia.service'
import {UserService} from '../../../services/user.service';

import{GLOBAL} from '../../../services/global';
import swal from 'sweetalert2';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-editar-noticia',
  templateUrl: './agregar-noticia.component.html'
})
export class EditarNoticiaComponent implements OnInit {
  @Output() notificacion=new EventEmitter();
  @Output() cerrar=new EventEmitter();
  

  @Input() noticia_nueva:Noticia; //es la notica que me llega como parametro del compoennte padre
  public title:string;
  public url:string;
  public srcH:any;
  public identity;
  public token;
  public btnGuardarNoticia:boolean=false;
  public btnUpdateNoticia:boolean=true;
  constructor(
    private _US:UserService,
    private _noticiaservice : NoticiaService) {  
    this.identity = this._US.getIdentity();
    this.token = _US.getToken();
    this.noticia_nueva;
    this.url=GLOBAL.url;  
    
  }

  ngOnInit() {  
    console.log(this.noticia_nueva);           
    if(this.noticia_nueva.image != null  || this.noticia_nueva.image!=undefined || this.noticia_nueva.image!=''){
      this.srcH=this.url+'noticia/get-image-noticia/'+this.noticia_nueva.image;
    }else{
      this.srcH=this.url+'noticia/get-image-noticia/default.jpg';
    }
  }
   
  updateNoticia(){
    console.log("img");
    console.log(this.noticia_nueva);
    console.log(this.identity);
    
    this.noticia_nueva.usuario = this.identity._id;
    let id=this.noticia_nueva._id;    
    console.log(this.noticia_nueva);	
    //Actualizar la Noticia:
    this._noticiaservice.updateNoticia(this.url+'noticia/update/'+id, this.noticia_nueva,this.filesToUpdate,this.token,'image')
    .then(response=>{ 
      if(response){        
        this.notificacion.emit("Noticia actualizada");
        console.log(response);
        swal(
          '¡Modificado!',
          'Los cambios se guardaron con exito.',
          'success'
        )
      }              
      
    }).catch((e)=>{
      swal(
        'Oops...',
        '¡Algo salio mal,no encontramos la noticia, pruebe despues de un momento!',
        'error'
      )
      console.log("La noticia no pudo ser actualizada, intente nuevamente.");
    });
  }

  cancelar(){
    this.cerrar.emit('tabla');
  }
  public filesToUpdate : Array<File>;
  subirFileNoticia(fileInput : any){
      //si fueran check se podrian selecciones varios.
      this.filesToUpdate = <Array<File>>fileInput.target.files;
      this.readThis(fileInput.target);
      
  }
  // PREVISUALIZACION IMAGEN

  

  readThis(inputValue: any) : void {
    var file:File = inputValue.files[0]; 
    var myReader:FileReader = new FileReader();
    let ctx=this;
    myReader.readAsDataURL(file);
    myReader.onloadend = function(e){
      // you can perform an action with readed data here      
      console.log(myReader.result);
      ctx.srcH=myReader.result;      
    }

    myReader.readAsText(file);
  }

}

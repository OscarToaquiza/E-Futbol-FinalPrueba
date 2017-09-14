import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import {User} from '../../../models/user.model';
import {Noticia} from '../../../models/noticia.model';
import {NoticiaService} from '../../../services/noticia.service';
import {UserService} from '../../../services/user.service';
import swal from 'sweetalert2';
import { GLOBAL } from '../../../services/global';
@Component({
  selector: 'app-agregar-noticia',
  templateUrl: './agregar-noticia.component.html'  
})
export class AgregarNoticiaComponent implements OnInit {
  @Output() notificacion=new EventEmitter();
  @Output() cerrar=new EventEmitter();
  public title:string;

  public fileSuccess:Boolean;
  public url: string;
  public srcH:any;
  public identity;
  public token;
  public btnGuardarNoticia:boolean=true;
  public btnUpdateNoticia:boolean=false;
  public noticia_nueva: Noticia;
  constructor(private _US:UserService,						
    private _noticiaservice : NoticiaService,    
	){
    this.url = GLOBAL.url;
    this.fileSuccess=false;
		this.title = 'Nueva Noticia';
    this.identity = this._US.getIdentity();
    this.token = _US.getToken();
		this.noticia_nueva = new Noticia('','','','','','','',false);
	}

  ngOnInit() { 
    this.srcH=this.url+'noticia/get-image-noticia/default.jpg';   
  }


  guardarNoticia(){
    console.log(this.identity);
      
      this.noticia_nueva.usuario = this.identity._id;
      console.log(this.noticia_nueva);
      //Guardar la Noticia:
      swal({
        title: '¿Está usted seguro?',
        text: "¡La noticia será publicada!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Publicar Noticia!'
      }).then(()=>{
        this._noticiaservice.addNoticia(this.url+'noticia/save', this.noticia_nueva,this.filesToUpdate,this.token,'image')
        .then(response=>{ 
          console.log(response);
          if(response){
            swal(
              '¡Noticia creada!',
              'La noticia ha sido publicada con exito.',
              'success'
            )
          }else{
            swal(
              'Oops...',
              '¡Algo salio mal, pruebe despues de un momento!',
              'error'
            )
          }        
          this.notificacion.emit("Noticia creada");
         }).catch(()=>{
          swal(
            'Oops...',
            '¡Algo salio mal, pruebe despues de un momento!',
            'error'
          )
         }); 
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

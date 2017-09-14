import { Observable } from 'rxjs/Observable';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Noticia} from '../../../models/noticia.model';
import {NoticiaService} from '../../../services/noticia.service'
import {UserService} from '../../../services/user.service'
import{GLOBAL} from '../../../services/global';
import swal from 'sweetalert2';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-ver-noticias',
  templateUrl: './ver-noticias.component.html',  
})

export class VerNoticiasComponent implements OnInit {
  
  public url:string;
  public identity;
  public token;
  //Declarar modelos 
  public noticiaNueva:Noticia;
  public noticia:Noticia;  
  //Variables de paginación
  public next_page;
  public prev_page;
  public pagina=1;
  public srcItem:Array<String>;

  @Output() mostrar=new EventEmitter();
  @Input('notificacion') 
  @Output() enviarNoticiasCarrusel=new EventEmitter();
  set notificacion(value: Noticia) {
    this.traerTresNoticias(1);
  }
  verNoticiaNueva:boolean=true;

	constructor( 
    private _US:UserService,   		    
    private _noticiaservice : NoticiaService
	){
    this.pagina=1;
    this.next_page=1;
    this.prev_page=1; 
    this.url=GLOBAL.url; 
    this.identity = this._US.getIdentity();
    this.token = _US.getToken();  
    this.srcItem=new Array();        		    
	}

	ngOnInit(){		 
    this.traerTresNoticias(this.pagina); 
  }

  emitirEvento(elementoSeleccionado:string, noticiaEdit=null,srcItem){
    // console.log(noticia);  
    this.mostrar.emit({
        'mensaje':{
          'componente':elementoSeleccionado,
          'noticiaEditar':noticiaEdit,
          'srcItem':srcItem,
          'noticias':this.noticia
        }
      });
  }
  
  sumar(){
    this.pagina = this.pagina+1;
    console.log(this.pagina);
    this.traerTresNoticias(this.pagina);
  }
  restar(){
    this.pagina = this.pagina-1;
    if(this.pagina <= 0){
      this.pagina=1;
    }
    console.log(this.pagina);
    this.traerTresNoticias(this.pagina);
  }

  // getNoticias(page){
  //   if(!page){
  //       page = 1;
  //   }else{
  //       this.next_page = page+1;
  //       this.prev_page = page-1;
  //       // controlar page negativo

  //       if(this.prev_page <= 0){
  //           this.prev_page=1;
  //           page=1;
  //       }
  //   }
  //   this.traerTresNoticias(page);

  // }


  traerTresNoticias(page){
    console.log(page)
              this._noticiaservice.getNoticias(page).subscribe(
              response => {
                  console.log(response);
                  if (!response.mensaje) {
                      console.log("No hay Noticias Creadas");
                      //this._router.navigate(['/']);
                  } else {
                      this.noticia = response.mensaje;                      
                      console.log("1"+response.mensaje);
                      response.mensaje.forEach((element,i) => { 
                        if(element.image!=null && element.image!=undefined && element.image!='')                                                                                          
                          {                          
                            this.srcItem[i]=this.url+'noticia/get-image-noticia/'+element.image;
                            this.noticia[i].image=element.image;}
                        else
                          {                            
                            this.srcItem[i]=this.url+'noticia/get-image-noticia/default.jpg';
                            this.noticia[i].image='default.jpg';}
                      });
                      // this.enviarNoticiasCarrusel.emit({'noticias':this.noticia});   
                           
                      let tamaño = response.mensaje.length;
                      if(tamaño == 0){
                        this.pagina=page-2;
                        console.log("NO HAY MAS Noticias");
                      }
                      console.log(this.noticia);
                      console.log("Tamaño del Vector: "+tamaño);
                  }

              },
              error => {
                  var errorMessage = <any>error;
                  if (errorMessage != null) {
                      // var body = JSON.parse(error._body);
                      //this.alertMessage = body.message;
                      console.log(error);
                  }
              }
      )
  }


  eliminarNoticia(noticiaItem){
    console.log("Eliminando...");
    let ctx=this;
    swal({
      title: '¿Está usted seguro?',
      text: "¡Usted no será capaz de revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar Noticia!'
    }).then(function () {
      ctx._noticiaservice.deleteNoticia(ctx.token,noticiaItem._id)
      .subscribe(res=>{
        if(res){
          console.log(res);
          swal(
            '¡Eliminado!',
            'La noticia ha sido eliminada con exito.',
            'success'
          )
          ctx.traerTresNoticias(1);
        }else{
          swal(
            'Oops...',
            '¡Algo salio mal, pruebe despues de un momento!',
            'error'
          )
          console.log("La noticia no pudo ser eliminada, intente de nuevo");
        }
      });      
    })
  }

}

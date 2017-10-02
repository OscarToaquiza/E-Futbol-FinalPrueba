import { Component, OnInit,Input,OnChanges } from '@angular/core';
import {NoticiaService} from '../../../services/noticia.service'
import {Noticia} from '../../../models/noticia.model';
import {GLOBAL} from '../../../services/global';

import {EquipoService} from '../../../services/equipo.service';
import { Equipo } from '../../../models/equipo.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit,OnChanges {
  @Input() noticias:any;
  public noticia:Noticia;  
  public next_page;
  public prev_page;
  public pagina=1;
  public srcItem:Array<String>;
  public url:string;

  public equipos: Equipo[];
  
  constructor(
    private _noticiaservice:NoticiaService,
    private _equipoService:EquipoService
  ) { 
    this.pagina=1;
    this.next_page=1;
    this.prev_page=1; 
    this.url=GLOBAL.url; 
    // this.identity = this._US.getIdentity();
    // this.token = _US.getToken();  
    this.srcItem=new Array();  
  }

  ngOnInit() {

    this.pagina=1;
    this.next_page=1;
    this.prev_page=1; 
    // this.url=GLOBAL.url; 
    // this.identity = this._US.getIdentity();
    // this.token = _US.getToken();  
    this.srcItem=new Array();    
    this.traerTresNoticias(this.pagina); 
    this.obtenerequipos();
    console.log(this.noticia); 
       
  }
  ngOnChanges(){
    // alert(this.noticias);
  }

  guardarEquipoSeleccionado(equi) {
    localStorage.setItem('equipoSeleccionado', JSON.stringify(equi));
  }
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
                      console.log(this.noticia);                      
                      console.log("1"+response.mensaje);
                      response.mensaje.forEach((element,i) => { 
                        if(element.image!=null && element.image!=undefined && element.image!='')                                                                                          
                          {
                            console.log("holaaaaa src");
                            this.srcItem[i]=this.url+'noticia/get-image-noticia/'+element.image;
                            this.noticia[i].image=element.image;}
                        else
                          {
                            console.log("holaaaaa src2");
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

  obtenerequipos() {
    this._equipoService.getEquipos().subscribe(
      response => {
        if (!response.equiposEncontrados) {
          console.log(" La categoria no tiene Equipos ");
        } else {
          this.equipos = response.equiposEncontrados;
          console.log(this.equipos);
        }
      },
      error => {
        var errorMessage = <any>error;

        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          //this.alertMessage = body.message;
          console.log(error);
        }

      });
  }


}

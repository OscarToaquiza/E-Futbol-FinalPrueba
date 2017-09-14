import { Component, OnInit } from '@angular/core';
import{SliderComponent}from './slider/slider.component';
import{AgregarNoticiaComponent} from './noticias/agregar-noticia.component';
import{EditarNoticiaComponent} from './noticias/editar-noticia.component';
import { NgSwitch } from '@angular/common';
import{TablaPosicionesComponent} from './tabla-posiciones/tabla-posiciones.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public verElemento:string="tabla";
  public noticia_editar:any;
  public srcItem:any;
  public msgEvent:any;
  public noticias:any;
  constructor() { }
  
  mostrarElemento(event){
    this.verElemento=event.mensaje.componente;
    this.noticia_editar=event.mensaje.noticiaEditar;
    this.srcItem=event.srcItem;
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX");
    
    console.log(this.noticia_editar);    
    console.log(event);
  }

  onUpdateNoticia(event){
    console.log(event);
    this.msgEvent=event+JSON.stringify(this.noticia_editar)+this.srcItem;
  }

  onCloseNoticiaAdd(event){
    console.log(event);
    this.verElemento=event;
    
  }


  onCloseNoticiaEditar(event){
    this.verElemento=event;
  }
  ngOnInit() {
  }

  recibirNoticiasDeVerNoticias(event){
    this.noticias=event.noticas;
    console.log("rrrrrrrrrrrrrrrrrrrrrr");
    console.log(this.noticias);
  }

}

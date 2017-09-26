import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TemporadaService } from '../../services/temporada.service';
import { UserService } from '../../services/user.service';
import { CategoriaService } from '../../services/categoria.service';
import { FechaService } from '../../services/fecha.service';
import { GLOBAL } from '../../services/global';

import { Categoria } from '../../models/categoria.model';
import { Temporada } from '../../models/temporada.models';
// import * as jsPDF from  'jspdf';
// import * as $ from 'jquery';
// import * as html2canvas from 'html2canvas';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  
  public mostrar_formulario_inicial = false;
  // public guardado = true;
  public temporada_actual: Temporada;
  public url: string;
  public token;
  public pdf;
  public identity;

  public titulo= 'Nueva Categoria';
  public categorias: Categoria[];
  public categoria: Categoria;

  public array: any;
  public arrayCategoria = new Array();
  public idModifcar: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _temporadaService: TemporadaService,
    private _categoriaService: CategoriaService,
    private _fechaService: FechaService
  ) {
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    
    this.identity = this._userService.getIdentity();    
    this.categoria = new Categoria('','', 0, '', '', false, this.array);
   }

  ngOnInit() {
    this.obtenerTemporadas();
  }

  obtenerTemporadas() {
    this._temporadaService.getTemporadas().subscribe(
      response => {
        if (!response) {
          // this.validarTemporadas = false;
        } else {
          response.forEach(element => {
            if ( element.estado_temporada ) {
              this.temporada_actual = element;
              console.log(this.temporada_actual);
              this.mostrar_formulario_inicial = true;
            }
          });
        this.CategoriasTemporada(this.temporada_actual._id);
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          console.log(body);
        }
      }
    );
  }

  CategoriasTemporada(id:string){
    this._categoriaService.getCategorias().subscribe(
      response => {
        if (!response){
          console.log("No existen categorias");
        }else{
          let i=0;
          for (var index = 0; index < response.length; index++) {
            // console.log("alo 1 "+ response[index].id_temporada + "id: "+ id) ;
            if( response[index].id_temporada == id){
              console.log(" Id de la temporada en categoria "+response[index].id_temporada);
              this.arrayCategoria[i] = response[index];
              i++
            }
          }
          console.log(response);
          console.log(this.arrayCategoria);
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          console.log(body);
        }
        });
  }

  rolSelect(estado: boolean){
    this.categoria.segunda_vuelta = estado;
    console.log(event);
  }
  
  setProperty(inChecked: boolean) {
    this.categoria.segunda_vuelta = inChecked;
}
  guardarcategoria(){
    this.categoria.id_temporada = this.temporada_actual._id;
    console.log(this.categoria);
    this._categoriaService.addCategoria(this.token,this.categoria).subscribe(
      response => {
        console.log(response);
        if (!response) {
          console.log("No se ha podido Guardar la Categoria");
        }else{
          swal(
            'Categoria Exitosamente Creada',
            '',
            'success'
            );
            this.categoria = new Categoria('', '', 0, '', '', false, this.array);
            this.obtenerTemporadas();
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          console.log(body);
        }
        }
    );
  }

  DatsoModificarCategoria(categoriaModifcar: Categoria, id:string){
    this.titulo = 'Modificar Categoria';
    this.categoria = categoriaModifcar;
    this.idModifcar = id;
  }
  ModificarCategoria(){
    this._categoriaService.editCategoria(this.token, this.idModifcar ,this.categoria).subscribe(
      response => {
        if (!response) {
          console.log("Error al Modificar");
        }else{
          console.log(response)
          swal(
            'Categoria Modificada Y Guardada',
            '',
            'success'
            );
            this.categoria = new Categoria('','', 0, '', '', false, this.array);
            // this.guardado = false;
            this.titulo = 'Nueva Categoria';
            this.idModifcar = '';
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          console.log(body);
        }
        }
    );
  }

  generarCalendario(categoria: Categoria, id: string ){
    // let cupoDisponible = categoria.n_equipos_categoria - categoria.codigo_equipo.length;
    // console.log(cupoDisponible);
    // equipos[],idCategoria,segunda_vuelta(true|false)
    if ( (categoria.n_equipos_categoria - categoria.codigo_equipo.length) === 0){
      console.log(categoria.codigo_equipo);

        this._fechaService.generarCalendario(this.token,{equipos:categoria.codigo_equipo,id_categoria:id,segunda_vuelta:categoria.segunda_vuelta}).
        subscribe((res)=>{
          swal(
            'El calendario ha sido generado',
            'EXITOSAMENTE',
            'success'
            );
            
        });
    }else {
      if( (categoria.n_equipos_categoria - categoria.codigo_equipo.length) < 0){
        swal(
          'ERROR',
          'El cupo  disponible debe ser mayor o igual a 0',
          'error'
          );
      }else{
        swal(
          'Todavia existen cupos Disponibles',
          'LLenar los cupos de la Categoria',
          'warning'
          );
      }
    }
  }



  // a(){
  //   let ctx=this;
  //   html2canvas($('#prueba')[0]).then(function(canvas) {
  //     console.log(":D");
  //    var img=canvas.toDataURL("image/png");
  //    let doc = new jsPDF()        
  //   //  doc.fromHTML($('#prueba')[0],35, 25)           
  //   doc.addImage(img,'JPEG',20,20);     
  //   ctx.pdf=doc.output('datauristring')
  //    console.log(doc.output('datauristring'));
  //   // doc.save('file.pdf');     

  // });          
  // }  
  
  // b()
  // {
  //   let doc = new jsPDF()
        
  //   doc.fromHTML($('#prueba')[0],35, 25,{'background-color':'red'})             
  //   doc.save('file.pdf');     
  // }

}

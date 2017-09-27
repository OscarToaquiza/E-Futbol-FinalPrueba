import { Component, OnInit } from '@angular/core';
import { TemporadaService } from './services/temporada.service';
import { CategoriaService } from './services/categoria.service';
import { Categoria } from './models/categoria.model';
import { Temporada } from './models/temporada.models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public temporada_actual: Temporada;
  public arrayCategoria = new Array();
  constructor(
    private _temporadaService: TemporadaService,
    private _categoriaService: CategoriaService,
  ){ }
  ngOnInit(
  ){
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
              localStorage.setItem('Temporada_Actual',JSON.stringify(this.temporada_actual));
            }
          });
        // this.CategoriasTemporada(this.temporada_actual._id);
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

  // CategoriasTemporada(id:string){
  //   this._categoriaService.getCategorias().subscribe(
  //     response => {
  //       if (!response){
  //         console.log("No existen categorias");
  //       }else{
  //         let i=0;
  //         for (var index = 0; index < response.length; index++) {
  //           // console.log("alo 1 "+ response[index].id_temporada + "id: "+ id) ;
  //           if( response[index].id_temporada == id){
  //             console.log(" Id de la temporada en categoria "+response[index].id_temporada);
  //             this.arrayCategoria[i] = response[index];
  //             i++
  //           }
  //         }
  //         console.log(response);          
  //         console.log(this.arrayCategoria);
  //       }
  //     },
  //     error => {
  //       var errorMessage = <any>error;
  //       if (errorMessage != null) {
  //         var body = JSON.parse(error._body);
  //         console.log(body);
  //       }
  //       });
  // }

}


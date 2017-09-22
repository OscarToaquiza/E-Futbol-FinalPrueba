// import { element } from 'protractor';
import { Personal } from './../../models/personal.model';
import { Component, OnInit } from '@angular/core';

import { TemporadaService } from '../../services/temporada.service';
// import { UserService } from '../../services/user.service';
import { CategoriaService } from '../../services/categoria.service';
import { FechaService } from './../../services/fecha.service';
import * as _ from 'lodash';
import { Categoria } from '../../models/categoria.model';
import { Fecha } from './../../models/fecha.model';
import { Temporada } from '../../models/temporada.models';

import { GLOBAL } from '../../services/global';

import swal from 'sweetalert2';

@Component({
  selector: 'app-calendario-general',
  templateUrl: './calendario-general.component.html',
  styleUrls: ['./calendario-general.component.css']
})
export class CalendarioGeneralComponent implements OnInit {

  p: number = 1;

  public temporada_actual: Temporada;
  public arrayCategoria = new Array();
  public categoriaSeleccionada:any;
  public fechaAgrupada:any;
  public fecha:any;
  // public fechaAgrupadaT1:any;
  public VerCalendario= false;

  public primeraVuelta= new Array();
  public segundaVuelta= new Array();

  public primeraVueltaClasificada : any;
  public fechaAgrupadaSegundaVuelta: any;
  // public fechasPriemraVuelta: Fecha[];

  public verVuelta = '1';

  public url: string;

  constructor(
    private _temporadaService: TemporadaService,
    private _categoriaService: CategoriaService,
    private _fechaService: FechaService
  ) {
    this.url = GLOBAL.url;
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
  onChangeCategoria(e){
    this.categoriaSeleccionada=e;
    this.obtenerCalendario(e);
    this.p = 1;
  }
  
  // *ngFor="let fec of fechaAgrupada"
  obtenerCalendario(e){    
    if(e.target.selectedIndex!=0)
      {        
        console.log(e.target.selectedIndex);
        let index=e.target.selectedIndex-1;        
          this._fechaService.getFechaByIdCategoria(this.arrayCategoria[index]._id)
          .subscribe((res)=>{            
            if(res){
              this.fecha=res;
              console.log(":D");
              this.fechaAgrupada = _.values(_.groupBy(this.fecha.fechasEncontradas,'n_fecha'));
              this.VerCalendario = true;
              console.log(this.fechaAgrupada);
              console.log('Hay segunda Vuelta? ' + this.arrayCategoria[index].segunda_vuelta);
              let val1 = 0;
              let val2 = 0;
              //Reiniciar los array
              this.primeraVuelta = new Array();
              this.segundaVuelta = new Array();
              if( this.arrayCategoria[index].segunda_vuelta == true){
                this.primeraVuelta.length = 0;
                this.fechaAgrupada.forEach(element => {
                  element.forEach(ele => {
                    // console.log(ele.primera_segunda);
                    if(ele.primera_segunda == 1){
                      // console.log("Si");
                      if(ele.id_equipo1 != null && ele.id_equipo2 !=null){
                        this.primeraVuelta[val1] = ele;
                        val1++;
                      }
                    }else{
                      // console.log("No");
                      if(ele.id_equipo1 != null && ele.id_equipo2 !=null){
                        this.segundaVuelta[val2] = ele;
                        val2++;
                      }
                    }
                  });
                });
                this.primeraVueltaClasificada = _.values(_.groupBy(this.primeraVuelta, 'n_fecha'));
                this.fechaAgrupadaSegundaVuelta = _.values(_.groupBy(this.segundaVuelta, 'n_fecha'));
                console.log(this.primeraVueltaClasificada);
                console.log(this.fechaAgrupadaSegundaVuelta);
              this.fechaAgrupada = this.primeraVueltaClasificada;
                // this.fechasPriemraVuelta = this.primeraVuelta;
              console.log('Primera Vuelta: ' + this.primeraVuelta);
              console.log('Segunda Vuelta: ' + this.segundaVuelta);
              }else{
                console.log("Un sola vuelta");
                this.verVuelta = '1';
                console.log('Primera Vuelta: ' + this.primeraVuelta);
                console.log('Segunda Vuelta: ' + this.segundaVuelta);

              }
              // console.log(this.fechaAgrupada[0].Array[1]);
            }else{
              console.log('Fechas no encontradas');
            }
          },(err)=>{
            if(err.status==404){
              swal(
                'Calendario',
                '¡No existe un calendario para esta categoría.!',                
              )
            }else{
              swal(
                'Oops...',
                '¡Algo salio mal, pruebe despues de un momento!',
                'error'
              )
            }
          });
      }else{
        console.log("No se ha seleccionado una categoria.");        
      }
  }


  calendarioVuelta(value: string){
    this.verVuelta = value;
    this.p = 1;
  }

}

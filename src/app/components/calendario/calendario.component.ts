import { Sancion } from './../../models/sancion.model';
import { element } from 'protractor';
import { Personal } from './../../models/personal.model';
import { Component, OnInit } from '@angular/core';
import { SancionService } from './../../services/sancion.service';
import { TemporadaService } from '../../services/temporada.service';
import { UserService } from '../../services/user.service';
import { CategoriaService } from '../../services/categoria.service';
import { FechaService } from './../../services/fecha.service';
import * as _ from 'lodash';
import { Categoria } from '../../models/categoria.model';
import { Fecha } from './../../models/fecha.model';
import { Temporada } from '../../models/temporada.models';

import { EstadioService } from '../../services/estadio.service';

import { Estadio } from '../../models/estadio.model';

import { GLOBAL } from '../../services/global';

import * as jsPDF from  'jspdf';
import * as $ from 'jquery';
import * as html2canvas from 'html2canvas';

import swal from 'sweetalert2';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public Vocalia = false;

  public arrayPersonal1 = new Array(25);
  public arrayPersonal2= new Array(25);

  public datosVocalia : any;
  public categoriaActual: string;

  public p: number = 1;

  public partidosSuspencionEquipo1 = new Array();
  public partidosSuspencionEquipo2 = new Array();


  public token;
  public temporada_actual: Temporada;
  public fecha:any;
  public plantilla:any;
  public fechaAgrupada: any;

  public f: Fecha;
  public fechas= new Array(this.f);

  public fechaAgrupadaT1:any;
  public fechaAgrupadaT2:any;
  public fechaAux:any;
  public arrayCategoria = new Array();
  public generarSelectJugadoresGoles1: any;
  public generarSelectJugadoresTA1: any;
  public generarSelectJugadoresTR1: any;
  public generarSelectJugadoresGoles2: any;
  public generarSelectJugadoresTA2: any;
  public generarSelectJugadoresTR2: any;
  public categoriaSeleccionada:any;

  public estadios: Estadio[];
  public estadioSelec: string;

  public id_Habilitar: String;
  public partidoJugado= false;

  public VerCalendario= false;

  public primeraVuelta= new Array();
  public segundaVuelta= new Array();

  public primeraVueltaClasificada : any;
  public fechaAgrupadaSegundaVuelta: any;

  // public primeraVuelta= new Array(new Array());
  // public segundaVuelta= new Array(new Array());

  public verVuelta = '1';
  public url: string;

  public sanciones:Sancion;
  constructor(
    private _userService: UserService,
    private _temporadaService: TemporadaService,
    private _categoriaService: CategoriaService,
    private _fechaService: FechaService,
    private _estadioService: EstadioService,
    private _sancionService: SancionService
  ) {
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
   }

   ngOnInit() {
    this.obtenerTemporadas();
    this.obtenerEstadios();
    // this.getSancion();
  }

  // getSancion(){
  //   this._sancionService.getSancion()
  //   .subscribe((res)=>{
  //     console.log(res);
  //     this.sanciones=res;
  //   },(err)=>{
  //     console.log("Error");
  //     console.log(err);
  //     if(err.status!=404)
  //     {
  //       swal(
  //         'Oops...',
  //         '¡Algo salio mal, pruebe despues de un momento!',
  //         'error'
  //       )
  //     }
  //   });
  // }

  obtenerEstadios(){
    this._estadioService.getEstadios().subscribe(
      response =>{
        if(!response){
          console.log("Error al traer estadios");
        }else{
          this.estadios = response;
        }
      },
      error =>{

      });
  }

  selectEstadio(estadioSeleccionado,e){
    console.log(estadioSeleccionado);
    console.log(e);
    this.estadioSelec=estadioSeleccionado;
  }

  obtenerTemporadas() {
    this.temporada_actual = this.temporada_actual = JSON.parse(localStorage.getItem('Temporada_Actual'));
    this.CategoriasTemporada(this.temporada_actual._id);
    // this._temporadaService.getTemporadas().subscribe(
    //   response => {
    //     if (!response) {
    //       // this.validarTemporadas = false;
    //     } else {
    //       response.forEach(element => {
    //         if ( element.estado_temporada ) {
    //           this.temporada_actual = element;
    //           console.log(this.temporada_actual);
    //         }
    //       });
    //     this.CategoriasTemporada(this.temporada_actual._id);
    //     }
    //   },
    //   error => {
    //     var errorMessage = <any>error;
    //     if (errorMessage != null) {
    //       var body = JSON.parse(error._body);
    //       console.log(body);
    //     }
    //   }
    // );
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
    this.categoriaActual = e.target.value;
    this.p = 1;
    this.categoriaSeleccionada = e;
    this.obtenerCalendario(e);
  }

  // *ngFor="let fec of fechaAgrupada"
  obtenerCalendario(e){
    if(e.target.selectedIndex!=0)
      {
        console.log(e.target.selectedIndex);
        let index=e.target.selectedIndex-1;
          this._fechaService.getFechaByIdCategoriaAdministrador(this.arrayCategoria[index]._id)
          .subscribe((res)=>{
            if(res){
              this.fecha=res;
              this.fechaAgrupadaT1=JSON.stringify(this.fecha.fechasEncontradas[2]);

              // this.fechaAux=this.fecha.fechasEncontradas;
              console.log(":D");
              // console.log(_.values(_.groupBy(this.fecha.fechasEncontradas,'n_fecha')));

              //  let LongF=this.fechaAux.length;
              //  this.fechaAgrupadaT1=this.fechaAux.splice(0,LongF/2);
              //  console.log(_.values(_.groupBy(this.fechaAux,'n_fecha')));
              //  console.log("##");
              //  console.log(_.values(_.groupBy(this.fechaAgrupadaT1,'n_fecha')));
              // console.log(this.fecha.fechasEncontradas);
              console.log(this.fecha.fechasEncontradas);
              this.fechaAgrupada=_.values(_.groupBy(this.fecha.fechasEncontradas,'n_fecha'));
              console.log(this.fechaAgrupada);
              // console.log(a);
              // this.fechaAgrupadaT1=_.values(_.groupBy(_.chunk(this.fecha.fechasEncontradas,2)[0],'n_fecha'));
              // console.log(_.values(_.groupBy(_.chunk(_.values(this.fecha.fechasEncontradas),2),'n_fecha')));
              // console.log(_.chunk(_.values(this.fecha.fechasEncontradas),2));
              // if(this.arrayCategoria[index].segunda_vuelta){
              //   this.fechaAgrupadaT2=_.values(_.groupBy(_.chunk(this.fecha.fechasEncontradas,2)[1],'n_fecha'));
              // }

              // console.log(_.values(_.groupBy(this.fecha.fechasEncontradas,'n_fecha'))[0]);
              // console.log(_.groupBy([{a:1,j:"j"},{a:2,j:"b"},{a:1,j:":D"}],'a'));
              // _.chain(this.standings)
              // .groupBy('division')
              // .toPairs()
              // .map(item => _.zipObject(['divisionName','divisionStandings'],item))
              // .value();

              this.VerCalendario = true;
              // console.log(this.fechaAgrupada);
              console.log('Hay segunda Vuelta? ' + this.arrayCategoria[index].segunda_vuelta);
              let val1 = 0;
              let val2 = 0;

              //Reiniciar los array
              this.primeraVuelta = new Array();
              this.segundaVuelta = new Array();

              if( this.arrayCategoria[index].segunda_vuelta == true){
                this.fechaAgrupada.forEach(element => {
                  element.forEach(ele => {
                    if(ele.primera_segunda == 1){
                      if(ele.id_equipo1 != null && ele.id_equipo2 !=null){
                        this.primeraVuelta[val1] = ele;
                        val1++;
                      }
                    }else{
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
              console.log('Primera Vuelta: ' + this.primeraVuelta);
              console.log('Segunda Vuelta: ' + this.segundaVuelta);
              this.fechas = this.fechaAgrupada;

              }else{
                this.fechas = this.fechaAgrupada;
                console.log('Array de tipo fechas:');
                console.log(this.fechas);
                console.log("Un sola vuelta");
                this.verVuelta = '1';
                console.log('Primera Vuelta: ' + this.primeraVuelta);
                console.log('Segunda Vuelta: ' + this.segundaVuelta);

              }

            }else{
              console.log("Fechas no encontradas");
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

  generarGoles1(GOL1: number,fecha){
    fecha.goles_equipo1 = new Array(GOL1);
  }
  generarTA1(TA1: number,fecha){
    fecha.tarjetas_amarilla_equipo1 = new Array(TA1);
  }
  generarTR1(TR1: number,fecha){
    fecha.tarjetas_roja_equipo1 = new Array(TR1);
  }
  generarGoles2(GOL2: number,fecha){
    fecha.goles_equipo2 = new Array(GOL2);
  }
  generarTA2(TA2: number,fecha){
  fecha.tarjetas_amarilla_equipo2 = new Array(TA2);
  }
  generarTR2(TR2: number,fecha){
    fecha.tarjetas_roja_equipo2 = new Array(TR2);
  }

  guardarFecha(fechas,r){
    console.log(fechas);
    // fechas.forEach(element => {
    //   if(element.primera_segunda==r)
    //   {
    //     element.jugado=true;
    //     this._fechaService.updateCalendario(this.token,element,element._id)
    //     .subscribe((response)=>{
    //       console.log(response);
    //     },(err)=>{
    //         swal(
    //           'Oops...',
    //           '¡Algo salio mal, pruebe despues de un momento!',
    //           'error'
    //         )
    //     });
    //   }

    // });
    // this.obtenerCalendario(this.categoriaSeleccionada);
  }

  HabilitarResultados(id){
    this.id_Habilitar = id;
    this.partidoJugado = true;
  }
  DesabilitarResultados(){
    this.id_Habilitar = '';
    this.partidoJugado = false;
  }

  guardarPartido(partido,estadio,fecha){
    let data1 = new Array();
    let data2 = new Array();
    console.log(this.partidosSuspencionEquipo1);
    console.log(this.partidosSuspencionEquipo2);
    let arrayIdsEquipo1 = partido.tarjetas_roja_equipo1;
    let arrayIdsEquipo2 = partido.tarjetas_roja_equipo2;
    console.log(arrayIdsEquipo1);
    console.log(arrayIdsEquipo2);
    partido.tarjetas_roja_equipo1 = new Array();
    partido.tarjetas_roja_equipo2 = new Array();
    for (var index = 0; index < this.partidosSuspencionEquipo1.length; index++) {
        data1[index] = {
          'partidosSuspendidos' : this.partidosSuspencionEquipo1[index],
          'id' : arrayIdsEquipo1[index]
        }
    }
    for (var index = 0; index < this.partidosSuspencionEquipo2.length; index++) {
      data2[index] = {
        'partidosSuspendidos' : this.partidosSuspencionEquipo2[index],
        'id' : arrayIdsEquipo2[index]
      }
  }
    console.log(data1);
    partido.tarjetas_roja_equipo1 = data1;
    partido.tarjetas_roja_equipo2 = data2;
    console.log(partido);
    console.log("estadio:" + estadio._id);
    if(this.estadioSelec == ''){
      partido.id_estadio = estadio;
    }else{
      partido.id_estadio = this.estadioSelec;
    }
    partido.fecha = fecha;
    partido.estado_fecha = this.partidoJugado;
    partido.jugado = this.partidoJugado;
    console.log(partido);

    this._fechaService.updateCalendario(this.token,partido,partido._id).subscribe(
      response =>{
        if(!response){
          swal(
             'Error',
             '¡El servidor no responde!',
             'error'
             );
        }else{
            swal(
              'Guardado',
              'Exitosamente',
              'success'
            );
            this.partidoJugado = false;
            this.estadioSelec = '';
            console.log(response);
        }
      },
      error =>{

      }
    );

    // let fechaModificada: Fecha;
    // fechaModificada = partido;
    // fechaModificada.estado_fecha = true;
    // fechaModificada.id_estadio = this.estadioSelec;
    // console.log(fechaModificada);
  }

  calendarioVuelta(value: string){
    this.verVuelta = value;
    this.p = 1;
  }

  b(){
    // let ctx=this;
    html2canvas($('#hojaVocalia')[0]).then(function(canvas) {
      console.log(":D");
     var img=canvas.toDataURL("image/png");
     let doc = new jsPDF()
    //  doc.fromHTML($('#prueba')[0],35, 25)
    doc.addImage(img,'JPEG',5,5);
    // ctx.pdf = doc.output('datauristring')
    //  console.log(doc.output('datauristring'));
    doc.save('file.pdf');
  });
  }

  datos(data){
    let i = 0;
    let j = 0;
    this.Vocalia = true;
    this.datosVocalia = data;
    this.datosVocalia.estadio = 'NO ASIGNADO';
    this.datosVocalia.categoria = this.categoriaActual;
    console.log(data);
    for (var index = 0; index < this.estadios.length; index++) {
      if(this.estadios[index]._id === data.id_estadio){
        console.log('Si hay estadio');
        this.datosVocalia.estadio = this.estadios[index].nombre_estadio;
        break;
      }
    }
    data.id_equipo1.personal_equipo.forEach(element => {
      if(element.rol_personal === 'jugador'){
        this.arrayPersonal1[i] = element;
        i++;
      }
    });

    this.arrayPersonal1 = _.orderBy(this.arrayPersonal1,['nombre_personal'],['asc']);
    data.id_equipo2.personal_equipo.forEach(element => {
      if(element.rol_personal === 'jugador'){
        this.arrayPersonal2[j] = element;
        j++;
      }
    });
    this.arrayPersonal2 = _.orderBy(this.arrayPersonal2,['nombre_personal'],['asc']);


  }
}

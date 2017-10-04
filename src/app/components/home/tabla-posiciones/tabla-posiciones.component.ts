
import { Component, OnInit,Pipe } from '@angular/core';
import { TemporadaService } from '../../../services/temporada.service';
import { UserService } from '../../../services/user.service';
import { CategoriaService } from '../../../services/categoria.service';
import { FechaService } from '../../../services/fecha.service';
import * as _ from 'lodash';
import { Categoria } from '../../../models/categoria.model';
import { Fecha } from '../../../models/fecha.model';
import { Temporada } from '../../../models/temporada.models';

import {OrdenVector} from '../../../pipes/orden-vector'
import swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-posiciones',
  templateUrl: './tabla-posiciones.component.html',
  styleUrls: ['./tabla-posiciones.component.css']  
})

export class TablaPosicionesComponent implements OnInit {
  public cClass:Array<Boolean>;  
  public token;
  public temporada_actual: Temporada;
  public fecha:any;
  public plantilla:any;
  public fechaAgrupada:any;
  public fechaAgrupadaT1:any;
  public fechaAgrupadaT2:any;
  public fechaAux:any;
  public arrayCategoria = new Array();
  public categoriaSeleccionada:any;
  public categoriaSeleccionadaParaEquipos:any;


  // TABLA


  
  constructor(
    private _userService: UserService,
    private _temporadaService: TemporadaService,
    private _categoriaService: CategoriaService,
    private _fechaService: FechaService
  ) {    
    this.token = this._userService.getToken();             
   }

   ngOnInit() {
      this.obtenerTemporadas();                        
      this.cClass=new Array();     
      this.cClass[0]=true;
      this.obtenerFechas(0);

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
    //      this.CategoriasTemporada(this.temporada_actual._id);
              
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
  onClass(i){    
    this.cClass.fill(false);    
    this.cClass[i]=true;            
    //OBTENER PARTIDOS
    console.log(this.arrayCategoria);    
    this.obtenerFechas(i);

  }


  obtenerFechas(e){  
        let fechasPorEquipo=new Array();
        if(this.arrayCategoria[e]!= undefined)
        {
          this._fechaService.getFechaByIdCategoria(this.arrayCategoria[e]._id)
          .subscribe((res)=>{            
            if(res){
              this.fecha=res;
              console.log(this.fecha);
              this.arrayCategoria[e].codigo_equipo.forEach((equipo,i)=> {
                this.arrayCategoria[e].codigo_equipo[i]['PJ']=0;
                this.arrayCategoria[e].codigo_equipo[i]['PG']=0;
                this.arrayCategoria[e].codigo_equipo[i]['PE']=0;
                this.arrayCategoria[e].codigo_equipo[i]['PP']=0;                  
                this.arrayCategoria[e].codigo_equipo[i]['GF']=0; 
                this.arrayCategoria[e].codigo_equipo[i]['GC']=0; 
                this.arrayCategoria[e].codigo_equipo[i]['GD']=0; 
                this.arrayCategoria[e].codigo_equipo[i]['P']=0; 
                this.arrayCategoria[e].codigo_equipo[i]['SC']=0; 
                this.fecha.fechasEncontradas.forEach((fecha,j) => {                                
                  
                  if(fecha.id_equipo1!=null && fecha.id_equipo1!=undefined && fecha.id_equipo2!=null && fecha.id_equipo2!=undefined && fecha.jugado)
                  {                  
                    if(fecha.id_equipo1._id==equipo._id || fecha.id_equipo2._id==equipo._id)
                    {                    
                      
                      this.arrayCategoria[e].codigo_equipo[i]['PJ']=this.arrayCategoria[e].codigo_equipo[i]['PJ']+1; 
                      if(fecha.id_equipo1._id==this.arrayCategoria[e].codigo_equipo[i]._id && (fecha.goles_equipo1.length>fecha.goles_equipo2.length))
                      {
                        this.arrayCategoria[e].codigo_equipo[i]['PG']=this.arrayCategoria[e].codigo_equipo[i]['PG']+1;                       
                        this.arrayCategoria[e].codigo_equipo[i]['GF']=fecha.goles_equipo1.length+this.arrayCategoria[e].codigo_equipo[i]['GF']; 
                        this.arrayCategoria[e].codigo_equipo[i]['GC']=fecha.goles_equipo2.length+this.arrayCategoria[e].codigo_equipo[i]['GC'];
                        
                        if(fecha.codigo_sancion_equipo1!=undefined && fecha.codigo_sancion_equipo1!=null)
                        {
                          this.arrayCategoria[e].codigo_equipo[i]['SC']=fecha.codigo_sancion_equipo1.pts_sancion;  
                          this.arrayCategoria[e].codigo_equipo[i]['P']=this.arrayCategoria[e].codigo_equipo[i]['P']+3-fecha.codigo_sancion_equipo1.pts_sancion; 
                        }else{
                          this.arrayCategoria[e].codigo_equipo[i]['P']=this.arrayCategoria[e].codigo_equipo[i]['P']+3
                        }
                      }else if(fecha.id_equipo2._id==this.arrayCategoria[e].codigo_equipo[i]._id && (fecha.goles_equipo2.length>fecha.goles_equipo1.length)){
                        this.arrayCategoria[e].codigo_equipo[i]['PG']=this.arrayCategoria[e].codigo_equipo[i]['PG']+1; 
                        this.arrayCategoria[e].codigo_equipo[i]['GF']=fecha.goles_equipo2.length+this.arrayCategoria[e].codigo_equipo[i]['GF']; 
                        this.arrayCategoria[e].codigo_equipo[i]['GC']=fecha.goles_equipo1.length+this.arrayCategoria[e].codigo_equipo[i]['GC']; 
                        
                        if(fecha.codigo_sancion_equipo2!=undefined && fecha.codigo_sancion_equipo2!=null)
                        {
                          this.arrayCategoria[e].codigo_equipo[i]['SC']=fecha.codigo_sancion_equipo2.pts_sancion; 
                          this.arrayCategoria[e].codigo_equipo[i]['P']=this.arrayCategoria[e].codigo_equipo[i]['P']+3-fecha.codigo_sancion_equipo2.pts_sancion;
                        }else{
                          this.arrayCategoria[e].codigo_equipo[i]['P']=this.arrayCategoria[e].codigo_equipo[i]['P']+3;
                        }
                      }                    
                      else if(fecha.id_equipo2._id==this.arrayCategoria[e].codigo_equipo[i]._id && (fecha.goles_equipo2.length<fecha.goles_equipo1.length)){
                        this.arrayCategoria[e].codigo_equipo[i]['PP']=this.arrayCategoria[e].codigo_equipo[i]['PP']+1;                      
                        this.arrayCategoria[e].codigo_equipo[i]['GC']=fecha.goles_equipo1.length+this.arrayCategoria[e].codigo_equipo[i]['GC']; 
                        this.arrayCategoria[e].codigo_equipo[i]['GF']=fecha.goles_equipo2.length+this.arrayCategoria[e].codigo_equipo[i]['GF']; 
                        
                        if(fecha.codigo_sancion_equipo2!=undefined && fecha.codigo_sancion_equipo2!=null)
                        {
                          this.arrayCategoria[e].codigo_equipo[i]['SC']=fecha.codigo_sancion_equipo2.pts_sancion; 
                          this.arrayCategoria[e].codigo_equipo[i]['P']=this.arrayCategoria[e].codigo_equipo[i]['P']-fecha.codigo_sancion_equipo2.pts_sancion;
                        }
                      }else if(fecha.id_equipo1._id==this.arrayCategoria[e].codigo_equipo[i]._id && (fecha.goles_equipo1.length<fecha.goles_equipo2.length))
                      {
                        this.arrayCategoria[e].codigo_equipo[i]['PP']=this.arrayCategoria[e].codigo_equipo[i]['PP']+1;
                        this.arrayCategoria[e].codigo_equipo[i]['GC']=fecha.goles_equipo2.length+this.arrayCategoria[e].codigo_equipo[i]['GC']; 
                        this.arrayCategoria[e].codigo_equipo[i]['GF']=fecha.goles_equipo1.length+this.arrayCategoria[e].codigo_equipo[i]['GF'];                      
                        if(fecha.codigo_sancion_equipo1!=undefined && fecha.codigo_sancion_equipo1!=null)
                        {
                          this.arrayCategoria[e].codigo_equipo[i]['SC']=fecha.codigo_sancion_equipo1.pts_sancion; 
                          this.arrayCategoria[e].codigo_equipo[i]['P']=this.arrayCategoria[e].codigo_equipo[i]['P']-fecha.codigo_sancion_equipo1.pts_sancion;
                        }
                      }else if(fecha.id_equipo1._id==this.arrayCategoria[e].codigo_equipo[i]._id && (fecha.goles_equipo1.length==fecha.goles_equipo2.length)){
                        this.arrayCategoria[e].codigo_equipo[i]['PE']=this.arrayCategoria[e].codigo_equipo[i]['PE']+1;
                        this.arrayCategoria[e].codigo_equipo[i]['GC']=fecha.goles_equipo2.length+this.arrayCategoria[e].codigo_equipo[i]['GC']; 
                        this.arrayCategoria[e].codigo_equipo[i]['GF']=fecha.goles_equipo1.length+this.arrayCategoria[e].codigo_equipo[i]['GF'];                       
                        if(fecha.codigo_sancion_equipo1!=undefined && fecha.codigo_sancion_equipo1!=null)
                        {
                          this.arrayCategoria[e].codigo_equipo[i]['SC']=fecha.codigo_sancion_equipo1.pts_sancion; 
                          this.arrayCategoria[e].codigo_equipo[i]['P']=this.arrayCategoria[e].codigo_equipo[i]['P']+1-fecha.codigo_sancion_equipo1.pts_sancion;
                        }else{
                          this.arrayCategoria[e].codigo_equipo[i]['P']=this.arrayCategoria[e].codigo_equipo[i]['P']+1;
                        }
                      }else if(fecha.id_equipo2._id==this.arrayCategoria[e].codigo_equipo[i]._id && (fecha.goles_equipo1.length==fecha.goles_equipo2.length)){
                        this.arrayCategoria[e].codigo_equipo[i]['PE']=this.arrayCategoria[e].codigo_equipo[i]['PE']+1;
                        this.arrayCategoria[e].codigo_equipo[i]['GC']=fecha.goles_equipo1.length+this.arrayCategoria[e].codigo_equipo[i]['GC']; 
                        this.arrayCategoria[e].codigo_equipo[i]['GF']=fecha.goles_equipo2.length+this.arrayCategoria[e].codigo_equipo[i]['GF'];
                        
                        if(fecha.codigo_sancion_equipo2!=undefined && fecha.codigo_sancion_equipo2!=null)
                        {
                          this.arrayCategoria[e].codigo_equipo[i]['SC']=fecha.codigo_sancion_equipo2.pts_sancion; 
                          this.arrayCategoria[e].codigo_equipo[i]['P']=this.arrayCategoria[e].codigo_equipo[i]['P']+1-fecha.codigo_sancion_equipo2.pts_sancion;
                        }else{
                          this.arrayCategoria[e].codigo_equipo[i]['P']=this.arrayCategoria[e].codigo_equipo[i]['P']+1;
                        }                     
                      }                 
                    }
                  }  
                });
                
                this.arrayCategoria[e].codigo_equipo[i].GD=this.arrayCategoria[e].codigo_equipo[i].GF-this.arrayCategoria[e].codigo_equipo[i].GC;
  
              //   console.log("##");
              //   console.log(equipo._id);
                // console.log(_.chain(this.fecha.fechasEncontradas).groupBy('id_equipo1._id').value());
              //  fechasPorEquipo[i]= _.find(this.fecha.fechasEncontradas, function(o:any) { if(o.id_equipo1!=null || o.id_equipo1!=undefined) return o.id_equipo1._id==equipo._id; });
              });
              
              this.arrayCategoria[e].codigo_equipo=_.orderBy(this.arrayCategoria[e].codigo_equipo, ['P','GD'], ['desc','desc']);
              console.log("Fechas por equipo");          
              console.log(fechasPorEquipo);
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
        }             
                          
          
    
  
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
                this.obtenerFechas(i);                                            
                if(i==0)
                {        
                  this.obtenerFechas(0);                                                                                                                      
                } 
                i++;               
              }
            }                         
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
    

}

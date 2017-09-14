import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EquipoService } from '../../services/equipo.service';
import { CategoriaService } from '../../services/categoria.service';
import { GLOBAL } from '../../services/global';
import * as _ from 'lodash';
import { Equipo } from '../../models/equipo.model';
import { Categoria } from '../../models/categoria.model';

import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';



@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  public formulario_equipo = true;
  public url: string;

  public nombre_escudo = "Imagen";
  public srcItem:Array<String>;
  public filesToUpload: Array<File>;
  public identity;
  public token;


  public addAndDelete:Boolean;
  heroes = [];

  public equipos: Equipo[];
  public nuevo_equipo: Equipo;
  public equipo:any;
  public edicion_equipo: Equipo;
  public categorias: Categoria;
  public categoriaActualId:string;
  public categoriaSeleccionada:string;
  public categoriasAct:Categoria;
  public a:any;
  constructor(
    private _userService: UserService,
    private _categoriaService: CategoriaService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _equipoService: EquipoService
  ) {
    this.url = GLOBAL.url;
    this.nuevo_equipo = new Equipo('','','',this.a,this.a,'','','',null,true,this.a);    
    this.edicion_equipo = new Equipo('','','',this.a,this.a,'','','',null,true,this.a);
    this.srcItem=new Array();     
    this._categoriaService.getCategoria()
    .subscribe((res)=>{
      this.categorias=res;            
    });  
    

  }
  guardarEquipoSeleccionado(equi){
    localStorage.setItem('equipoSeleccionado',JSON.stringify(equi));
  }

  ngOnInit() {
    this.obtenerequipos();
  }
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  guardarEquipo(){              
    //Guardar equipo:
      this._equipoService.addEquipo(this.url+'equipo/guardar', this.nuevo_equipo,this.filesToUpload,this.token,'escudo_equipo')
      .then(response=>{ 
        console.log(response); 
        console.log(response);
        this.equipo=response;        
        if(this.categoriaSeleccionada!='' && this.categoriaSeleccionada!=undefined)
          {                                 
             this._categoriaService.putEquipoInToCategoria(this.token,this.categoriaSeleccionada,{codigo_equipo:this.equipo.equipoGuardado._id})
             .subscribe(()=>{
               console.log("Se ha añadido al equipo en una nueva categoría.");               
             });              
          }
        if(response){
          swal(
            '¡Equipo creado!',
            'El equipo ha sido creado con exito.',
            'success'
          )
          this.obtenerequipos();
        }else{
          swal(
            'Oops...',
            '¡Algo salio mal, pruebe despues de un momento!',
            'error'
          )
        }                  
      }).catch((err)=>{
        console.log(err);
        swal(
          'Oops...',
          '¡Algo salio mal, pruebe despues de un momento!',
          'error'
        )
      });                                             
}

  verUpdateEquipo(equipo){        
    let ctx=this;   
    this.edicion_equipo._id=equipo._id;     
    this.edicion_equipo.nombre_equipo=equipo.nombre_equipo;
    this.edicion_equipo.color_principal_equipo=equipo.color_principal_equipo;
    this.edicion_equipo.color_secundario_equipo=equipo.color_secundario_equipo;
    this.edicion_equipo.anio_fundacion_equipo=equipo.anio_fundacion_equipo;
    this.edicion_equipo.logros_equipo=equipo.logros_equipo; 
    this.edicion_equipo.personal_equipo=equipo.personal_equipo;    
    if(this.edicion_equipo.logros_equipo.length==0)
    {    
      this.addAndDelete=true;     
    }else{
      this.addAndDelete=false;     
    }
    _.forEach(this.categorias, function(value) {      
      // var l=_.filter(value.codigo_equipo,equipo._id);
      var l=_.filter(value.codigo_equipo,function(o) { return o==equipo._id; });
      
      console.log(value);
      if(l.length!=0)
        {          
          ctx.categoriaActualId=value._id;          
        }
      });


  }

  updateEquipo(){
    console.log("img");
    console.log(this.edicion_equipo);
    console.log(this.identity);    
    let id=this.edicion_equipo._id;        	
    //Actualizar la Noticia:
    // console.log("this.categoriaActualId=>"+this.categoriaActualId);    
    this._equipoService.updateEquipo(this.url+'equipo/actualizar/'+id, this.edicion_equipo,this.filesToUpload,this.token,'escudo_equipo')
    .then(response=>{ 
      if(response){                
        console.log(response);
        // console.log("AcutalID=>"+this.categoriaActualId+"Seleccionada=>"+this.categoriaSeleccionada);        
        if(this.categoriaActualId!=this.categoriaSeleccionada && this.categoriaSeleccionada!='' && this.categoriaSeleccionada!=undefined)
          {            
            if(this.categoriaActualId!='' && this.categoriaActualId!=undefined){
              this._categoriaService.pullEquipoInToCategoria(this.token,this.categoriaActualId,{codigo_equipo:this.edicion_equipo._id})
              .subscribe(()=>{
                console.log("Se ha quitado el equipo de su categoría actual.");
              }); 
            }             
             this._categoriaService.putEquipoInToCategoria(this.token,this.categoriaSeleccionada,{codigo_equipo:this.edicion_equipo._id})
             .subscribe(()=>{
               console.log("Se ha añadido al equipo en una nueva categoría.");               
             });              
          }
          swal(
            '¡Modificado!',
            'Los cambios se guardaron con exito.',
            'success'
          )
          this.obtenerequipos();
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

  seleccionCategoria(){

  }

  ver_registro_equipo(event) {
    this.formulario_equipo = false;
  }

  cancelar_registro_equipo(event) {
    this.formulario_equipo = true;
    this.nombre_escudo = "Imagen";
  }


  
  imagen(fileInput: any) {
    var files = fileInput.srcElement.files[0].name;
    this.nombre_escudo = files;
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
  

  addLogro() {
    this.addAndDelete=false;            
    this.edicion_equipo.logros_equipo.push({logro:''});
  }
  deleteLogro(i) {    
    console.log("=>"+i);
    this.edicion_equipo.logros_equipo.splice(i,1);
    if(this.edicion_equipo.logros_equipo.length==0)
    {          
      this.addAndDelete=true;     
    }              
  }

  obtenerequipos() {
    this._equipoService.getEquipos().subscribe(
      response => {
        if (!response.equiposEncontrados) {
          console.log(" La categoria no tiene Equipos ");
        } else {
          this.equipos = response.equiposEncontrados;          
          response.equiposEncontrados.forEach((element,i) => { 
            if(element.escudo_equipo!=null && element.escudo_equipo!=undefined && element.escudo_equipo!='')                                                                                          
              {                          
                this.srcItem[i]=this.url+'equipo/imagen/'+element.escudo_equipo;
                }
            else
              {                            
                this.srcItem[i]=this.url+'equipo/imagen/default.png';
                this.equipos[i].escudo_equipo='default.png';}
          });
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

  eliminarEquipo(equipoItem){
    console.log("Eliminando...");
    let ctx=this;
    swal({
      title: '¿Está usted seguro?',
      text: "¡Usted no será capaz de revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar Equipo!'
    }).then(function () {
      ctx._equipoService.deleteEquipo(ctx.token,equipoItem._id)
      .subscribe(res=>{
        if(res){
          console.log(res);
          swal(
            '¡Eliminado!',
            'El equipo ha sido eliminado con exito.',
            'success'
          )
          ctx._categoriaService.getCategoria()
          .subscribe((res)=>{
            ctx.categoriasAct=res;            
            _.forEach(ctx.categoriasAct, function(value) {              
              var l=_.filter(value.codigo_equipo, function(o) { return o==equipoItem._id; });                                  
              if(l.length!=0)
                {                  
                  ctx._categoriaService.pullEquipoInToCategoria(ctx.token,value._id,{codigo_equipo:equipoItem._id})
                  .subscribe(()=>{
                    console.log("Se ha quitado el equipo de su categoría actual.");
                  });
  
                }             
              });
              ctx.obtenerequipos();   
          });                  
        }else{
          swal(
            'Oops...',
            '¡Algo salio mal, pruebe despues de un momento!',
            'error'
          )
          console.log("El equipo no pudo ser eliminada, intente de nuevo");
        }
      });      
    })
  }

}








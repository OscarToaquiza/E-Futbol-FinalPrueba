import { Component, OnInit } from '@angular/core';
import { SancionService } from '../../services/sancion.service';
import { UserService } from './../../services/user.service';
import * as _ from 'lodash';
import { Sancion } from '../../models/sancion.model';
import swal from 'sweetalert2';
//para formularios
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
@Component({
  selector: 'app-sancion',
  templateUrl: './sancion.component.html',
  styleUrls: ['./sancion.component.css']
})
export class SancionComponent implements OnInit {
  public token:any;
  public sancion:Sancion;
  public sanciones:Sancion;
  public idModificar:any;
  public titulo= 'Nueva Sanción';
  public identity;
  public mostrar_formulario_inicial = true;

  //manejo del formulario
  SancionForm:FormGroup;
  //---

  constructor(
    private _userService: UserService, private fb:FormBuilder, private _sancionService: SancionService
  ) {   
      
      this.token = this._userService.getToken();             
      this.identity = this._userService.getIdentity();    
      this.sancion = new Sancion('', '',true,0, '');     
      //
      this.createForm();
      //      
   }
   //---
   createForm() {
    this.SancionForm = this.fb.group({
      nombre_sancion:[this.sancion.nombre_sancion,Validators.required],
      pts_sancion: [this.sancion.pts_sancion,Validators.required],
      observacion_sancion:[this.sancion.observacion_sancion,Validators.required],
    });
  }

  prepareSaveHero():Sancion{
    const formModel=this.SancionForm.value;
    const saveSancion:Sancion={
      _id:this.sancion._id,
      nombre_sancion:this.SancionForm.value.nombre_sancion,
      estado_sancion:this.SancionForm.value.estado_sancion,
      pts_sancion:this.SancionForm.value.pts_sancion,
      observacion_sancion:this.SancionForm.value.observacion_sancion
    }
    return saveSancion
  }

  resetForm():void{
    this.SancionForm.reset({
      nombre_sancion:this.sancion.nombre_sancion,
      pts_sancion: this.sancion.pts_sancion,
      observacion_sancion:this.sancion.observacion_sancion
    });
  }


  //---

  ngOnInit() {
   
    this.getSancion();
    // this.forma.setValue(this.sancion);
    
  }
  getSancion(){
    this._sancionService.getSancion()
    .subscribe((res)=>{
      console.log(res);
      this.sanciones=res;
    },(err)=>{
      console.log("Error");
      console.log(err);
      if(err.status==404)
      {
        swal(
          'No encontrado',
          '¡No existen sanciones creadas.!',                
        );
      }else{
        swal(
          'Oops...',
          '¡Algo salio mal, pruebe despues de un momento!',
          'error'
        )
      }      
    });
  }



  guardarSancion(){   
    this.sancion=this.prepareSaveHero();
     this._sancionService.saveSancion(this.token,this.sancion)
    .subscribe(
      response => {
        console.log(response);        
          swal(
            'Sanción Exitosamente Creada',
            '',
            'success'
            );
            this.sancion = new Sancion('', '',true,0, '');
            //
            this.resetForm();
            //
            this.getSancion();        
      },
      error => {        
        swal(
          'Oops...',
          '¡Algo salio mal, pruebe despues de un momento!',
          'error'
        )   
      }
    );
  }

  DatsoModificarSancion(sancionModificar: Sancion, id:string){
    this.titulo = 'Modificar Sanción';
    this.sancion = sancionModificar;
    this.idModificar = id;

    //pasar datos al formulario
    this.resetForm();
    
  }
  cancelar(){
    this.sancion = new Sancion('', '',true,0, '');
    this.resetForm();
  }

  ModificarSancion(){
    this.sancion=this.prepareSaveHero();
    this._sancionService.updateSancion(this.token, this.idModificar ,this.sancion).subscribe(
      response => {
          console.log(response)
          swal(
            'Sanción Modificada Y Guardada',
            '',
            'success'
            );
            this.sancion = new Sancion('', '',true,0, '');
            this.resetForm();
            this.getSancion(); 
            this.titulo="Nueva Sanción"
            this.idModificar = '';

            $('#collapseExample').collapse('hide');
            
      },
      err => {
        console.log(err);
        if(err.status==404)
        {
          swal(
            'No encontrado',
            '¡No existe la sanción.!',                
          );
        }else{
          swal(
            'Oops...',
            '¡Algo salio mal, pruebe despues de un momento!',
            'error'
          )
        }
      }
    );
  }

}

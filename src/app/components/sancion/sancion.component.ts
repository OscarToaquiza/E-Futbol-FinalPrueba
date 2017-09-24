import { Component, OnInit } from '@angular/core';
import { SancionService } from '../../services/sancion.service';
import { UserService } from './../../services/user.service';
import * as _ from 'lodash';
import { Sancion } from '../../models/sancion.model';
import swal from 'sweetalert2';
//para formularios
import {FormGroup,FormControl,Validators} from '@angular/forms';
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
  forma:FormGroup;
  //

  constructor(
    private _userService: UserService,    
    private _sancionService: SancionService,    
  ) {    
    this.token = this._userService.getToken();             
    this.identity = this._userService.getIdentity();    
    this.sancion = new Sancion('', '',true,0, '');           
   }

  ngOnInit() {
    this.getSancion();

    //--para formulario
    this.forma=new FormGroup({
      '_id':new FormControl(''),
      'nombre_sancion':new FormControl('',Validators.required),
      'estado_sancion':new FormControl(''),
      'pts_sancion': new FormControl('',Validators.required),
      'observacion_sancion':new FormControl('',Validators.required)
    });
    // this.forma.setValue(this.sancion);
    //--
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
    console.log(this.sancion);
    console.log(this.forma.value);
    this._sancionService.saveSancion(this.token,this.forma.value)
    .subscribe(
      response => {
        console.log(response);        
          swal(
            'Sanción Exitosamente Creada',
            '',
            'success'
            );
            this.sancion = new Sancion('', '',true,0, '');
            //reseteo del formulario
            // this.forma.reset({
            //   nombre_sancion:"",
            //   pts_sancion:0,
            //   observacion_sancion:""
            // });
            
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
    // this.forma.setValue(this.sancion);
    
  }
  ModificarSancion(){
    this._sancionService.updateSancion(this.token, this.idModificar ,this.sancion).subscribe(
      response => {
          console.log(response)
          swal(
            'Sanción Modificada Y Guardada',
            '',
            'success'
            );
            this.sancion = new Sancion('', '',true,0, '');
            this.getSancion(); 
            this.titulo="Nueva Sanción"
            this.idModificar = '';
      
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

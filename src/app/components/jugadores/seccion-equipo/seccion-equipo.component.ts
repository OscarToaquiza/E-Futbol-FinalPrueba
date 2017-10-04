import { element } from 'protractor';
import { Component,DoCheck,Output,EventEmitter, OnInit } from '@angular/core';
import{EquipoService} from '../../../services/equipo.service';
import{UserService} from '../../../services/user.service';
import{PersonalService} from '../../../services/personal.service';
import { Equipo } from '../../../models/equipo.model';
import { GLOBAL } from '../../../services/global';
import swal from 'sweetalert2';
@Component({
  selector: 'app-seccion-equipo',
  templateUrl: './seccion-equipo.component.html',
  styleUrls: ['./seccion-equipo.component.css']
})
export class SeccionEquipoComponent implements OnInit,DoCheck {
  @Output() notificacion=new EventEmitter();
  @Output() notificacionEliminacion=new EventEmitter();
  public url;
  public rs:any;
  public rsE:any;
  public equipos:Equipo[];
  public equipo;
  private selectUndefinedOptionValue:any;
  public identity;
  public token;
  @Output() mostrar=new EventEmitter();
  
  constructor(
       private _ES:EquipoService,
       private _PS:PersonalService,
       private _US:UserService
  ) {
    this.url = GLOBAL.url;
    this.identity = this._US.getIdentity();
    this.token = _US.getToken();
    //  this.equipo=new Equipo('','',0,'','','','',null,true,null);
   }

  ngOnInit() {
    //  this.equipo=this._ES.getEquipos();
     console.log(this._ES.getEquipos());
     this.obtenerequipos();
     
  }
  emitirEvento(elementoSeleccionado){
    this.mostrar.emit({
      'mensaje':{
        'elementoSeleccionado':elementoSeleccionado
      }
    });
}
  
  ngDoCheck() {
    // this.identity = this._userService.getIdentity();
    // this.token = this._userService.getToken();
    // console.log(this.equipo);
    console.log(this.equipo);
    this.emitirEvento(this.equipo);

  }

  obtenerequipos() {
    this._ES.getEquipos().subscribe(
      response => {
        if (!response.equiposEncontrados) {
          console.log(" La categoria no tiene Equipos ");
        } else {
          this.equipos = response.equiposEncontrados;
          console.log(this.equipos);
          console.log("una vezzzzzzzzzzzzzzzz");
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

  //GUARDAR PERSONAL EXCEL
  guardarPersonal(equipo){
    console.log(this.identity);
               
      //Guardar excel:
      swal({
        title: '¿Está usted seguro?',
        text: "¡Todos estos registros serán publicados!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Guardar registros!'
      }).then(()=>{
        this._PS.addExcelPersonal(this.url+'personal/saveXLS/'+equipo.personal_equipo.length,this.filesToUpdate,this.token,'xls')
        .then(response=>{ 
          console.log(response);
          if(response){
            swal(
              '¡Registros creados!',
              'Asignando a equipo...',              
            )            
            this.rs=response;
            this.rs.data.insertedIds.forEach((element)=>{  
              console.log(":Dñññ"); 
              console.log(element); 
              console.log("FFFFFFFFF"+equipo._id);          
              console.log();              
              this._ES.addPersonalAEquipo(element,equipo._id)
              .subscribe(response=>{
                console.log("Guardado");
                                
                console.log(response);                
                console.log("respo");
                console.log(response.equipo.personal_equipo);                
                this.notificacion.emit({'mensaje':this.rs.personalI});
              },(er)=>{
                console.log(er);
                
                  swal(
                    'Oops...',
                    '¡Algo salio mal, pruebe despues de un momento!',
                    'error'
                  )                               
              });
            });                        
          }else{
            swal(
              'Oops...',
              '¡Algo salio mal, pruebe despues de un momento!',
              'error'
            )
          }        
  
         }).catch((er)=>{
           console.log(er);

            swal(
              'Oops...',
              'Error:'+JSON.parse(er).mensaje,
              'error'
            )                              
         }); 
      });
           
  }


  //ELIMINAR TODO  PERSONAL 
  eliminarPersonal(equipo){
    console.log(this.identity);
               
      //Guardar excel:
      swal({
        title: '¿Está usted seguro?',
        text: "¡Todo el personal será eliminado!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar registros!'
      }).then(()=>{
        this._ES.deleteAllPersonalEquipo(this.token,equipo._id)
        .subscribe((response)=>{
          console.log("Eliminado:::");
          console.log(response);
          this.rsE=response;
          this._PS.eliminarGroupPersonal(this.token,this.rsE.mensaje.personal_equipo)
          .subscribe(
            ()=>{
              swal(
                '¡Registros eliminados!',
                '',              
              )  
              this.notificacionEliminacion.emit({'mensaje':(this.rsE.mensaje.personal_equipo)+Math.random()});
            },
            (err)=>{
              swal(
                'Oops...',
                '¡Algo salio mal, pruebe despues de un momento!',
                'error'
              )
            }
          );
        });                                         
           
      });
           
  }
  public filesToUpdate : Array<File>;
  subirFilePersonal(fileInput : any){
      //si fueran check se podrian selecciones varios.
      this.filesToUpdate = <Array<File>>fileInput.target.files;
      
  }

}

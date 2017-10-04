import { Component,Input,Output,OnInit,DoCheck,OnChanges,EventEmitter } from '@angular/core';
import{Equipo} from '../../../models/equipo.model';
import {UserService} from '../../../services/user.service';
import { EquipoService } from '../../../services/equipo.service';

@Component({
  selector: 'app-seccion-personal-equipo',
  templateUrl: './seccion-personal-equipo.component.html',
  styleUrls: ['./seccion-personal-equipo.component.css']
})
export class SeccionPersonalEquipoComponent implements OnInit,OnChanges {
  @Output() emitir=new EventEmitter();
  @Input() equip:Equipo;
  
  
  public personal:any[];
  public identity;
  @Input('notificacion')
  set notificacion(value:any) {
    if(value!=undefined && value.length!=0) 
    {
      value.forEach(element => {
        this.equip.personal_equipo.push(element);
      });      
    }             
    this.personal=this.equip.personal_equipo;  

    console.log("Se activo la notificacion");
    console.log(this.personal);
    console.log(value);
  }
  @Input('notificacionEliminacion')
  set notificacionEliminacion(value:any) {
    console.log("Notificacion-->Activa");
    this.equip.personal_equipo.length=0;
    this.personal=this.equip.personal_equipo;             
  } 
  constructor(
    private _userService : UserService,
    private _equipoService: EquipoService
  ) { 
    this.identity = this._userService.getIdentity();
    
    // this.personal=this.equipo.personal_equipo;
  }

  ngOnInit() {
   
  }

  emitirEvento(personal){
    this.emitir.emit({
      'mostrarAgregarPersonal':true,
      'personal':personal
      }
    );
  }
  // ngDoCheck(){
  //   console.log("seccion equipo");
  //   console.log(this.equip);
  //   this.personal=this.equip.personal_equipo;
  //   console.log("este es el personal");
  //   console.log(this.personal);
    
  // }
  ngOnChanges(){
    console.log(this.equip);
    this.personal=this.equip.personal_equipo;
    console.log("estos son los jugadores del equipo");
    console.log(this.personal);
    this.emitir.emit({
      'mostrarAgregarPersonal':false      
    })
  }



  eliminarJugador(idPersonal){
    console.log('IdPersonal' +  idPersonal);
    console.log('IdEquipo' + this.equip._id);
    
  }

}

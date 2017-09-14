import { Component,Input,Output,OnInit,DoCheck,OnChanges,EventEmitter } from '@angular/core';
import{Equipo} from '../../../models/equipo.model';
import {UserService} from '../../../services/user.service';

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

  constructor(
    private _userService : UserService
  ) { 
    this.identity = this._userService.getIdentity();
    
    // this.personal=this.equipo.personal_equipo;
  }

  ngOnInit() {
   
  }

  emitirEvento(){
    this.emitir.emit({
      'mostrarAgregarPersonal':true
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
    this.personal=this.equip.personal_equipo;
    this.emitir.emit({
      'mostrarAgregarPersonal':false      
    })
  }

}

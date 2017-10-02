import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Personal } from '../../../models/personal.model';
import { PersonalService } from '../../../services/personal.service';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { EquipoService } from '../../../services/equipo.service';
import{NgForm} from '@angular/forms';

import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-personal',
  templateUrl: './nuevo-personal.component.html'
})
export class EditarPersonalComponent implements OnInit, OnChanges {
  private selectUndefinedOptionValue2:any;
  
  public personal: Personal;
  public fileSuccess: Boolean;
  public url: string;
  public srcH: any;
  public identity;
  public token;
  public filesToUpload: Array<File>;
  public aux: any;
  public personalCreado: any;
  @Input() IdEquipo: any;

  public rol;

  // public btnGuardarNoticia:boolean=true;
  // public btnUpdateNoticia:boolean=false;

  constructor(private _PS: PersonalService, private _US: UserService, private _ES: EquipoService) {
    this.personal = new Personal('','','', '', this.aux, '', 0, 0, 0, this.aux, '', '', true);
    console.log(this.personal.fecha_nacimiento_personal);

    this.url = GLOBAL.url;
    this.fileSuccess = false;
    this.identity = this._US.getIdentity();
    this.token = _US.getToken();
  }

  ngOnChanges() {
    //  alert("darwin es el mejor");
    console.log("darwin es el mejor y siempre lo sera");
  }

  ngOnInit() {
    // this.srcH=this.url+'personal/get-image-noticia/default.jpg';   

  }

  imagen(fileInput: any) {
    // var files = fileInput.srcElement.files[0].name;
    // this.nombre_documento = files;
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(fileInput);
  }

  


}

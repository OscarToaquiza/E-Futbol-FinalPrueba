import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Personal } from '../../../models/personal.model';
import { PersonalService } from '../../../services/personal.service';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { EquipoService } from '../../../services/equipo.service';

@Component({
  selector: 'app-nuevo-personal',
  templateUrl: './nuevo-personal.component.html',
  styleUrls: ['./nuevo-personal.component.css']
})
export class NuevoPersonalComponent implements OnInit, OnChanges {
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
    this.personal = new Personal('', '', '', this.aux, '', 0, 0, 0, this.aux, '', '', true);
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

  guardarPersonal() {
    console.log("Personal a Guardar");
    console.log(this.personal);
    // console.log("Cedula de ciudadani valida ======> " + this.verificarCedula(this.personal.cedula_personal));
    this._PS.addPersonal(this.url+'personal/guardar',this.personal,this.filesToUpload,this.token,'url_foto_personal')
      .then(response=>{

        if(response){
          alert(JSON.stringify(response));
          this.personalCreado = response;
          // console.log(response.personal);
          // console.log(this.ab.personal._id);
          // alert(this.ab.personal._id);
          // this.personal=response;

           this._ES.addPersonalAEquipo(this.personalCreado.personal._id,this.IdEquipo)
                  .subscribe(response=>{
                    if(response){
                      alert("asignado al equipo"+this.IdEquipo);
                    }else{
                      console.log("error");                      
                    }
                  },error=>{
                    alert("este es el ide del personal"+this.personalCreado.personal._id);

                    alert("este es el ide del equipo "+this.IdEquipo);
                    console.log(error);

                  });
          alert("personal creado");
          // this._ES.addPersonalAEquipo(this.personal,this.personal);
        }else{
          alert("algo salio muy mal :(");
        }
      });
  }


}

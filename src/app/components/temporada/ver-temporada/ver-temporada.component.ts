import { Component, DoCheck, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TemporadaService } from '../../../services/temporada.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Temporada } from '../../../models/temporada.models';

import swal from 'sweetalert2';

@Component({
  selector: 'app-ver-temporada',
  templateUrl: './ver-temporada.component.html',
  styleUrls: ['./ver-temporada.component.css']
})
export class VerTemporadaComponent implements OnInit {

  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  // tslint:disable-next-line:no-input-rename
  @Input('valor') mostrar_formualrio_nuevo: boolean;

  public titulo ="Crear Temporada Nueva";
  public url: string;
  public filesToUpload: Array<File>;
  public identity;
  public token;
  public pdfSubido = false;

  public nombre_documento = "Reglamento";
  public validarTemporadas: boolean;
  public temporadas: Temporada[];
  public temporada_nueva: Temporada;
  public temporada_actual: Temporada;
  public a: any;
  
  // para validar fechas
  public hoy:Date;
  

  //para radio button
  public estado_readio_button = false;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _temporadaService: TemporadaService) {
    this.url = GLOBAL.url;
    this.temporada_nueva = new Temporada('','', this.a, this.a, '', '', this.a);
    this.hoy=new Date();
  }

  ngOnInit() {
    this.obtenerTemporadas();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  cerrar_formulario(event) {
    this.notify.emit(false);
  }

  obtenerTemporadas() {
    // localStorage.removeItem('Temporada_Actual');
    this.temporada_actual = JSON.parse(localStorage.getItem('Temporada_Actual'));
    if(this.temporada_actual == null){
            this.validarTemporadas = false;
    }else{
            this.validarTemporadas = true;
    }
    console.log('Tempordada Actual: '+ this.temporada_actual);

    // this._temporadaService.getTemporadas().subscribe(
    //   response => {
    //     if (!response) {
    //       this.validarTemporadas = false;
    //     } else {
    //       this.validarTemporadas = true;
    //       this.temporadas = response;
    //       console.log(this.temporadas);
    //       this.temporadas.forEach(element => {
    //         if(element.estado_temporada){
    //           this.temporada_actual = element;
    //           console.log(this.temporada_actual);
    //         }
    //       });
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

  imagen(fileInput: any) {
    var files = fileInput.srcElement.files[0].name;
    this.nombre_documento = files;
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(fileInput);
  }

  guardarTemporada() {
    this.temporada_nueva.id_usuario = this.identity._id;
    console.log(this.temporada_nueva);
    this._temporadaService.addTemporada(this.url + 'temporada/guardar',
      this.temporada_nueva, this.filesToUpload, this.token, 'url_reglamento_temporada')
      .then(response => { console.log(response); });
      swal(
        'Temporada Exitosamente Creada',
        '',
        'success'
        );
        this.temporada_nueva = new Temporada('','', this.a, this.a, '', '', this.a);
         //this._router.navigate(['']);
    }

}

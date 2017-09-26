import { Component, DoCheck, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TemporadaService } from '../../../services/temporada.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

import { Temporada } from '../../../models/temporada.models';


import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-temporada',
  templateUrl: './ver-temporada.component.html',
  styleUrls: ['./ver-temporada.component.css']
})
export class EditarTemporadaComponent implements OnInit {

  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  // tslint:disable-next-line:no-input-rename
  @Input('temporadaParaEditar') temporada_nueva: Temporada;
  @Input('valor') mostrar_formualrio_nuevo: boolean;
  @Input('idEditar') idEditar: string;

  public pdfSubido: boolean;
  public pdf: any;

  public titulo = "Editar Temporada";
  public url: string;
  public filesToUpload: Array<File>;
  public identity;
  public token;

  //id de la temporda actual
  public id_temporada_actual: string;
  //radio_button
  public estado_readio_button = true;
  public estadoinicial: boolean;

  public nombre_documento = "Reglamento";
  public validarTemporadas: boolean;
  public a: any;
  public temporadas: Temporada[];
  public temporada_actual: Temporada;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _temporadaService: TemporadaService) {
    this.url = GLOBAL.url;
    this.temporada_nueva;
  }

  ngOnInit() {
    console.log(this.temporada_nueva);
    this.estadoinicial = this.temporada_nueva.estado_temporada;
    this.obtenerTemporadas();
    console.log(this.temporada_nueva.url_reglamento_temporada);
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if (this.temporada_nueva.url_reglamento_temporada != undefined) {
      this.pdfSubido = true;
      this.pdf = this.url + "temporada/get-pdf-temporada/" + this.temporada_nueva.url_reglamento_temporada;
      console.log(this.pdf);
    } else {
      this.pdfSubido = false;
    }
  }
  cerrar_formulario(event) {
    this.notify.emit(false);
  }

  imagen(fileInput: any) {
    var files = fileInput.srcElement.files[0].name;
    this.nombre_documento = files;
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(fileInput);
  }

  obtenerTemporadas() {
    this.temporada_actual = JSON.parse(localStorage.getItem('Temporada_Actual'));
    if (this.temporada_actual == null) {
      this.validarTemporadas = false;
    } else {
      this.validarTemporadas = true;
    }
    console.log(this.temporada_actual);
    // this._temporadaService.getTemporadas().subscribe(
    //   response => {
    //     if (!response) {
    //       this.validarTemporadas = false;
    //     } else {
    //       this.validarTemporadas = true;
    //       response.forEach(element => {
    //         if (element.estado_temporada) {
    //           this.temporada_actual = element;
    //           this.id_temporada_actual = element._id;
    //           //console.log(element._id);
    //           //console.log(this.temporada_actual);
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

  rolSelect(estado) {
    console.log(estado);
    if (estado == 'true') {
      this.temporada_nueva.estado_temporada = true;
    } else {
      this.temporada_nueva.estado_temporada = false;
    }
  }

  updateTemporada() {
    console.log(this.temporada_nueva);
    if (this.temporada_nueva.estado_temporada == true) {
      console.log("actualizar la temporada actual cambiando el estado a false y despues guardar");
      console.log("id de la temporada actual: " + this.temporada_actual._id);
      console.log("id de la temporada nueva: " + this.idEditar);
      //this.temporada_nueva = new Temporada('',this.a,this.a,'','',this.a);
      this.temporada_actual.estado_temporada = false;
      this._temporadaService.editTemporadaSoloEstado(this.token, this.temporada_actual._id, this.temporada_actual)
        .subscribe(
        response => {
          if (!response.temporada) {
            console.log("No se ha actualizado la TEMPORADA anterior ERROR");
          } else {
            localStorage.removeItem('Temporada_Actual');
            console.log(response.temporada);
            console.log("El estado de la temporada actual a cambiado a false +++++++++ ");
            this.ActualizarNormalmente(this.idEditar);
            console.log("La temporada +" + this.idEditar + " el al actual");
            localStorage.setItem('Temporada_Actual', JSON.stringify(this.temporada_nueva));
            //Cambiar el localStotage de la temporada Actual.
            this.obtenerTemporadas();
          }
        },
        error => {
          console.log("Error");
        }
        );
    } else {
      console.log('Actualizar normalmente');
      this.ActualizarNormalmente(this.idEditar);
    }
  }

  setProperty(inChecked: boolean) {
    this.temporada_nueva.estado_temporada = inChecked;
    if (inChecked == true) {
      swal({
        title: '¿Está seguro?',
        text: "Al marcar la temporada como actual, sera la prederminada para los usuarios en general",
        type: 'warning',
        timer: 3500
      });
    }
  }

  ActualizarNormalmente(id) {
    //this.temporada_nueva = new Temporada('',this.a,this.a,'','',this.a);
    this._temporadaService.updatetemporada(this.url + 'temporada/actualizar/' + id,
      this.temporada_nueva, this.filesToUpload, this.token, 'url_reglamento_temporada')
      .then(response => {
        if (response) {
          //this.notificacion.emit("Noticia actualizada");
          console.log(response);
          swal(
            '¡Modificado!',
            'Los cambios se guardaron con exito.',
            'success'
          )
        }
      }
      ).catch((e) => {
        swal(
          'Oops...',
          '¡Algo salio mal,no encontramos la temporada, pruebe despues de un momento!',
          'error'
        )
        // console.log("La noticia no pudo ser actualizada, intente nuevamente.");
      });

  }


}

import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import  swal  from  'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  public verIniciarSesion: boolean = true;

  public user: User;
  public identity;
  public token;

  public status: string;
  public mensajeError:string;


  constructor(private _US: UserService, private _route: ActivatedRoute, private _router: Router) {
    this.user = new User('', '', '', '', '', '', '', '', '');
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.identity = this._US.getIdentity();
  }
  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    // localStorage.clear();
    this.identity = null;
    location.reload();
    // this._router.navigate(['/']);
  }


  onSubmit() {
    this._US.signup(this.user).subscribe(
      response => {
        this.identity = response.user;
        if (!this.identity || !this.identity._id) {
          console.log("el usuario no se a logueado correctamente");
        } else {
          //para que no se vea la contraseña, ya que el identity se guardara en el local estorage
          this.identity.password = '';
          //guardar el identity
          localStorage.setItem('identity', JSON.stringify(this.identity));
          //conseguir el token
          this._US.signup(this.user, 'true').subscribe(
            response => {
              this.token = response.token;
              if (this.token.length <= 0) {
                console.log("el token no se a generado correctamente");
              } else {
                //guardar el token
                localStorage.setItem('token', this.token);
                this.status = 'success';
                this.user = new User('', '', '', '', '', '', '', '', '');
              
                swal({
                  title:'Acceso Confirmado',                  
                  type:'success',
                  showConfirmButton: false,                  
                  timer: 2000
                }
                ).then(()=>{},(d)=>{
                  location.reload();
                });

                // this._router.navigate(['/']);
              }
            },
            error => {
              console.log(<any>error);

            }
          );
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body=JSON.parse(error._body);
          this.status = 'error';
          console.log(body);
          this.mensajeError = body.mensaje;
        }

      }
    );
  }



}

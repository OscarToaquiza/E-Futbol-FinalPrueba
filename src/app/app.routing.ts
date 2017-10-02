
import{NgModule} from '@angular/core';
import{RouterModule, Routes} from '@angular/router';
import{HomeComponent} from './components/home/home.component';
import{EquiposComponent} from './components/equipos/equipos.component';
import{TemporadaComponent} from './components/temporada/temporada.component';
import{CalendarioComponent} from './components/calendario/calendario.component'; //ruta protegida
import {CalendarioGeneralComponent} from './components/calendario-general/calendario-general.component';
import{ReglamentoComponent} from './components/reglamento/reglamento.component';
import{EstadiosComponent} from './components/estadios/estadios.component';
import{CategoriasComponent} from './components/categorias/categorias.component';
import{JugadoresComponent} from './components/jugadores/jugadores.component';
import {DetalleEquipoComponent} from './components/equipos/detalle-equipo/detalle-equipo.component';
import { SancionComponent } from './components/sancion/sancion.component';

import{AuthService} from './services/auth.service';

// import{MainComponent} from './components/main/main.component';
// import{ListComponent} from './components/list/list.component';
// import{AddComponent} from './components/add/add.component';
// import{EditComponent} from './components/edit/edit.component';

// import{AdminGuard} from '../services/admin.guard';

const adminRoutes:Routes=[
  {path:'home',component:HomeComponent},    
  {path:'calendario',component:CalendarioComponent,canActivate:[AuthService]},    
  {path:'reglamento',component:ReglamentoComponent},
  {path:'estadios',component:EstadiosComponent},
  {path:'categorias',component:CategoriasComponent},
  {path:'equipos',component:EquiposComponent},
  {path:'temporada',component:TemporadaComponent},
  {path:'jugadores',component:JugadoresComponent},
  {path:'detalle-equipo',component:DetalleEquipoComponent},
  {path:'calendario-general', component: CalendarioGeneralComponent},
  {path:'sancion',component:SancionComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports:[
    RouterModule.forRoot(adminRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class RoutingModule{}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrateempleadosComponent } from './components/crateempleados/crateempleados.component';
import { ListempleadosComponent } from './components/listempleados/listempleados.component';

const routes: Routes = [
  {path:'',redirectTo:'list-empleados',pathMatch:'full'},
  {path:'list-empleados',component:ListempleadosComponent},
  {path:'crate-empleados',component:CrateempleadosComponent},
  {path:'aditarempleados/:id',component:CrateempleadosComponent},
  {path:'**',redirectTo:'list-empleados',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

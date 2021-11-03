import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-crateempleados',
  templateUrl: './crateempleados.component.html',
  styleUrls: ['./crateempleados.component.css']
})
export class CrateempleadosComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar empleado';

  constructor( private fb:FormBuilder,
               private _empleadoService: EmpleadosService,
               private router: Router,
               private toastr: ToastrService,
               private aRouter: ActivatedRoute) {

    this.createEmpleado = this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      documento:['',Validators.required],
      salario:['',Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarEditarempleado(){
    this.submitted= true;

    if(this.createEmpleado.invalid){
      return;
    }

    if(this.id === null){
      this.agregarempleado();
    }else{
      this.editarEmpleado(this.id);
    }
  }

  agregarempleado(){

    const empleados: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechacreacion: new Date(),
      fechaactualizacion: new Date()
    }
    this.loading = true;
   this._empleadoService.agregarEmpleados(empleados).then(()=>{
     this.toastr.success('se guardo con exito!', 'gurdado exitoso!',{
      positionClass: 'toast-bottom-right'
     });
     this.loading = false;
     this.router.navigate(['/list-empleados']);
   }).catch(error=>{
     console.log(error);
     this.loading = false;
   })
  }

  editarEmpleado(id: string){

    const empleados: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaactualizacion: new Date()
    }

    this.loading = true;

    this._empleadoService.actulizarEmpleado(id,empleados).then(() =>{
      this.loading = true;
      this.toastr.info('El emplenado se actualizo', 'Se axtualizo con Exito',{
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados']);
    })


  }

 esEditar(){
   this.titulo= 'Editar empleado';
   this.loading = true;
   if(this.id !==null){
    this._empleadoService.getEmpleado(this.id).subscribe(data =>{
      this.loading = false;
      console.log(data.payload.data()['nombre']);
      this.createEmpleado.setValue({

        nombre: data.payload.data()['nombre'],
        apellido: data.payload.data()['apellido'],
        documento: data.payload.data()['documento'],
        salario: data.payload.data()['salario'],
      })
    })
   }
 }


}

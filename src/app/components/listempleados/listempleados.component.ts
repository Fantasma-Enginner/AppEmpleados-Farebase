import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-listempleados',
  templateUrl: './listempleados.component.html',
  styleUrls: ['./listempleados.component.css']
})
export class ListempleadosComponent implements OnInit {

  empleados: any[]=[];

  constructor( private _empleadosServices: EmpleadosService,
               private toastr: ToastrService) {

   }

  ngOnInit(): void {
    this.getempleados();
  }

  getempleados(){
    this._empleadosServices.getEmpleados().subscribe(data =>{
      this.empleados = [];
    data.forEach((element:any) => {

      this.empleados.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })

     });
     console.log(this.empleados);

    })
  }

  eliminarEmpleado(id: string){

    this._empleadosServices.eliminarEmpleado(id).then(()=>{

      this.toastr.error('se elimino con exito!', 'eliminado exitoso!',{
        positionClass: 'toast-bottom-right'
       });
    }).catch(error =>{
      console.log(error);
    })
  }



}

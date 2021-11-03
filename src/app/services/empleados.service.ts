import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor( private firestore: AngularFirestore) {

  }

  agregarEmpleados( empleado:any ):Promise<any>{

    return this.firestore.collection('empleado').add(empleado);
  }

  getEmpleados(): Observable <any> {
    return this.firestore.collection('empleado',ref => ref.orderBy('fechacreacion', 'asc')).snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleado').doc(id).delete();
  }

  getEmpleado(id: string):Observable<any>{
    return this.firestore.collection('empleado').doc(id).snapshotChanges();
  }

  actulizarEmpleado(id: string, data:any): Promise<any> {
    return this.firestore.collection('empleado').doc(id).update(data);
  }
}

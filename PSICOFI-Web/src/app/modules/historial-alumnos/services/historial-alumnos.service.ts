import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root'
})

export class HistorialAlumnosService {

  historialTablaVisible = 1;

  constructor() {
    this.historialTablaVisible = 1;
  }
  public verAlumno(clave: number): void {
    this.historialTablaVisible = 0;
    console.log(this.historialTablaVisible);
  }


  public getHistorialVisible()
  {
    return this.historialTablaVisible;
  }
}
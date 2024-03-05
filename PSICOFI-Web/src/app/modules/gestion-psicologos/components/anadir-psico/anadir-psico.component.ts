import { Component } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

@Component({
  selector: 'app-anadir-psico',
  templateUrl: './anadir-psico.component.html',
  styleUrls: ['./anadir-psico.component.css']
})
export class AnadirPsicoComponent {
  visible = false;
  public nuevoPsicologo = {
    "clave": "",
    "nombre": "",
    "apePat": "",
    "apeMat": "",
    "fecha_inicio": "",
    "estatus": "",
    "carrera": "",
    "semestre": "",
    "correo": ""
  };
  constructor(private gestionPsicoService: gestionPsico) { }

  public agregarPsicologo(): void {
    this.gestionPsicoService.agregarPsicologo(this.nuevoPsicologo);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    this.nuevoPsicologo.fecha_inicio = formattedDate;
    this.nuevoPsicologo.estatus = "1";
    this.nuevoPsicologo = {
      "clave": "",
      "nombre": "",
      "apePat": "",
      "apeMat": "",
      "fecha_inicio": "",
      "estatus": "",
      "carrera": "",
      "semestre": "",
      "correo": ""
    };
    this.visible = true;
    //esperamos unos segundos
    setTimeout(() => {
      this.visible = false;
    }, 3000);
  }
  
}

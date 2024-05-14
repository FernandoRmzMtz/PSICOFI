import { Component } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

@Component({
  selector: 'app-anadir-psico',
  templateUrl: './anadir-psico.component.html',
  styleUrls: ['./anadir-psico.component.css']
})
export class AnadirPsicoComponent {
  visible = false;
  public claveNuevo: string = '';
  public nuevoPsicologo = {
    "nombres": "",
    "apellidoPaterno": "",
    "apellidoMaterno": "",
    "activo": 0,
    "idCarrera": "",
    "semestre": "",
    "correo": "",
    "contrasena": "password"
  };
  constructor(private gestionPsicoService: gestionPsico) { }

  public agregarPsicologo(): void {
    let tipo = 0;
    if (this.claveNuevo.length == 6) {
      //Es interno
      tipo = 1;
      let clave = parseInt(this.claveNuevo);
      (this.nuevoPsicologo as any)['claveUnica'] = clave;
    }
    else if (this.claveNuevo.length == 18) {
      //Es externo
      tipo = 2;
      (this.nuevoPsicologo as any)['curp'] = this.claveNuevo;
    }
    else {
      alert("La clave no tiene el formato correcto Curp = 18 caracteres y clave única = 6")
      return;
    }
    this.nuevoPsicologo.activo = 1;
    console.log(this.nuevoPsicologo);
    if (tipo == 1) {
      this.registraPsicologoInterno(this.nuevoPsicologo);
    }
    else if (tipo == 2) {
      this.registraPsicologoExterno(this.nuevoPsicologo);
    }
    this.claveNuevo = '';
    this.nuevoPsicologo = {
      "nombres": "",
      "apellidoPaterno": "",
      "apellidoMaterno": "",
      "activo": 0,
      "idCarrera": "",
      "semestre": "",
      "correo": "",
      "contrasena": "password"
    };

    this.visible = true;
    //esperamos unos segundos
    setTimeout(() => {
      this.visible = false;
    }, 3000);
  }

  public registraPsicologoInterno(psicologo: any): void {
    this.gestionPsicoService.agregarPsicologoInterno(psicologo).subscribe(
      (psicologo) => {
        console.log("Psicologo agregado", psicologo);
      },
      (error) => {
        console.log(error);
        console.log("ERROR!");
      }
    )
  }

  public registraPsicologoExterno(psicologo: any): void {
    this.gestionPsicoService.agregarPsicologoExterno(psicologo).subscribe(
      (psicologo) => {
        console.log("Psicologo agregado", psicologo);
      },
      (error) => {
        console.log(error);
        console.log("ERROR!");
      }
    )
  }

}

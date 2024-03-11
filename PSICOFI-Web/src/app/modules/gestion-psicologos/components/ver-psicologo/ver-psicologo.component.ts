import { Component, OnInit } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

@Component({
  selector: 'app-ver-psicologo',
  templateUrl: './ver-psicologo.component.html',
  styleUrls: ['./ver-psicologo.component.css']
})
export class VerPsicologoComponent implements OnInit{

  public psicologoViendo = {
    "clave": "012345",
    "nombre": "Ava",
    "apePat": "Thomas",
    "apeMat": "White",
    "fecha_inicio": "2020-10-05",
    "estatus": "1",
    "carrera": "Licenciatura en Psicología",
    "semestre": "",
    "correo": ""
  };

  constructor (private psico: gestionPsico)
  {}

  ngOnInit()
  {
    this.psicologoVer();
  }

  public ocultarVer()
  {
    this.psico.verPsicoVisible = false;
  }

  private psicologoVer() {
    this.psicologoViendo = this.psico.psicologoViendo;
  }
}

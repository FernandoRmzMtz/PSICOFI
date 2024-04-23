import { Component, OnInit } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

@Component({
  selector: 'app-ver-psicologo',
  templateUrl: './ver-psicologo.component.html',
  styleUrls: ['./ver-psicologo.component.css']
})
export class VerPsicologoComponent implements OnInit{

  public psicologoViendo = {
    "claveUnica": 172383,
    "nombres": "Elias Osinski",
    "apellidoPaterno": "Reinger",
    "apellidoMaterno": "Mertz",
    "semestre": 6,
    "correo": "flegros@gmail.com",
    "activo": 1,
    "carrera": "Licenciatura en psicologia"
  }

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

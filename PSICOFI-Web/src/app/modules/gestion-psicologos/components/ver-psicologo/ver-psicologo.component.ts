import { Component } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

@Component({
  selector: 'app-ver-psicologo',
  templateUrl: './ver-psicologo.component.html',
  styleUrls: ['./ver-psicologo.component.css']
})
export class VerPsicologoComponent {

  constructor (private psico: gestionPsico)
  {}

  public ocultarVer()
  {
    this.psico.verPsicoVisible = false;
  }
}

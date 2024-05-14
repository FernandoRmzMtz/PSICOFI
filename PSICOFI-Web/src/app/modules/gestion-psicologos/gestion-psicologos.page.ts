import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { gestionPsico } from './services/gestion-psico.services';
@Component({
  selector: 'app-gestion-psicologos',
  templateUrl: './gestion-psicologos.page.html',
  styleUrls: ['./gestion-psicologos.page.css']
})
export class GestionPsicologosPage{
  constructor (private psico: gestionPsico)
  {}

  get verPsicoVisible(): boolean
  {
    return this.psico.verPsicoVisible;
  }

  public ocultarVer()
  {
    this.psico.verPsicoVisible = false;
    
  }
}

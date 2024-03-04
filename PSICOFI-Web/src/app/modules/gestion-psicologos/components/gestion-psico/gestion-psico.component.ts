import { Component, OnInit } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

@Component({
  selector: 'app-gestion-psico',
  templateUrl: './gestion-psico.component.html',
  styleUrls: ['./gestion-psico.component.css']
})
export class GestionPsicoComponent implements OnInit{
  public psicologos: any = [];
  constructor(private psico: gestionPsico) { }

  ngOnInit(): void {
    this.psicologos = this.psico.getPsicologos();
  }
  
}

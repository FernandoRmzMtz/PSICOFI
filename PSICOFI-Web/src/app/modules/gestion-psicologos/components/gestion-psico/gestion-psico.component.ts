import { Component, OnInit } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

@Component({
  selector: 'app-gestion-psico',
  templateUrl: './gestion-psico.component.html',
  styleUrls: ['./gestion-psico.component.css']
})
export class GestionPsicoComponent implements OnInit {
  public psicologos: any = [];
  psicologo = {
    "clave": "",
    "nombre": "",
    "apePat": "",
    "apeMat": "",
    "fecha_inicio": "",
    "estatus": "1"
  };
  constructor(private psico: gestionPsico) { }

  ngOnInit(): void {
    this.psicologos = this.psico.getPsicologos();
  }

  public verPsico(clave: string): void {
    this.psico.psicologoViendo = this.psico.getPsicologoById(clave);
    this.psico.verPsicoVisible = true;
  }
}

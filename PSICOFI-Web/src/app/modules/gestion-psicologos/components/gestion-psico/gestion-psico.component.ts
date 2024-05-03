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
    "activo": 0,
    "apellidoMaterno": "Nikolaus",
    "apellidoPaterno": "Smith",
    "formatted_created_at": "2024-04-15",
    "identificador": "IAAE818652MJJEOY59",
    "nombres": "Mrs. Miracle Kessler"
  };

  constructor(private psico: gestionPsico) { }

  ngOnInit(): void {
    this.psico.getPsicologos().subscribe(
      (data) => {
        this.psicologos = data;
      },
      (error) => {
        console.error('Error al obtener psicólogos:', error);
      }
    );
  }

  public verPsico(clave: string): void {
    this.psico.getPsicologoById(clave).subscribe(
      (psicologo) => {
        this.psico.psicologoViendo = psicologo;
        this.psico.verPsicoVisible = true;
      },
      (error) => {
        console.error('Error al obtener psicólogo:', error);
      }
    );
  }
}

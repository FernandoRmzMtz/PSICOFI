import { Component, Input } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-alumnos-atendidos',
  templateUrl: './tabla-alumnos-atendidos.component.html',
  styleUrls: ['./tabla-alumnos-atendidos.component.css']
})
export class TablaAlumnosAtendidosComponent {
  constructor (private gestionPsico: gestionPsico){
    this.fetchAlumnos();
  }

  @Input() cvePsicologo: number = 0;

  public alumnos: number[] = [];
  fetchAlumnos(): void {
    this.gestionPsico.fetchAlumnosPorPsicologo(this.gestionPsico.psicologoViendo.claveUnica ?? this.gestionPsico.psicologoViendo.curp).subscribe({
      next: (data) => {
        this.alumnos = Array.isArray(data) ? data : [];      },
      error: (error) => {
        console.error('Error fetching alumnos:', error);
      }
    });
  }
}

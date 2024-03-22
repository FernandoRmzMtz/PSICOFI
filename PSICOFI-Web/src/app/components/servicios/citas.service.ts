import { Injectable } from '@angular/core';

export interface Cita {
  idCita: number;
  fechaHora: string;
  claveUnica: number;
  estadoCita: 'Disponible' | 'Agendado';
  clavePsicologo: number;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private citas: Cita[] = [
      { idCita: 1, fechaHora: '2024-03-22T08:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 2, fechaHora: '2024-03-22T09:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 2 },
      { idCita: 3, fechaHora: '2024-03-22T10:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 3 },
      { idCita: 4, fechaHora: '2024-03-22T11:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 5, fechaHora: '2024-03-22T12:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 2 },
      { idCita: 6, fechaHora: '2024-03-22T13:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 3 },
      { idCita: 7, fechaHora: '2024-03-22T14:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 8, fechaHora: '2024-03-22T15:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 2 },
      { idCita: 9, fechaHora: '2024-03-22T16:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 3 },
      { idCita: 10, fechaHora: '2024-03-22T17:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 11, fechaHora: '2024-03-25T08:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 2 },
      { idCita: 12, fechaHora: '2024-03-25T09:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 3 },
      { idCita: 13, fechaHora: '2024-03-25T10:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 14, fechaHora: '2024-03-25T11:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 2 },
      { idCita: 15, fechaHora: '2024-03-25T12:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 3 },
      { idCita: 16, fechaHora: '2024-03-25T11:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 17, fechaHora: '2024-03-25T14:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 2 },
      { idCita: 18, fechaHora: '2024-03-25T15:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 3 },
      { idCita: 19, fechaHora: '2024-03-25T12:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 20, fechaHora: '2024-03-25T13:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 21, fechaHora: '2024-03-25T14:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 22, fechaHora: '2024-03-25T15:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 23, fechaHora: '2024-03-25T16:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 24, fechaHora: '2024-03-26T10:00', claveUnica: 0, estadoCita: 'Disponible', clavePsicologo: 1 },
      { idCita: 25, fechaHora: '2024-03-26T11:00', claveUnica: 0, estadoCita: 'Agendado', clavePsicologo: 1 },
      { idCita: 26, fechaHora: '2024-03-26T12:00', claveUnica: 0, estadoCita: 'Agendado', clavePsicologo: 1 },
      { idCita: 27, fechaHora: '2024-03-27T10:00', claveUnica: 0, estadoCita: 'Agendado', clavePsicologo: 1 },
      { idCita: 28, fechaHora: '2024-03-27T11:00', claveUnica: 0, estadoCita: 'Agendado', clavePsicologo: 1 },
      { idCita: 29, fechaHora: '2024-03-27T12:00', claveUnica: 0, estadoCita: 'Agendado', clavePsicologo: 1 },
      
  ];

  constructor() { }

  obtenerCitas(): Cita[] {
    return this.citas;
  }
}

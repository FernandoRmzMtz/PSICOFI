import { Component, Input, Output, OnInit } from '@angular/core';
import { HistorialAlumnosService } from '../../services/historial-alumnos.service'

@Component({
  selector: 'app-tabla-alumnos',
  templateUrl: './tabla-alumnos.component.html',
  styleUrls: ['./tabla-alumnos.component.css']
})
export class TablaAlumnosComponent implements OnInit {
  public filteredPacientes: number[] = [];
  private _pacientes: number[] = [];

  @Input()
  public pacientes: number[] = [];  

  public inputBuscar: string = '';

  constructor(private histo: HistorialAlumnosService) {
    this.filteredPacientes = [...this.pacientes]; 
  }

  ngOnInit() {
    this.histo.getPacientes().subscribe(data => {
      this._pacientes = Array.isArray(data) ? data : [];
      this.filteredPacientes = [...this._pacientes];
    });
  }

  public verAlumnoAtendido(clave: number): void {
    this.histo.verAlumno(clave);
  }

  public buscarChange(): void {
    const filterValue = this.inputBuscar.toLowerCase();
    this.filteredPacientes = this._pacientes.filter(clave =>
      clave.toString().includes(filterValue)
    );
  }
}

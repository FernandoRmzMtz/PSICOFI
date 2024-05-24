import { Component, Input, OnInit } from '@angular/core';
import { HistorialAlumnosService } from '../../services/historial-alumnos.service';

@Component({
  selector: 'app-tabla-alumnos',
  templateUrl: './tabla-alumnos.component.html',
  styleUrls: ['./tabla-alumnos.component.css']
})
export class TablaAlumnosComponent implements OnInit {
  public filteredPacientes: number[] = [];
  private _pacientes: number[] = [];
  public isLoading = false;
  public inputBuscar: string = '';

  @Input()
  set pacientes(value: number[]) {
    this._pacientes = Array.isArray(value) ? value : [];
    this.filteredPacientes = [...this._pacientes];
  }

  constructor(private histo: HistorialAlumnosService) {}

  ngOnInit() {
    this.isLoading = true;
    this.histo.getPacientes().subscribe(data => {
      this._pacientes = Array.isArray(data) ? data : [];
      this.filteredPacientes = [...this._pacientes];
      this.isLoading = false;
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

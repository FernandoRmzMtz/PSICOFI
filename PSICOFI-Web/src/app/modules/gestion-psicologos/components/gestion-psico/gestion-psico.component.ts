import { Component, OnInit } from '@angular/core';
import { gestionPsico } from '../../services/gestion-psico.services';

@Component({
  selector: 'app-gestion-psico',
  templateUrl: './gestion-psico.component.html',
  styleUrls: ['./gestion-psico.component.css']
})
export class GestionPsicoComponent implements OnInit {
  public psicologos: any = [];
  public psicologosBackup: any = [];
  public inputBuscar = "";
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
        this.psicologosBackup = [...data];
      },
      (error) => {
        console.error('Error al obtener psicólogos:', error);
      }
    );
  }

  public verPsico(clave: string): void {
    this.psico.psicologoViendo = {
      claveUnica: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      semestre: 0,
      correo: '',
      activo: 0,
      carrera: '',
      curp: ''
    };
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

  public editarPsicologo(clave: string): void {
    this.psico.getPsicologoById(clave).subscribe(
      (psicologo) => {
        this.psico.psicologoEditar = psicologo;
      },
      (error) => {
        console.error('Error al obtener psicólogo:', error);
      }
    );
  }

  get psicologoEditar() {
    return this.psico.psicologoEditar;
  }

  public GuardarEditarPsicologo(): void {
    this.psico.editarPsicologo().subscribe(
      (psicologo) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error al editar psicólogo:', error);
      }
    );
  }

  public buscarChange() {
    this.psicologos = this.psicologosBackup.filter((res: any) => {
      if (typeof res.nombres === 'string') {
        return res.nombres.toLocaleLowerCase().includes(this.inputBuscar.toLocaleLowerCase());
      } else {
        return true;
      }
    });
  }

}

import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class gestionPsico {
    public psicologos = [
      {
        "clave": "123456",
        "nombre": "John",
        "apePat": "Doe",
        "apeMat": "Smith",
        "fecha_inicio": "2020-01-01",
        "estatus": "1",
        "carrera": "Licenciatura en Psicología",
        "semestre": "",
        "correo": ""
      },
      {
        "clave": "234567",
        "nombre": "Jane",
        "apePat": "Doe",
        "apeMat": "Johnson",
        "fecha_inicio": "2020-02-15",
        "estatus": "1",
        "carrera": "Licenciatura en Psicología",
        "semestre": "",
        "correo": ""
      },
      {
        "clave": "345678",
        "nombre": "Michael",
        "apePat": "Smith",
        "apeMat": "Brown",
        "fecha_inicio": "2020-03-10",
        "estatus": "0",
        "carrera": "Licenciatura en Psicología",
        "semestre": "",
        "correo": ""
      },
      {
        "clave": "456789",
        "nombre": "Emily",
        "apePat": "Johnson",
        "apeMat": "Davis",
        "fecha_inicio": "2020-04-20",
        "estatus": "1",
        "carrera": "Licenciatura en Psicología",
        "semestre": "",
        "correo": ""
      },
      {
        "clave": "567890",
        "nombre": "Daniel",
        "apePat": "Brown",
        "apeMat": "Wilson",
        "fecha_inicio": "2020-05-05",
        "estatus": "0",
        "carrera": "Licenciatura en Psicología",
        "semestre": "",
        "correo": ""
      },
      {
        "clave": "678901",
        "nombre": "Sophia",
        "apePat": "Davis",
        "apeMat": "Miller",
        "fecha_inicio": "2020-06-30",
        "estatus": "1",
        "carrera": "Licenciatura en Psicología",
        "semestre": "",
        "correo": ""
      },
      {
        "clave": "789012",
        "nombre": "Matthew",
        "apePat": "Wilson",
        "apeMat": "Anderson",
        "fecha_inicio": "2020-07-12",
        "estatus": "1",
        "carrera": "Licenciatura en Psicología",
        "semestre": "",
        "correo": ""
      },
      {
        "clave": "890123",
        "nombre": "Olivia",
        "apePat": "Miller",
        "apeMat": "Thomas",
        "fecha_inicio": "2020-08-25",
        "estatus": "0",
        "carrera": "Licenciatura en Psicología",
        "semestre": "",
        "correo": ""
      },
      {
        "clave": "901234",
        "nombre": "James",
        "apePat": "Anderson",
        "apeMat": "Clark",
        "fecha_inicio": "2020-09-18",
        "estatus": "1",
        "carrera": "Licenciatura en Psicología",
        "semestre": "",
        "correo": ""
      },
      {
        "clave": "012345",
        "nombre": "Ava",
        "apePat": "Thomas",
        "apeMat": "White",
        "fecha_inicio": "2020-10-05",
        "estatus": "1",
        "carrera": "Licenciatura en Psicología",
        "semestre": "",
        "correo": ""
      }
    ];

    public getPsicologos()
    {
        return this.psicologos;
    }

    public getPsicologoById(stringId: string):any
    {
      return this.psicologos.find(psicologo => psicologo.clave === stringId);
    }

    public agregarPsicologo(nuevoPsicologo: any):void
    {
      this.psicologos.push(nuevoPsicologo);
    }
}
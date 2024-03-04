import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class gestionPsico {
    public psicologos = [
        {
          "clave": "123456",
          "nombre": "John Doe",
          "fecha_inicio": "2020-01-01",
          "estatus": "1"
        },
        {
          "clave": "789012",
          "nombre": "Jane Smith",
          "fecha_inicio": "2019-05-15",
          "estatus": "1"
        },
        {
          "clave": "345678",
          "nombre": "Michael Johnson",
          "fecha_inicio": "2021-03-10",
          "estatus": "0"
        },
        {
          "clave": "901234",
          "nombre": "Emily Davis",
          "fecha_inicio": "2018-11-20",
          "estatus": "1"
        },
        {
          "clave": "567890",
          "nombre": "David Wilson",
          "fecha_inicio": "2022-02-28",
          "estatus": "1"
        },
        {
          "clave": "234567",
          "nombre": "Sarah Anderson",
          "fecha_inicio": "2017-09-05",
          "estatus": "0"
        },
        {
          "clave": "890123",
          "nombre": "Jessica Martinez",
          "fecha_inicio": "2016-07-12",
          "estatus": "1"
        },
        {
          "clave": "456789",
          "nombre": "Christopher Taylor",
          "fecha_inicio": "2019-12-25",
          "estatus": "1"
        },
        {
          "clave": "012345",
          "nombre": "Amanda Thomas",
          "fecha_inicio": "2020-08-08",
          "estatus": "0"
        },
        {
          "clave": "678901",
          "nombre": "Daniel Hernandez",
          "fecha_inicio": "2015-03-17",
          "estatus": "1"
        },
        {
          "clave": "345678",
          "nombre": "Olivia Garcia",
          "fecha_inicio": "2021-06-30",
          "estatus": "1"
        },
        {
          "clave": "901234",
          "nombre": "Matthew Brown",
          "fecha_inicio": "2018-02-14",
          "estatus": "0"
        },
        {
          "clave": "567890",
          "nombre": "Sophia Lopez",
          "fecha_inicio": "2017-10-01",
          "estatus": "1"
        },
        {
          "clave": "234567",
          "nombre": "Andrew Clark",
          "fecha_inicio": "2019-11-11",
          "estatus": "1"
        },
        {
          "clave": "890123",
          "nombre": "Isabella Hall",
          "fecha_inicio": "2016-04-22",
          "estatus": "0"
        }
      ];

    public getPsicologos()
    {
        return this.psicologos;
    }
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { LoginService } from "../../login/services/login.services";




@Injectable({
    providedIn: 'root'
})

export class gestionPsico {

  constructor (private http:HttpClient, private loginService: LoginService) {
    this.fetchPsicologos().subscribe((data) => {
      this.fetchedPsico = data;
      console.log(this.fetchedPsico);
    });
  }

  public verPsicoVisible: boolean = false;

  psicologoViendo = {
    "claveUnica": 172383,
    "nombres": "Elias Osinski",
    "apellidoPaterno": "Reinger",
    "apellidoMaterno": "Mertz",
    "semestre": 6,
    "correo": "flegros@gmail.com",
    "activo": 1,
    "carrera": "Licenciatura en psicologia"
  }

  psicologoEditar = {
    "claveUnica": 172383,
    "nombres": "Elias Osinski",
    "apellidoPaterno": "Reinger",
    "apellidoMaterno": "Mertz",
    "semestre": 6,
    "correo": "flegros@gmail.com",
    "activo": 1,
    "carrera": "Licenciatura en psicologia"
  }

    fetchedPsico = [];
  
    fetchPsicologos(): Observable<any> {
      return this.http.get('http://psicofi-api.test/psicologo/getPsicologos').pipe(
        catchError(error => {
          console.error('Error fetching psychologists:', error);
          // Puedes retornar un valor por defecto o lanzar el error para que lo maneje otro componente
          return of([]);
        })
      );
    }

    getPsicologos(): Observable<any> {
      return this.fetchPsicologos();
    }

    getPsicologoById(clave: string): Observable<any> {
      const body = { clave: clave };

      return this.http.post('http://psicofi-api.test/psicologo/searchPsicologo', body,
      { 
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': this.loginService.getToken() ?? "token"
        } 
      }
      );
    }

    agregarPsicologoInterno(psicologoNuevo: any): Observable<any>{  
      console.log(this.loginService.getToken());
      console.log(psicologoNuevo);
      return this.http.post('http://psicofi-api.test/psicologo/registerPsicologo',
      {
        "nombres": psicologoNuevo.nombres,
        "apellidoPaterno": psicologoNuevo.apellidoPaterno,
        "apellidoMaterno": psicologoNuevo.apellidoMaterno,
        "activo": "1",
        "idCarrera": psicologoNuevo.idCarrera,
        "semestre": psicologoNuevo.semestre,
        "correo": psicologoNuevo.correo,
        "contrasena": "contrasena123!",
        "claveUnica": psicologoNuevo.claveUnica
      },
        { 
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.loginService.getToken() ?? "token"
          } 
        }
      );
    }


    editarPsicologo() {
      return this.http.put('http://psicofi-api.test/psicologo/updatePsicologo',
        {
          "clave": this.psicologoEditar.claveUnica,
          "nombres": this.psicologoEditar.nombres,
          "apellidoPaterno": this.psicologoEditar.apellidoPaterno,
          "apellidoMaterno": this.psicologoEditar.apellidoMaterno,
          "activo": this.psicologoEditar.activo,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.loginService.getToken() ?? "token"
          }
        }
      )
    }

}
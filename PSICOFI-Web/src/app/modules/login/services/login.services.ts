import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private tipoUsuarioSubject = new Subject<string>();

  public formVisible = 1; // 1 = interno, 2 = externo
  public token: string = '';
  public claveUnica: string = '';
  public nombre: string = '';
  public rol: string = '';
  public clave: string | null = null;

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ACTIVE = 'active_user';
  private readonly CLAVEUNICA = 'clave_user';
  private readonly TIPOUSUARIO = 'rol';

  private readonly TIMEOUT_LIMIT = 900000; // 15 minutos
  private timeoutHandle: any;

  constructor(private http: HttpClient, private router: Router) {
    this.setupEventsListenerSession();
   }

  public toggleForm() {
    this.formVisible = this.formVisible === 1 ? 2 : 1;
  }

  public getFormVisible() {
    return this.formVisible;
  }
  
  /**
   * Esta función envía una petición al servidor para verificar los datos y a través de los catch maneja los errores.
   * @param clave clave del usuario
   * @param contrasena contraseña del usuario
   * @returns Validacion de login
   */
  loginInterno(clave: string, contrasena: string): Observable<any> {
    return this.http.post('http://psicofi-api.test/login', {
      id: clave,
      password: contrasena
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.error('Error en la petición:', error);
        if (error.status === 500) {
          return "Ha ocurrido un error, por favor intenta más tarde.";
        }
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ACTIVE);
    localStorage.removeItem(this.CLAVEUNICA);
    localStorage.removeItem(this.TIPOUSUARIO);
    this.tipoUsuarioSubject.next('');

    this.router.navigate(['/login']);
    this.clearTimeout();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getClave(): string {
    this.clave = localStorage.getItem(this.CLAVEUNICA);
    if (this.clave != null) {
      return this.clave;
    } else {
      return '';
    }
  }

  getTipoUsuario(): string {
    return localStorage.getItem(this.TIPOUSUARIO) ?? '';
  }
  
  

  setClave(claveUnica: string): void {
    localStorage.setItem(this.CLAVEUNICA, claveUnica);
  }

  setTipoUsuario(tipoUsuario: string): void {
    localStorage.setItem(this.TIPOUSUARIO, tipoUsuario);
    this.tipoUsuarioSubject.next(tipoUsuario);
  }

  setActiveUser(user: string): void {
    localStorage.setItem(this.USER_ACTIVE, user);
  }

  getActiveUser(): string | null {
    return localStorage.getItem(this.USER_ACTIVE);
  }

  isLoggedIn(): boolean {
    return (
      localStorage.getItem(this.TOKEN_KEY) !== null &&
      localStorage.getItem(this.USER_ACTIVE) !== null
    );
  }

  getTipoUsuarioObservable(): Observable<string> {
    return this.tipoUsuarioSubject.asObservable();
  }

  restartTimeout(): void {
    this.clearTimeout();
    this.timeoutHandle = setTimeout(() => {
      this.logout();
    }, this.TIMEOUT_LIMIT);
  }

  /**
   * Esta función inicializa los eventos del mouse y teclado para restablecer el tiempo de espera
   */
  private setupEventsListenerSession() {
    window.addEventListener("mouseup", () => this.resetActivityTimer());
    window.addEventListener("keydown", () => this.resetActivityTimer());
    this.restartTimeout();
  }

  /**
   * Establkece el tiempo de espera después de que un evento ha sido activado, tales como:
   * - Keydown
   * - Mouseup
   */
  private resetActivityTimer() {
    this.restartTimeout();
  }

  /**
   * Limpia el timeout que está activo en caso de existir
   */
  private clearTimeout() {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }
}

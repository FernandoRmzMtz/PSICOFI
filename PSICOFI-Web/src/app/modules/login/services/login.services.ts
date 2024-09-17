import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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

  private TIMEOUT = 600000; // 1 minute

  constructor(private http: HttpClient, private router: Router) { }

  public toggleForm() {
    this.formVisible = this.formVisible === 1 ? 2 : 1;
  }

  public getFormVisible() {
    return this.formVisible;
  }

  loginInterno(clave: string, contrasena: string): Observable<any> {
    return this.http.post('http://psicofi-api.test/login', {
      id: clave,
      password: contrasena
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ACTIVE);
    localStorage.removeItem(this.CLAVEUNICA);
    localStorage.removeItem(this.TIPOUSUARIO);
    this.tipoUsuarioSubject.next('');

    this.router.navigate(['/login']);
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
    console.log("clave unica"+ this.CLAVEUNICA)
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
    this.setupEventsListenerSession();
    setTimeout(() => {
      console.log("El tiempo se acabó, cerrando sesión automáticamente");
      this.logout();
    }, this.TIMEOUT);
  }
  /**
   * Esta función inicializa los eventos del mouse y teclado para restablecer el tiempo de espera
   */
  private setupEventsListenerSession() {
    window.addEventListener("mouseup", () => this.resetActivityTimer());
    window.addEventListener("keydown", () => this.resetActivityTimer());
  }
  /**
   * Esta función restablece el tiempo de espera después de que un aevento ha sido activado
   *  - Keydown
   *  - Mouseup
   */
  private resetActivityTimer() {
    this.TIMEOUT = 60000;
    console.log("Se ha activado un evento" + this.TIMEOUT);
  }
  
}

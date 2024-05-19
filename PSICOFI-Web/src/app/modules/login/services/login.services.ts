import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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

  constructor(private http: HttpClient) { }

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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { environment } from '../../../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserType(): string | undefined {
    throw new Error('Method not implemented.');
  }
  public usuarios$: any;
  public usuarios: any = [];

  constructor(private _http: HttpClient) { }

  async getUsuarios() {
    const usuarios$ = await this._http.get(`${environment.url}/usuarios`).pipe(map(response => response));
    this.usuarios = await lastValueFrom(usuarios$);
  }

  async login() {
   
  }

  async register() {
  
  }

  async logout() {

  }

  async validaLogin() {
  
  }

  
}


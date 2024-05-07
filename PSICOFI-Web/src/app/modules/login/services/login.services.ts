import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class LoginService {
    public formVisible = 1; //1 = interno, 2 = externo
    public token: string = "";
    public claveUnica: string = "";
    public nombre: string = "";

    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_ACTIVE = 'active_user';


    constructor(private http: HttpClient){}

    public toggleForm() {
        this.formVisible = this.formVisible === 1 ? 2 : 1;
    }

    public getFormVisible() {
        return this.formVisible;
    }

    loginInterno(clave: string, contrasena: string): Observable<any>
    {
        console.log("clave: " + clave + " contrasena: " + contrasena);
        return this.http.post('http://localhost:8000/login', 
        {
            id: clave,
            password: contrasena
        });
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_ACTIVE);
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

    setActiveUser(user: string): void {
        localStorage.setItem(this.USER_ACTIVE, user);
    }

    getActiveUser(): string | null {
        return localStorage.getItem(this.USER_ACTIVE);
    }

    isLoggedIn(): boolean {
        return localStorage.getItem(this.TOKEN_KEY)!== null && localStorage.getItem(this.USER_ACTIVE)!== null;
    }

}
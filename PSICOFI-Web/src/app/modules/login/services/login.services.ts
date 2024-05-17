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
    public clave: string | null = null;

    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_ACTIVE = 'active_user';
    private readonly CLAVEUNICA = 'clave_user';


    constructor(private http: HttpClient){}

    public toggleForm() {
        this.formVisible = this.formVisible === 1 ? 2 : 1;
    }

    public getFormVisible() {
        return this.formVisible;
    }

    loginInterno(clave: string, contrasena: string): Observable<any>
    {
        return this.http.post('http://psicofi-api.test/login', 
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
        console.log("TOKEN:");
        console.log(this.TOKEN_KEY);

    } 
    getClave(): string {
        this.clave = localStorage.getItem(this.CLAVEUNICA);
        if(this.clave != null){
            return this.clave;
        }
        else{
            return "";
        }
    }

    setClave(claveUnica: string): void {
        localStorage.setItem(this.CLAVEUNICA, claveUnica);
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
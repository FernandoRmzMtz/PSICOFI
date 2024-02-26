import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class LoginService {
    public formVisible = 1; //1 = interno, 2 = externo


    public toggleForm() {
        this.formVisible = this.formVisible === 1 ? 2 : 1;
    }

    public getFormVisible() {
        return this.formVisible;
    }
}
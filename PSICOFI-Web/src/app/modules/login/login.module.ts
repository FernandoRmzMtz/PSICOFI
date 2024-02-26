import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInternoComponent } from './components/login-interno/login-interno.component';
import { LoginPage } from './login.page';
import { LoginExternoComponent } from './components/login-externo/login-externo.component';



@NgModule({
  declarations: [
    LoginPage,
    LoginInternoComponent,
    LoginExternoComponent,
    LoginExternoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }

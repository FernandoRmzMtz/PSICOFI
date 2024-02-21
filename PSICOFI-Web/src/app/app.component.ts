import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './servicios/auth.service/auth.service.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 constructor(
  private router: Router,
  private _auth_service: AuthService,

  
  ){}

  async ngOnInit() {
    try{
      console.log('app.component');
      await this._auth_service.validaLogin();
      console.log('termine de validar login')

    } catch (error: any) {
      this.router.navigate(['/login']);
    }
  }
  
} 


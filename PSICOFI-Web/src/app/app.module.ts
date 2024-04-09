import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginaInicioModule } from './modules/pagina-inicio/pagina-inicio.module';
import { ReporteCitasPage } from './modules/reporte-citas/reporte-citas.page';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReporteCitasPage,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginaInicioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

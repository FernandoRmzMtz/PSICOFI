import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginaInicioModule } from './modules/pagina-inicio/pagina-inicio.module';
import { ReporteCitasModule } from './modules/reporte-citas/reporte-citas.module';
import { CitaUrgenteModule } from './modules/cita-urgente/cita-urgente.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginaInicioModule,
    ReporteCitasModule,
    CitaUrgenteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

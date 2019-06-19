import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PaginaInicialModule } from './pagina-inicial/pagina-inicial.module';
import { NeuroradInicialComponent } from './pagina-inicial/neurorad-inicial/neurorad-inicial.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PaginaInicialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

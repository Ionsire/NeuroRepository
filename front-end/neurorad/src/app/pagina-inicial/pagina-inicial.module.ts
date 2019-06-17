import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeuroradInicialComponent } from './neurorad-inicial/neurorad-inicial.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NeuroradInicialComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    NeuroradInicialComponent
  ]
})
export class PaginaInicialModule { }

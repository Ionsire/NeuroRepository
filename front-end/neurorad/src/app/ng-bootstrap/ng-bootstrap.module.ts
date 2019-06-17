import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsRadioComponent } from './buttons-radio/buttons-radio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ButtonsRadioComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    ButtonsRadioComponent,
  ]
})
export class NgBootstrapModule { 
    
}

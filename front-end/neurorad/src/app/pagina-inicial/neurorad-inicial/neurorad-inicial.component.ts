import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-neurorad-inicial',
  templateUrl: './neurorad-inicial.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./neurorad-inicial.component.less']
})


export class NeuroradInicialComponent implements OnInit {

  closeResult: string;


  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) {}

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  
  
  ngOnInit() {
  }

}

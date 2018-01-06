import { Component, OnInit } from '@angular/core';
import {MapPolygonService, CoordinatenresultsRoot, Coordinaten } from '../services/lezafbakening.service';

@Component({
  selector: 'app-lez',
  templateUrl: './lez.component.html',
  styleUrls: ['./lez.component.scss']
})
export class LezComponent implements OnInit {

  resultaat : CoordinatenresultsRoot;
  test: number;
  SNAhome : string = "https://www.slimnaarantwerpen.be/nl/lez";
  SNAtoegelaten : string="https://lez.antwerpen.be/?Taal=NL";
  SNAreg: string="https://lez.antwerpen.be/login?Taal=NL";
  SNAdag: string="https://lez.antwerpen.be/?Taal=nl";

  constructor(private _svc: MapPolygonService) { }

  ngOnInit() {
    this._svc.getDataExtra()
      .subscribe(result => this.resultaat = result);
  }
  private click(test): void{
    this.test = test;
    console.log(test);
    if (this.test == 1){
      window.open(this.SNAreg,'_blank')
    }
    if (this.test == 2){
      window.open(this.SNAdag,'_blank')
    }
    
  }
}

import { Component, OnInit } from '@angular/core';
import { Coordinatenresults , MapPolygonService } from '../services/lezafbakening.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  title = 'app';
  // test voor agm
  lat: number = 51.2196598;
  lng: number = 4.4044685;
  
  constructor(private _svc: MapPolygonService) { }

  resultaat : Coordinatenresults;
  ngOnInit() {
    this._svc.getDataExtra()
              .subscribe(result => this.resultaat = result)
  }

}


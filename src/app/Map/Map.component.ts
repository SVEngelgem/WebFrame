import { Component, OnInit } from '@angular/core';
import {MapPolygonService, CoordinatenresultsRoot, Coordinaten } from '../services/lezafbakening.service';
import { LatLng, LatLngLiteral } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // test voor agm
  lat: number = 51.2196598;
  lng: number = 4.4044685;
  paths: Array<LatLng|LatLngLiteral> = [];
  constructor(private _svc: MapPolygonService) { }

  resultaat : CoordinatenresultsRoot;
  pathdata: Coordinaten;



  ngOnInit() {
    this._svc.getDataExtra()
              .subscribe(result => this.resultaat = result)

  }
}


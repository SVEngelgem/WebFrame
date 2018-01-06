import { } from '@types/googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapPolygonService, CoordinatenresultsRoot, Coordinaten} from '../services/lezafbakening.service';
import { LatLng, LatLngLiteral, google } from '@agm/core/services/google-maps-types';
declare var require: any;

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  resultaat : CoordinatenresultsRoot;
  pathdata: Coordinaten;
  paths: Array<LatLng|LatLngLiteral> = [];
  

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _scv: MapPolygonService) { }
  //adaptatie van http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/

  // zoeken of bestemming binnen polygon ligt 
  //dmv contains Location van google maps Api https://developers.google.com/maps/documentation/javascript/examples/poly-containsLocation
  //of point-in-polygon

  ngOnInit() {
    this._scv.getDataExtra()
              .subscribe(result => this.resultaat = result);

    this.zoom = 4;
    this.latitude = 51.2194475;
    this.longitude = 4.40246430000002;
    

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();



    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}


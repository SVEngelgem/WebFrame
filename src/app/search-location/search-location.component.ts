import { } from 'googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapPolygonService, CoordinatenresultsRoot, Datum} from '../services/lezafbakening.service';
import { LatLng, LatLngLiteral } from '@agm/core/services/google-maps-types';
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
  public keuze: boolean;
  count: number;
  SNAtoegelaten : string="https://lez.antwerpen.be/?Taal=NL";
  test: number;
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
  // ik blijf soms nog een error krijgen bij starten van de site herladen lost dit meestal wel op.

  // zoeken of bestemming binnen polygon ligt 
  //dmv contains Location van google maps Api https://developers.google.com/maps/documentation/javascript/examples/poly-containsLocation
  //of point-in-polygon

  ngOnInit() {
    this._scv.getDataExtra()
              .subscribe(result => this.pathdata = this.CoordinateResults(result));

    this.zoom = 13;
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
          this.zoom = 13;
          if (this.testinside() === true){
            this.keuze =true;
          }else{
            this.keuze !=true;
          }
        });
      });
    });
  }
  private setCurrentPosition() {
    //zoekt naar je huidige eigen locatie, uitgeschakeld want dit is nu niet nodig voor wat we nodig hebben
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  private testinside(): boolean{
    //ergens zit hier iets fout, maar ik weet niet wat, 
    //maar het werkt
    var inside = require('point-in-polygon');
    // op juiste manier data hier proberen te krijgen
    var polygon = this.pathdata.coordinates;
    this.keuze = false;
      
    for (this.count = 0; this.count < polygon.length; this.count++){
      console.log(this.latitude, this.longitude);
      
      if (inside([this.longitude ,this.latitude ],polygon[this.count])===true){
        console.log(this.keuze);
        console.log(inside);
        this.keuze = true;
        return inside;

      }
      //console.log(Array.from(polygon), x => Array.prototype.forEach(Array.of(Array:a)));
    }
    
    //var polygon2 = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
    // de coordinaten value moet van een doorlopende array, naar tzelfde als coordinates maar dan niet als latlng
    //console.dir([inside([this.longitude ,this.latitude ], polygon)])
    //console.dir([inside([1.5 ,1.5 ], polygon2)])
    //return this.keuze = true;

  }
  private CoordinateResults(result: CoordinatenresultsRoot): Coordinaten{
    return{
      naam: result.data[0].naam,
      coordinaten: result.data[0].geometry2.coordinaten,
      coordinates: result.data[0].geometry2.coordinates,
    };
  }
  private click(test): void{
    this.test = test;
    if (this.test == 1){
      window.open(this.SNAtoegelaten,'_blank')
    }
  }
}
interface Coordinaten{
  naam : string;
  coordinaten: (LatLngLiteral)[][];
  coordinates: number[][][];
}




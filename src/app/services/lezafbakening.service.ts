import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map"
import { LatLngLiteral } from "@agm/core/services/google-maps-types";

@Injectable()
export class MapPolygonService {
    constructor(private _http: HttpClient){}
        getPolygon(): Observable<CoordinatenresultsRoot>{
            return this._http.get<CoordinatenresultsRoot>("http://datasets.antwerpen.be/v4/gis/lezafbakening.json")
        }
        getDataExtra(): Observable<CoordinatenresultsRoot>{
            return this._http.get<CoordinatenresultsRoot>("http://datasets.antwerpen.be/v4/gis/lezafbakening.json")
            .map(root => {root.data.forEach(data => data.geometry2 = JSON.parse(data.geometry)); return root})
            .map(root => {root.data.forEach(data => data.geometry2.coordinates = )})
            
            
            
        
    }
}

export interface Paging {
    records: number;
    pages: number;
    pageCurrent: number;
    pageNext?: any;
    pagePrev?: any;
    pageSize: number;
}

export interface Datum {
    id: number;
    objectid: number;
    geometry: string;
    geometry2: Coordinaten;
    shape?: any;
    gisid: string;
    naam: string;
    shape_length: string;
    shape_area: string;
    datum: string;
}

export interface CoordinatenresultsRoot {
    paging: Paging;
    data: Datum[];
}

export interface Coordinaten {
    type: string;
    coordinates: number[][][];
}


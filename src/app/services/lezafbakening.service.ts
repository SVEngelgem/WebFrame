import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class MapPolygonService {
    constructor(private _http: HttpClient){}
        getPolygon(): Observable<Coordinatenresults>{
            return this._http.get<Coordinatenresults>("http://datasets.antwerpen.be/v4/gis/lezafbakening.json")
        }
        getDataExtra(): Observable<Coordinatenresults>{
            return this._http.get<Coordinatenresults>("http://datasets.antwerpen.be/v4/gis/lezafbakening.json")
            
        
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
    geometry: any;
    shape?: any;
    gisid: string;
    naam: string;
    shape_length: string;
    shape_area: string;
    datum: string;
}

export interface Coordinatenresults {
    paging: Paging;
    data: Datum[];
}


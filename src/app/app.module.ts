import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MapPolygonService } from './services/lezafbakening.service';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from "@angular/core"

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD5pqvcFtsCvi8Z6hVxeCeKiH6dZIkEqYI'
    }),
    RouterModule.forRoot([
      { path: 'home', component: MapComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'}
    ], {useHash: true}),
    HttpClientModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MapPolygonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

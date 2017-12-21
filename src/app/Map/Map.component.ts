import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core/src/metadata/ng_module';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-Map',
  templateUrl: './Map.component.html',
  styles['agm-map { height: 300px;}']
})
export class MapComponent {
  public map: any = {lat: 51.2296677, lng: 4.4179746 }
}

@NgModule({
    imports:[
        BrowserModule,
        agmCoreModule.forRoot({
            apiKey:''
        })
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
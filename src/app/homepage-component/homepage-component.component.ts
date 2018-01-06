import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-component',
  templateUrl: './homepage-component.component.html',
  styleUrls: ['./homepage-component.component.scss']
})
export class HomepageComponentComponent implements OnInit {

  imageUrl : string = "https://i.imgur.com/tJNUeyB.jpg";
 
  constructor() { }

  ngOnInit() {
  }

}

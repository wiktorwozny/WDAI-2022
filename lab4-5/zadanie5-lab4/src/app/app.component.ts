import { Component } from '@angular/core';
import carsJson from '../assets/cars.json';
import {executeBrowserBuilder} from "@angular-devkit/build-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  cars: any = carsJson;
  displayBrands: boolean = true;
  displayModels: boolean = false;
  displayColors: boolean = false;
  displayCarChoice: boolean = false;

  selectedBrand: string = '';
  selectedModel: string = '';
  selectedColor: string = '';
  carDetails:string = '';
  car: string = '';
  title: string = 'zadanie05';

  constructor() {
  }

  brandSelect() {
    this.displayBrands = false;
    this.displayModels = true;
  }

  modelSelect() {
    this.displayModels = false;
    this.displayColors = true;
    this.carDetails = this.cars[this.selectedBrand][this.selectedModel][1];
  }

  colorSelect(event:any) {
    if (event.target.tagName === "DIV") {
      return;
    }

    this.selectedColor = event.target.id;
    this.car = this.selectedBrand + " " + this.selectedModel + " " + this.selectedColor;
    this.displayColors = false;
    this.displayCarChoice = true;
  }

}

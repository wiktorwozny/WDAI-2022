import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  photos: any[] = []

  ngOnInit() {
    this.dataService.getPhotos().subscribe(res => this.photos = res);
  }

}

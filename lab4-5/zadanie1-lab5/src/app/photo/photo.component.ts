import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  private routeSub: Subscription | undefined;

  id: number = -1;
  photoUrl: string = '';

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.dataService.getPhoto(this.id).subscribe(res => this.photoUrl = res.url);
  }

  ngOnDestroy(): void {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}

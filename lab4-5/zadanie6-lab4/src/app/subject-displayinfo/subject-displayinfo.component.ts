import { Component, Input } from '@angular/core';
import { Subject } from "../model";

@Component({
  selector: 'app-subject-displayinfo',
  templateUrl: './subject-displayinfo.component.html',
  styleUrls: ['./subject-displayinfo.component.css']
})
export class SubjectDisplayinfoComponent {

  @Input()
  selectedSubject: Subject = {
    title: '',
    basicInfo: '',
    advancedInfo: ''
  };

}

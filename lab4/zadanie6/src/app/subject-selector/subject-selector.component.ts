import { Component } from '@angular/core';
import { Subject } from "../model";

@Component({
  selector: 'app-subject-selector',
  templateUrl: './subject-selector.component.html',
  styleUrls: ['./subject-selector.component.css']
})
export class SubjectSelectorComponent {

  subjects: Subject[] = [
    {
      title: "The basics",
      basicInfo: "Core Angular basics you have to know!",
      advancedInfo: "Angular is a TypeScript-based free and open-source web application framework led by the Angular Team at " +
        "Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team " +
        "that built AngularJS."
    },
    {
      title: "Components",
      basicInfo: "Components are a core concept for building Angular apps.",
      advancedInfo: "With components, you can split logic (and markup) into separate building blocks and then combine " +
        "those building blocks (and reuse them) to build powerful user interfaces."
    },
    {
      title: "Events",
      basicInfo: "Events are important in Angular",
      advancedInfo: "Events allow tou to trigger code on demand!"
    }
  ]

  selectedSubject: Subject = {
    title: '',
    basicInfo: '',
    advancedInfo: ''
  };
  selectedTitle: string = '';

  subjectSelect(event:any) {
    this.selectedTitle = event.path[1].childNodes[0].innerText;
    for (let sbj of this.subjects) {
      if (sbj.title === this.selectedTitle) {
        this.selectedSubject = sbj;
        break;
      }
    }
  }

}

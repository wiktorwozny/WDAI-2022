import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { map } from 'rxjs/operators';
import Student from "../student";

@Component({
  selector: 'app-student-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students?: Student[];

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.retrieveStudents();
  }

  retrieveStudents():void {
    // this gets list of students from the database (and saves as an array in this.students)
    this.studentService.getStudentsList().snapshotChanges().pipe(map(changes =>
      changes.map(c =>
        ({key: c.payload.key, ...c.payload.val()}))
      )
    ).subscribe(data => {
        this.students = data;
      }
    );
  }

  // refreshList():void {
  //   this.currentStudent = undefined;
  //   this.currentIndex = -1;
  //   this.retrieveStudents();
  // }

  deleteStudents() {
    // deletes all the students, if it works then it refreshes the list (the .then is not necessary)
    this.studentService.deleteAll();
  }

}

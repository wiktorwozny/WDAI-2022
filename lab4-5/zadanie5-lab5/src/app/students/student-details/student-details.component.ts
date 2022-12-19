import {Component, OnInit, Input, OnChanges} from '@angular/core';
import { StudentService } from '../../services/student.service';
import Student from '../student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, OnChanges {

  @Input() student: Student;

  // currentStudent:Student = {
  //   name: '',
  //   age: 0
  // };

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // this.currentStudent = { ...this.student };
  }

  deleteStudent() {
    if (this.student.key) {
      console.log(this.student.key);
      this.studentService.deleteStudent(this.student.key).then(() => {
        console.log('deleted');
      });
    }
  }

}

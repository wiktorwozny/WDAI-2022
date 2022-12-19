import { Injectable } from '@angular/core';

import Student from '../students/student';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private dbPath = '/students';

  // it is important to operate with AngularFireList, then all the methods work as we wish to
  studentsRef: AngularFireList<Student>;

  constructor(private db: AngularFireDatabase) {
    this.studentsRef = db.list(this.dbPath);
  }

  createStudent(student: Student) {
    return this.studentsRef.push(student);
  }

  updateStudent(key: string, value: any) {
    // unused
  }

  deleteStudent(key: string) {
    return this.studentsRef.remove(key);
  }

  getStudentsList() {
    return this.studentsRef;
  }

  deleteAll() {
    return this.studentsRef.remove();
  }

}

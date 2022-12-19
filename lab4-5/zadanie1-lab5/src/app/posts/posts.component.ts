import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {AbstractControl, Form, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[] = []
  postForm: FormGroup;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      body: ['', [Validators.required, Validators.minLength(2)]],
      userid: ['', [Validators.required, Validators.pattern('[0-9]*')]]
    });
  }

  ngOnInit() {
    this.dataService.getPosts().subscribe(res => this.posts = res);
  }

  onSubmit():void {
    let newPost = {
      "userId": this.postForm.value.userid,
      "id": this.posts.length + 1,
      "title": this.postForm.value.title,
      "body": this.postForm.value.body
    }

    this.dataService.sendPost(JSON.stringify(newPost)).subscribe(res => this.posts.splice(0, 0, newPost));
    this.postForm.reset();
  }



}

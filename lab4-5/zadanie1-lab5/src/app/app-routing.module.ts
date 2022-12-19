import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {PhotosComponent} from "./photos/photos.component";
import {PhotoComponent} from "./photo/photo.component";
import {PostsComponent} from "./posts/posts.component";

const routes: Routes = [
  {path: '' , component: MainComponent},
  {path: 'photos' , component: PhotosComponent},
  {path: 'photos/:id' , component: PhotoComponent},
  {path: 'posts' , component: PostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

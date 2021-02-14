import { Component } from '@angular/core';
import { PostsService } from './core/api/v1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  posts$ = this.postService.getPosts();

  constructor(private postService: PostsService) {}
}

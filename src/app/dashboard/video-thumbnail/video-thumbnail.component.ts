import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/types';

@Component({
  selector: 'app-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.css']
})
export class VideoThumbnailComponent implements OnInit {

  @Input() video: Video | undefined;
  @Input() selected:boolean=false;
  
  constructor() { }

  ngOnInit(): void {
  }

}

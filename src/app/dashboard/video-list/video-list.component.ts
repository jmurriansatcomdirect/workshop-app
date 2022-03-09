import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from 'src/app/types';


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

@Input()  videos : Video[] | undefined;
@Output() selectedVideoChange: EventEmitter<Video> = new EventEmitter<Video>();
@Input() selectedVideo:Video | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  selectVideo(video:Video){
    this.selectedVideo = video;
    this.selectedVideoChange.emit(this.selectedVideo);
  }

}



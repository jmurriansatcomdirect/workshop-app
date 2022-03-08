import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/types';

@Component({
  selector: 'app-video-dashboard',
  templateUrl: './video-dashboard.component.html',
  styleUrls: ['./video-dashboard.component.css']
})
export class VideoDashboardComponent implements OnInit {

  public selectedVideo: Video | undefined;
  public videoList: Video[] | undefined;

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('https://api.angularbootcamp.com/videos')
      .subscribe(videos => (this.videoList = <Video[]>(videos)));
  }

  public selectVideo(video: Video) {
    this.selectedVideo = video;
  }

}



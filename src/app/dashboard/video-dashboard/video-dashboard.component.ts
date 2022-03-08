import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Video } from 'src/app/types';

@Component({
  selector: 'app-video-dashboard',
  templateUrl: './video-dashboard.component.html',
  styleUrls: ['./video-dashboard.component.css']
})
export class VideoDashboardComponent implements OnInit,OnDestroy {

  public selectedVideo: Video | undefined;
  public videoList: Video[] | undefined;
  private subscription:Subscription | undefined;

  constructor(public httpClient: HttpClient) { }
  
  ngOnInit(): void {
    this.subscription = this.httpClient.get('https://api.angularbootcamp.com/videos')
      .subscribe(videos => (this.videoList = <Video[]>(videos)));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public selectVideo(video: Video) {
    this.selectedVideo = video;
  }

}



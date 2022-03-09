import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Video } from 'src/app/types';

@Component({
  selector: 'app-video-dashboard',
  templateUrl: './video-dashboard.component.html',
  styleUrls: ['./video-dashboard.component.css']
})
export class VideoDashboardComponent implements OnInit, OnDestroy {

  public selectedVideo: Video | undefined;
  public videoList: Video[] | undefined;
  loading:boolean=false;
  private unsubscribe:Subject<any> = new Subject<any>();
  
  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loading=true;
    this.httpClient.get<Video[]>('https://api.angularbootcamp.com/videos')
    .pipe(takeUntil(this.unsubscribe))
      .subscribe(videos => {
        this.videoList = videos;
        this.loading=false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

}



import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { last, map, Observable, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { VideoService } from 'src/app/service/video-service';
import { Video } from 'src/app/types';

@Component({
  selector: 'app-video-dashboard',
  templateUrl: './video-dashboard.component.html',
  styleUrls: ['./video-dashboard.component.css']
})
export class VideoDashboardComponent implements OnInit, OnDestroy {

  public selectedVideo: Video | undefined;
  public videoList: Observable<Video[]> | undefined;
  loading: boolean = false;
  private unsubscribe: Subject<any> = new Subject<any>();
  id: string | null = null;

  constructor(public videoService: VideoService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(map(q => q.get('id')),
      switchMap(id => this.videoService.getVideo(id).pipe(tap(v => this.selectedVideo = v)))).subscribe(_=>{});
    this.loading = true;
    this.videoList = this.videoService.filteredVideos.pipe(
      takeUntil(this.unsubscribe),
      tap(_ => this.loading = false)
    );



  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

}



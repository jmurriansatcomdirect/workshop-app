import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { VideoService } from 'src/app/service/video-service';
import { Video } from 'src/app/types';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  video: Video | undefined;
  url: SafeUrl | undefined;

  constructor(public sanitizer: DomSanitizer,public videoService: VideoService,public route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.queryParamMap.pipe(map(q => q.get('id')),
      switchMap(id => this.videoService.getVideo(id).pipe(tap(v => this.video = v)))).subscribe(video=>{
        let id: string  = video.id;
        let untrustedUrl = `https://www.youtube.com/embed/${id}`;
        console.log(untrustedUrl);
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(untrustedUrl);
      });
  }

}

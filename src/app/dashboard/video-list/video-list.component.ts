import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Video } from 'src/app/types';


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

@Input()  videos : Observable<Video[]> | undefined;
id:string | null=null;

  constructor(public router:Router,public activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(map(q=> q.get('id')),
    tap(id=> this.id = id)
    ).subscribe(_=>{});
  }

  selectVideo(video:Video){
    let id: string = this.id = video.id;
    const queryParams = {id};
    this.router.navigate([],{queryParams});
  }

}



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Video } from '../types';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private filter: BehaviorSubject<FilterCriteria> = new BehaviorSubject<FilterCriteria>({});

  public filteredVideos: Observable<Video[]> = combineLatest([this.getVideos(), this.filter]).pipe(map(([videos, filter]) => {
    return videos.filter(video => {
      return ((!filter?.title || video.title.indexOf(filter.title) > -1) && (!filter?.author || video.author.indexOf(filter.author) > -1));
    });
  }));

  constructor(public httpClient: HttpClient) { }

  public getVideos(): Observable<Video[]> {
    return this.httpClient.get<Video[]>('https://api.angularbootcamp.com/videos');
  }

  public setFilter(filter: FilterCriteria) {
    this.filter.next(filter);
  }

}

export class FilterCriteria {
  title?: string;
  author?: string;
}



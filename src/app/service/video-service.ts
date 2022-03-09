import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../types';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(public httpClient: HttpClient) { }

  public getVideos(): Observable<Video[]> {
    return this.httpClient.get<Video[]>('https://api.angularbootcamp.com/videos');
  }

  public setFilter(filter: FilterCriteria) {
      console.log(filter);
  }

}

export class FilterCriteria {
  title?: string;
  author?: string;
}



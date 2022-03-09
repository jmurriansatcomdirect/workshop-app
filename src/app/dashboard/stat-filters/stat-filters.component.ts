import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Observable } from 'rxjs';
import { VideoService } from 'src/app/service/video-service';


@Component({
  selector: 'app-stat-filters',
  templateUrl: './stat-filters.component.html',
  styleUrls: ['./stat-filters.component.css']
})
export class StatFiltersComponent implements OnInit {

  statFilterForm: FormGroup = new FormGroup({});
  constructor(public formBuilder: FormBuilder,public videoService:VideoService) { }

  ngOnInit(): void {
    this.statFilterForm = this.formBuilder.group({
      title: [''],
      author: ['']
    });
    this.statFilterForm.valueChanges.pipe(debounceTime(200)).subscribe(filter=>this.videoService.setFilter(filter));
  }

}

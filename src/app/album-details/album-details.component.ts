import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../search/model/members/result';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
@Input() result: Result;
  constructor() { }

  ngOnInit() {
  }

}

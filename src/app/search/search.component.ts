import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import {SearchService} from './search.service';

declare module namespace {

  export interface Urls {
    last: string;
    next: string;
  }

  export interface Pagination {
    per_page: number;
    pages: number;
    page: number;
    urls: Urls;
    items: number;
  }

  export interface Community {
    want: number;
    have: number;
  }

  export interface Result {
    style: string[];
    thumb: string;
    title: string;
    country: string;
    format: string[];
    uri: string;
    community: Community;
    label: string[];
    catno: string;
    year: string;
    genre: string[];
    resource_url: string;
    type: string;
    id: number;
    barcode: string[];
  }

  export interface RootObject {
    pagination: Pagination;
    results: Result[];
  }

}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  queryCrtl: FormControl;
  filteredQueries: Observable<string[]>;
  results: Observable<string[]>;
  states = ['Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'];
  searchOptions = [
    'Release',
    'Artist',
    'Label'
  ];

  constructor(private searchService: SearchService) {
    this.queryCrtl = new FormControl();
    this.filteredQueries = this.queryCrtl.valueChanges.startWith(null).map(value => this.filterQueries(value));

  }

  ngOnInit() {
    this.results = this.searchService.getReleasesSearchResults('abd');
  }

  filterQueries(value: string) {
    return value ? this.states.filter(query => query.toLowerCase().indexOf(value.toLowerCase()) >= 0)
      : this.states;
  }
}

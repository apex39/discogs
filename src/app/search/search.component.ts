import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';
import {SearchService} from '../search.service';
import {SearchResult} from './model/search-result';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})

export class SearchComponent implements OnInit {

  queryCrtl: FormControl;
  filteredQueries: Observable<string[]>;
  searchResults: SearchResult;
  states = ['Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
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

  private searchTerms = new Subject<string>();
  checkedSearchOption: string;

  constructor(private http: Http, private searchService: SearchService) {
    this.queryCrtl = new FormControl();
    this.filteredQueries = this.queryCrtl.valueChanges
      .startWith(null).map(value => this.filterQueries(value));

  }

  ngOnInit(): void {
    this.queryCrtl.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(value => this.getReleasesSearchResults(value));
  }


  search(term: string): void {
    this.searchTerms.next(term);
  }

  filterQueries(value: string) {
    return value ? this.states.filter(query => query.toLowerCase().indexOf(value.toLowerCase()) >= 0)
      : this.states;
  }

  getReleasesSearchResults(query: string) {
    this.searchService.search(query, this.checkedSearchOption).subscribe(response => {
      this.searchResults = response;
    });
  }
}

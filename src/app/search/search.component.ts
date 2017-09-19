import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { SearchService } from '../search.service';
import { SearchResult } from './model/search-result';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})

export class SearchComponent implements OnInit {
  searchFormGroup: FormGroup;
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

  constructor(
    readonly http: Http,
    readonly searchService: SearchService,
    readonly builder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.searchFormGroup.controls.queryCtrl.setValue("");
    // first searchOption 'checked' by default
    this.checkedSearchOption = this.searchOptions[0];

    this.filteredQueries = this.searchFormGroup.controls.queryCtrl.valueChanges
    .startWith(null).map(value => this.filterQueries(value));

    this.searchFormGroup.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(value => this.getReleasesSearchResults(value.searchOptionCtrl, value.queryCtrl));
  }

  createForm(): void {
    this.searchFormGroup = this.builder.group({
      searchOptionCtrl: [ this.checkedSearchOption, Validators.nullValidator ],
      queryCtrl: [ this.searchTerms, Validators.nullValidator ]
    })
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  filterQueries(value: string) {
    return value ? this.states.filter(query => query.toLowerCase().indexOf(value.toLowerCase()) >= 0)
      : this.states;
  }

  getReleasesSearchResults(option: string, query: string) {
    if (option && query) {
      this.searchService.search(query, option).subscribe(response => {
        this.searchResults = response;
      });
    }
    else {
      this.searchResults = null;
    }
  }
}

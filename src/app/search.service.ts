import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SearchResult} from './search/model/search-result';

@Injectable()
export class SearchService {
  private searchUrl = 'https://api.discogs.com/database/search';
  private customerKey = 'QMTbBEagSNRsVRpcVVwF';
  private customerSecret = 'ATkCpMwOiKOAcKRPLjdZlPrhWEXFstVT';

  constructor(private http: Http) { }

  search(query: string, checkedSearchOption: string): Observable<SearchResult> {
    let urlParameter;

    switch (checkedSearchOption) {
      case 'Release': {
        urlParameter = 'release_title';
        break;
      }
      case 'Artist': {
        urlParameter = 'artist';
        break;
      }
      case 'Label': {
        urlParameter = 'label';
        break;
      }
    }
    const url = `${this.searchUrl}?${urlParameter}=${query}&key=${this.customerKey}&secret=${this.customerSecret}`;
    console.log(url);
    return this.http.get(url).map(response => response.json()); // Http will be deprecated
  }

}

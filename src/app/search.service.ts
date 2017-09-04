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

  search(query: string): Observable<SearchResult> {
    const url = `${this.searchUrl}?release_title=${query}&key=${this.customerKey}&secret=${this.customerSecret}`;
    return this.http.get(url).map(response => response.json()); // Http will be deprecated
  }

}

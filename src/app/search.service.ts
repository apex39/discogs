import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchResult } from './search/model/search-result';
import {SearchOption} from './search/model/search-option';

@Injectable()
export class SearchService {
  public static readonly SEARCH_URL = 'https://api.discogs.com/database/search';
  public static searchOptions: SearchOption[] = [
    {option: 'Release', urlParameter: 'release_title'},
    {option: 'Artist', urlParameter: 'artist'},
    {option: 'Label', urlParameter: 'label'}];
  private readonly customerKey = 'QMTbBEagSNRsVRpcVVwF';
  private readonly customerSecret = 'ATkCpMwOiKOAcKRPLjdZlPrhWEXFstVT';

  constructor(private http: Http) {}

  search(query: string, checkedSearchOption: string): Observable<SearchResult> {
    const searchOptionObj = SearchService.searchOptions.filter(result => result.option === checkedSearchOption);
    if (searchOptionObj) {
      const url = `${SearchService.SEARCH_URL}?${checkedSearchOption['urlParameter']}=
      ${query}&key=${this.customerKey}&secret=${this.customerSecret}`;
      return this.http.get(url).map(response => response.json());
    }
    throw new Error('Given searchOption is not accepted.');
  }
}

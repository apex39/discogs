import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchResult } from './search/model/search-result';

@Injectable()
export class SearchService {
  public static readonly searchOptions: any = {
    RELEASE: new Object({ name: 'Release', urlParameter: 'release_title' }),
    ARTIST: new Object({ option: 'Artist', urlParameter: 'artist' }),
    LABEL: new Object({ option: 'Label', urlParameter: 'label' })
  }
  public static readonly SEARCH_URL = 'https://api.discogs.com/database/search';
  private readonly customerKey = 'QMTbBEagSNRsVRpcVVwF';
  private readonly customerSecret = 'ATkCpMwOiKOAcKRPLjdZlPrhWEXFstVT';

  constructor(private http: Http) {}

  search(query: string, checkedSearchOption: string): Observable<SearchResult> {
    let searchOptionObj = SearchService.searchOptions[checkedSearchOption];
    if(searchOptionObj) {
      const url = `${SearchService.SEARCH_URL}?${checkedSearchOption['urlParameter']}=${query}&key=${this.customerKey}&secret=${this.customerSecret}`;
      return this.http.get(url).map(response => response.json());
    } else throw new Error("Given searchOption is not accepted.")
  }

}

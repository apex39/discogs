import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SearchResult} from './search/model/search-result';
import {SearchOption} from './search/model/search-option';
import {Result} from './search/model/members/result';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class NetworkService {
  public static readonly SEARCH_URL = 'https://api.discogs.com/database/search';
  public static readonly USER_DB_URL = 'http://145.239.87.171:8080/api';
  public static searchOptions: SearchOption[] = [
    {option: 'Release', urlParameter: 'release_title'},
    {option: 'Artist', urlParameter: 'artist'},
    {option: 'Label', urlParameter: 'label'}];
  private readonly customerKey = 'QMTbBEagSNRsVRpcVVwF';
  private readonly customerSecret = 'ATkCpMwOiKOAcKRPLjdZlPrhWEXFstVT';

  constructor(private http: HttpClient) {
  }

  search(query: string, checkedSearchOption: string): Observable<SearchResult> {
    const searchOptionObj: SearchOption = NetworkService.searchOptions.filter(result => result.option === checkedSearchOption)[0];
    if (searchOptionObj) {
      const url = `${NetworkService.SEARCH_URL}?${searchOptionObj['urlParameter']}=${query}&key=${this.customerKey}&secret=${this.customerSecret}`;
      return this.http.get(url);
    }
    throw new Error('Given searchOption is not accepted.');
  }

  addAlbum(album: Result): Observable<Result> {
    const body = JSON.stringify(album);
    const url = `${NetworkService.USER_DB_URL}/discs`;
    return this.http
      .post(url, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      });
  }
}

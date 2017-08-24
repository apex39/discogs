import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchService {
  private searchUrl = 'https://api.discogs.com/database/search';
  private customerKey = 'QMTbBEagSNRsVRpcVVwF';
  private customerSecret = 'ATkCpMwOiKOAcKRPLjdZlPrhWEXFstVT';
  results: Observable<string[]>;
  constructor(private http: HttpClient) { }

  getReleasesSearchResults(query): Observable<string[]> {
    const url = `${this.searchUrl}?release_title=${query}&key=${this.customerKey}&secret=${this.customerSecret}`;
      this.http.get
      (url)
        .subscribe(data => {
          this.results = data['results'];
        });
      return this.results;
  }
}

import { ReflectiveInjector } from '@angular/core'
import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      SearchService,
    ]);
    this.searchService = this.injector.get(SearchService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('search() should query current service url', () => {
    // GIVEN
    let searchOption = 'option';
    let query = 'query'
    let expectedUrl = 'api.discogs.com/database/search'
    // WHEN
    this.searchService.search(query, searchOption);
    // THEN
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(expectedUrl, 'url invalid');
  });
});

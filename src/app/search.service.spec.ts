import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ReflectiveInjector } from '@angular/core'
import { Response, ResponseOptions } from '@angular/http';
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

    this.searchOption = 'option';
    this.query = 'query'
  });

  it('search() should query current service url', () => {
    // GIVEN
    let expectedUrl = 'api.discogs.com/database/search'
    // WHEN
    this.searchService.search(this.query, this.searchOption);
    // THEN
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(expectedUrl, 'url invalid');
  });

  it('search() should return two empty objects as results', () => {
    // GIVEN
    jasmine.clock().install();
    let actualResults: Object[];
    let expectedResults: Object[] = [ {}, {} ];

    // WHEN
    this.searchService.search(this.query, this.searchOption).subscribe(response => {
      actualResults = response.data;
    });
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({data: expectedResults}),
    })));
    jasmine.clock().tick(1);
    // THEN
    expect(actualResults).toEqual(expectedResults, 'result should be the 2-element array of SearchResult\'s');
    expect(actualResults.length).toEqual(2);
    // AFTER
    jasmine.clock().uninstall()
  });
});

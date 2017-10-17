import { TestBed, inject } from '@angular/core/testing';
import {
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {Result} from './search/model/members/result';
import {NetworkService} from './network.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpHeaders} from '@angular/common/http';

describe('NetworkService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NetworkService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('addAlbum()', () => {

    it('should return the same JSON as a sent one',
      inject([NetworkService, XHRBackend], (networkService, mockBackend) => {

        const mockRequest: Result = JSON.parse('{"style":[],"thumb":"https://img.discogs5.com/vXWZaCU3XRu3zhpUVp9QrzGn1nE=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-7860649-1450362910-7756.jpeg.jpg","format":["Vinyl","7","45 RPM","Single"],"country":"UK","barcode":[],"uri":"/Christie-Alabama/release/7860649","community":{"want":1,"have":2},"label":["Epic"],"catno":"EPC 2044","year":"1974","genre":["Pop"],"title":"Christie - Alabama","resource_url":"https://api.discogs.com/releases/7860649","type":"release","id":7860649}');

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: mockRequest
          })));
        });

        networkService.addAlbum(mockRequest).subscribe((album) => {
          expect(album).toBe(mockRequest);
        });

      }));
  });
});

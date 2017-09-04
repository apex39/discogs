import {Community} from './members/community';
import {Pagination} from './members/pagination';
import {Result} from './members/result';
import {RootObject} from './members/root-object';
import {Urls} from './members/urls';

export class SearchResult {
  community: Community;
  pagination: Pagination;
  results: Result[];
  rootObject: RootObject;
  urls: Urls;
}

import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { VideoPreloadResolver } from './video-preload-resolver'; 
import { VideoService } from './video';
import { Video } from './video-page/video-page';

describe('VideoPreloadResolver', () => {
  const executeResolver: ResolveFn<Video[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      new VideoPreloadResolver(TestBed.inject(VideoService)).resolve()
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VideoPreloadResolver,
        VideoService
      ]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
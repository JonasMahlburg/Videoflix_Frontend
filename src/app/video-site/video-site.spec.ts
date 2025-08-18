import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSite } from './video-site';

describe('VideoSite', () => {
  let component: VideoSite;
  let fixture: ComponentFixture<VideoSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoSite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

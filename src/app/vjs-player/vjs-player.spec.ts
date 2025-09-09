import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VjsPlayer } from './vjs-player';

describe('VjsPlayer', () => {
  let component: VjsPlayer;
  let fixture: ComponentFixture<VjsPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VjsPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VjsPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

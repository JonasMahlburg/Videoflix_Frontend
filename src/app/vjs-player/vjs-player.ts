import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-vjs-player',
  standalone: true,
  imports: [],
  templateUrl: './vjs-player.html',
  styleUrls: ['./vjs-player.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VjsPlayer implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;
  @Input() options!: {
    fluid?: boolean;
    aspectRatio?: string;
    autoplay?: boolean;
    controls?: boolean;
    sources: { src: string; type: string }[];
  };
  player: ReturnType<typeof videojs> | null = null;

  ngOnInit() {
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      // @ts-ignore
      console.log('onPlayerReady', this);
    });
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }
}

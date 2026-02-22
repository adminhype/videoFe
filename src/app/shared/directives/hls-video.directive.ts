import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, inject } from '@angular/core';
import Hls from 'hls.js';

@Directive({
  selector: '[appHlsVideo]',
  standalone: true
})
export class HlsVideoDirective implements OnChanges, OnDestroy {
  @Input() appHlsVideo: string = '';

  private hls: Hls | null = null;
  private el = inject(ElementRef<HTMLVideoElement>);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHlsVideo'] && this.appHlsVideo) {
      this.loadVideo(this.appHlsVideo);
    }
  }

  ngOnDestroy(): void {
    if (this.hls) this.hls.destroy();
  }

  private loadVideo(src: string): void {
    const video = this.el.nativeElement;
    video.muted = true;

    if (Hls.isSupported()) {
      this.setupHls(src, video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      this.safePlay(video);
    }
  }

  private setupHls(src: string, video: HTMLVideoElement): void {
    if (this.hls) this.hls.destroy();
    
    this.hls = new Hls({ xhrSetup: (xhr) => { xhr.withCredentials = true; } });
    this.hls.loadSource(src);
    this.hls.attachMedia(video);
    
    this.hls.on(Hls.Events.MANIFEST_PARSED, () => this.safePlay(video));
  }

  private safePlay(video: HTMLVideoElement): void {
    video.play().catch(err => console.warn('Autoplay prevented:', err));
  }
}
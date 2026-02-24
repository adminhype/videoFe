import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, inject } from '@angular/core';
import Hls from 'hls.js';

/**
 * Custom directive to play HLS (HTTP Live Streaming) video streams.
 * Uses hls.js under the hood and provides a native fallback for Apple devices.
 * 
 * @example
 * <video [appHlsVideo]="'https://example.com/stream.m3u8'"></video>
 */
@Directive({
  selector: '[appHlsVideo]',
  standalone: true
})
export class HlsVideoDirective implements OnChanges, OnDestroy {
  /** 
   * The source URL of the HLS video stream (usually a .m3u8 file). 
   */
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

  /**
   * Initializes video playback.
   * Checks if the browser supports hls.js or if it has native HLS support (like Safari).
   * 
   * @param src The video URL to load.
   */
  private loadVideo(src: string): void {
    const video = this.el.nativeElement;
    
    // Muting is often required for browsers to allow autoplay
    video.muted = true;

    if (Hls.isSupported()) {
      this.setupHls(src, video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      this.safePlay(video);
    }
  }

  /**
   * Configures the hls.js instance and attaches it to the HTML video element.
   * 
   * @param src The video URL to load.
   * @param video The HTML video element reference.
   */
  private setupHls(src: string, video: HTMLVideoElement): void {
    if (this.hls) this.hls.destroy();
    
    // withCredentials ensures cookies/tokens are sent with the video requests
    this.hls = new Hls({ xhrSetup: (xhr) => { xhr.withCredentials = true; } });
    this.hls.loadSource(src);
    this.hls.attachMedia(video);
    
    this.hls.on(Hls.Events.MANIFEST_PARSED, () => this.safePlay(video));
  }

  /**
   * Safely attempts to play the video.
   * Catches and logs errors if the browser blocks autoplay.
   * 
   * @param video The HTML video element reference.
   */
  private safePlay(video: HTMLVideoElement): void {
    video.play().catch(err => console.warn('Autoplay prevented:', err));
  }
}
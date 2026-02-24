import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../shared/interfaces/video.interface';
import { VideoService } from '../../shared/services/video.service';
import { ToastService } from '../../shared/services/toast.service';
import Hls from 'hls.js';

/**
 * Custom video player utilizing hls.js for adaptive streaming.
 * Features manual resolution switching, cross-browser fullscreen support, 
 * and custom auto-hiding media controls.
 */
@Component({
  selector: 'app-video-player',
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  
  /** Reference to the native HTML video element. */
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;
  
  /** Reference to the outer container. Required to make the custom controls visible in fullscreen mode. */
  @ViewChild('playerContainer') container!: ElementRef<HTMLDivElement>;
  
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private videoService = inject(VideoService);
  private toastService = inject(ToastService);

  currentVideo: Video | undefined;
  
  /** The underlying hls.js instance handling the video stream. */
  hls: Hls | null = null;
  
  isPlaying = false;
  controlsVisible = true;
  currentTime = 0;
  duration = 0;

  volume = 1;
  isMuted = false;
  
  /** The currently active resolution path (e.g., '480p', '720p'). Defaults to lowest quality. */
  currentRes = '480p';
  showResMenu = false;
  isFullscreen = false;

  /** Timer reference used to auto-hide the player controls after inactivity. */
  private controlsTimeout: number | undefined;

  /** Extracts the video ID from the URL and fetches the video metadata. */
  ngOnInit(): void {
    this.route.params.subscribe(params => this.loadVideoContent(Number(params['id'])));
  }

  /** Initializes the player only after the @ViewChild references are fully rendered in the DOM. */
  ngAfterViewInit(): void {
    if (this.currentVideo) this.initPlayer();
  }

  /** Cleans up the HLS instance and active timers to prevent memory leaks when navigating away. */
  ngOnDestroy(): void {
    if (this.hls) this.hls.destroy();
    clearTimeout(this.controlsTimeout);
  }

  loadVideoContent(id: number) {
    this.videoService.getVideoById(id).subscribe({
      next: (video) => {
        this.currentVideo = video;
        if (this.currentVideo && this.videoElement) this.initPlayer();
      },
      error: () => this.closePlayer()
    });
  }

  /**
   * Evaluates browser support and initializes the stream.
   * Uses hls.js for most modern browsers, or a native fallback for Apple devices (Safari/iOS).
   */
  initPlayer() {
    if (Hls.isSupported() && this.currentVideo) {
      this.setupHls(this.currentVideo.videoUrl + this.currentRes + '/index.m3u8');
    } else if (this.videoElement.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback for native HLS support (mostly Safari)
      this.videoElement.nativeElement.src = this.currentVideo!.videoUrl + '480p/index.m3u8';
    }
  }

  /**
   * Configures the hls.js instance.
   * Ensures that credentials (like session cookies) are sent to the backend for protected streams.
   * 
   * @param url The exact .m3u8 playlist URL to load.
   */
  setupHls(url: string) {
    if (this.hls) this.hls.destroy();
    this.hls = new Hls({
      xhrSetup: (xhr, url) => { xhr.withCredentials = true; }
    });
    this.hls.loadSource(url);
    this.hls.attachMedia(this.videoElement.nativeElement);
    this.hls.on(Hls.Events.MANIFEST_PARSED, () => this.playVideo());
  }

  /**
   * Switches the video resolution on the fly.
   * Saves the current playback time and state, re-initializes the stream with the new quality, 
   * and resumes playback seamlessly from the exact same timestamp.
   * 
   * @param res The target resolution folder (e.g., '720p').
   */
  changeResolution(res: string) {
    this.currentRes = res;
    this.showResMenu = false;
    
    // Save current state before destroying the stream
    const time = this.videoElement.nativeElement.currentTime;
    const wasPlaying = !this.videoElement.nativeElement.paused;

    if (this.currentVideo) {
      this.setupHls(this.currentVideo.videoUrl + res + '/index.m3u8');
      
      // Restore previous state
      this.videoElement.nativeElement.currentTime = time;
      if(wasPlaying) this.playVideo();
      
      this.toastService.show(`Quality changed to ${res}`, 'success');
    }
  }

  playVideo() {
    this.videoElement.nativeElement.play()
      .then(() => {
        this.isPlaying = true;
        this.showControls();
      })
      .catch(err => console.warn("Autoplay prevented", err));
  }

  togglePlay() {
    const video = this.videoElement.nativeElement;
    video.paused ? this.playVideo() : video.pause();
    this.isPlaying = !video.paused;
    this.showControls();
  }

  toggleMute() {
    const video = this.videoElement.nativeElement;
    video.muted = !video.muted;
    this.isMuted = video.muted;
    
    // Remember volume state so we can restore it when unmuting
    if (this.isMuted) this.volume = 0;
    else this.volume = video.volume > 0 ? video.volume : 0.5;
  }

  onVolumeChange(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.videoElement.nativeElement.volume = val;
    this.volume = val;
    this.isMuted = val === 0;
    this.videoElement.nativeElement.muted = this.isMuted;
  }

  /**
   * Toggles fullscreen mode for the entire player container.
   * Includes extensive vendor prefixes (`webkit`) to ensure compatibility with older browsers and iOS devices.
   */
  toggleFullscreen() {
    const container = this.container.nativeElement as any;
    const video = this.videoElement.nativeElement as any;

    if (!document.fullscreenElement && !document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      // Enter fullscreen
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
      this.isFullscreen = true;
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
      this.isFullscreen = false;
    }
  }

  /**
   * Makes the custom UI controls visible.
   * If the video is currently playing, it starts a 2-second countdown to auto-hide them again.
   */
  showControls() {
    this.controlsVisible = true;
    clearTimeout(this.controlsTimeout);
    
    this.controlsTimeout = window.setTimeout(() => {
      if (this.isPlaying) this.controlsVisible = false;
    }, 2000);
  }

  closePlayer() {
    this.router.navigate(['/browse']);
  }
  
  onTimeUpdate() {
    this.currentTime = this.videoElement.nativeElement.currentTime;
  }

  onMetadataLoaded() {
    this.duration = this.videoElement.nativeElement.duration;
  }

  onVideoEnded() {
    this.isPlaying = false;
    this.showControls();
  }
  
  onSeek(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.videoElement.nativeElement.currentTime = val;
  }
  
  skip(val: number) {
      this.videoElement.nativeElement.currentTime += val;
      this.showControls();
  }

  toggleResMenu() {
    this.showResMenu = !this.showResMenu;
  }

  /** Formats raw seconds into a readable `MM:SS` string format. */
  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  getProgressPercentage() {
    return (this.currentTime / this.duration) * 100 || 0;
  }
}
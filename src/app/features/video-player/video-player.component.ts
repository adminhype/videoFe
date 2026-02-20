import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from '../../shared/interfaces/video.interface';
import { VideoService } from '../../shared/services/video.service';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-player',
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('playerContainer') container!: ElementRef<HTMLDivElement>;
  
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private videoService = inject(VideoService);

  currentVideo: Video | undefined;
  hls: Hls | null = null;
  
  isPlaying = false;
  controlsVisible = true;
  currentTime = 0;
  duration = 0;

  // volume & settings 
  volume = 1;
  isMuted = false;
  currentRes = '480p';
  showResMenu = false;
  isFullscreen = false;

  private controlsTimeout: number | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(params => this.loadVideoContent(Number(params['id'])));
  }

  ngAfterViewInit(): void {
    if (this.currentVideo) this.initPlayer();
  }

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

  initPlayer() {
    if (Hls.isSupported() && this.currentVideo) {
      this.setupHls(this.currentVideo.videoUrl + this.currentRes + '/index.m3u8');
    } else if (this.videoElement.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.videoElement.nativeElement.src = this.currentVideo!.videoUrl + '480p/index.m3u8';
    }
  }

  setupHls(url: string) {
    if (this.hls) this.hls.destroy();
    this.hls = new Hls({
      xhrSetup: (xhr, url) => { xhr.withCredentials = true; }
    });
    this.hls.loadSource(url);
    this.hls.attachMedia(this.videoElement.nativeElement);
    this.hls.on(Hls.Events.MANIFEST_PARSED, () => this.playVideo());
  }

  changeResolution(res: string) {
    this.currentRes = res;
    this.showResMenu = false;
    const time = this.videoElement.nativeElement.currentTime;
    const wasPlaying = !this.videoElement.nativeElement.paused;

    if (this.currentVideo) {
      this.setupHls(this.currentVideo.videoUrl + res + '/index.m3u8');
      this.videoElement.nativeElement.currentTime = time;
      if(wasPlaying) this.playVideo();
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

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.nativeElement.requestFullscreen();
      this.isFullscreen = true;
    } else {
      document.exitFullscreen();
      this.isFullscreen = false;
    }
  }


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

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  getProgressPercentage() {
    return (this.currentTime / this.duration) * 100 || 0;
  }
}
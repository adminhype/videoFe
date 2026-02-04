import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;
// TODO: typ
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  controlsVisible = true;
  controlsTimeout: any;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const video = this.videoElement.nativeElement;
    
    video.play().then(() => {
      this.isPlaying = true;
      this.showControls();
    }).catch(error => {
      console.warn('Autoplay prevented:', error);
      this.isPlaying = false;
      this.controlsVisible = true;
    });
  }

  ngOnDestroy(): void {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }
  }

  showControls() {
    this.controlsVisible = true;
    
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }

    this.controlsTimeout = setTimeout(() => {
      if (this.isPlaying) {
        this.controlsVisible = false;
      }
    }, 777);
  }

  togglePlay() {
    const video = this.videoElement.nativeElement;
    
    if (video.paused) {
      video.play();
      this.isPlaying = true;
      this.showControls();
    } else {
      video.pause();
      this.isPlaying = false;
      this.controlsVisible = true;
    }
  }

  skip(seconds: number) {
    const video = this.videoElement.nativeElement;
    video.currentTime += seconds;
    this.showControls();
  }

  onTimeUpdate() {
    const video = this.videoElement.nativeElement;
    this.currentTime = video.currentTime;
  }

  onMetadataLoaded() {
    const video = this.videoElement.nativeElement;
    this.duration = video.duration;
  }

  onVideoEnded() {
    this.isPlaying = false;
    this.controlsVisible = true;
  }

  onSeek(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    const video = this.videoElement.nativeElement;
    
    video.currentTime = value;
    this.currentTime = value;
  }

  getProgressPercentage(): number {
    if (this.duration === 0) return 0;
    return (this.currentTime / this.duration) * 100;
  }

  formatTime(time: number): string {
    if (!time) return '0:00';
    
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time / 60) % 60);
    const hours = Math.floor(time / 3600);

    const s = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const m = minutes < 10 ? `0${minutes}` : `${minutes}`;

    if (hours > 0) {
      return `${hours}:${m}:${s}`;
    }
    return `${minutes}:${s}`;
  }

  closePlayer() {
    this.router.navigate(['/browse']);
  }
}
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  @ViewChild('splashVideo') splashVideo: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí se podría omitir la reproducción automática.
  }

  startVideo() {
    // Reproducir el video después de la interacción del usuario
    this.splashVideo.nativeElement.play().then(() => {
      // Redirigir al login cuando termine el video
      this.splashVideo.nativeElement.onended = () => {
        this.router.navigate(['/login']);
      };
    }).catch((error: any) => {
      console.error("Error al intentar reproducir el video:", error);
    });
  }
}

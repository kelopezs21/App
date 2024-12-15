import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.page.html',
  styleUrls: ['./curso-detalle.page.scss'],
})
export class CursoDetallePage implements OnInit {
  curso: any;
  videoUrl: SafeResourceUrl | undefined;
  errorMessage: string | undefined;

  // Datos simulados de cursos
  cursos = [
    { id: '1', titulo: 'Fundamentos de Programación', descripcion: 'Aprende los conceptos básicos...', nivel: 'Básico', duracion: '5 horas', video: 'https://www.youtube.com/watch?v=VxrIZGQfxmE' },
    { id: '2', titulo: 'Experto en HTML', descripcion: 'Domina HTML5 desde cero...', nivel: 'Experto', duracion: '10 horas', video: 'https://www.youtube.com/watch?v=MJkdaVFHrto' }
  ];

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.curso = this.cursos.find(curso => curso.id === id);
      if (this.curso) {

        const embedUrl = this.curso.video.replace('watch?v=', 'embed/');
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      } else {
        this.errorMessage = 'Curso no encontrado';
      }
    } else {
      this.errorMessage = 'ID de curso no válido';
    }
  }
}

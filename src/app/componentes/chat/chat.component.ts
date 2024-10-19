import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthService } from '../../Servicios/auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../../Servicios/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  mensajes$!: Observable<any[]>;
  nuevoMensaje: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService,
  ) {}
  ngOnInit() {
    this.mensajes$ = this.chatService.getMensajes();
    this.mensajes$.subscribe((mensajes) => {
      console.log('Mensajes recibidos:', mensajes); // Verifica si los mensajes están llegando
    });
  }

  enviarMensaje() {
    const currentUser = this.authService.getCurrentUser();
    if (this.nuevoMensaje.trim() && currentUser != null) {
      this.chatService.enviarMensaje(currentUser, this.nuevoMensaje);
      this.nuevoMensaje = '';
    } else if (!currentUser) {
      console.error(
        'Error: No se puede enviar el mensaje porque el usuario no está autenticado.',
      );
    } else if (!this.nuevoMensaje.trim()) {
      console.error('Error: El mensaje no puede estar vacío.');
    }
  }
}

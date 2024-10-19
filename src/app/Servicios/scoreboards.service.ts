import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardsService {
  constructor(
    private firestore: Firestore,
    private auth: AuthService,
  ) {}

  puntajes: { user: string; juego: string; puntaje: number; fecha: Date }[] =
    [];

  ObtenerTodosLosPuntajes() {
    let col = collection(this.firestore, 'puntajes');

    getDocs(col).then((querySnapshot) => {
      this.puntajes = [];
      querySnapshot.forEach((doc) => {
        this.puntajes.push(doc.data() as any);
      });
      console.log(this.puntajes);
    });
  }

  GuardarPuntaje(email: string, juego: string, puntaje: number) {
    const col = collection(this.firestore, 'puntajes');
    const nuevoPuntaje = {
      user: email,
      juego: juego,
      puntaje: puntaje,
      fecha: new Date(),
    };

    addDoc(col, nuevoPuntaje)
      .then(() => {
        console.log('Puntaje guardado exitosamente!');
      })
      .catch((error) => {
        console.error('Error al guardar el puntaje: ', error);
      });
  }

  async obtenerMejoresPuntajes() {
    const col = collection(this.firestore, 'puntajes');
    const q = query(
      col,
      orderBy('user'),
      orderBy('juego'),
      orderBy('puntaje', 'desc'),
    );

    const snapshot = await getDocs(q);
    const mejoresPuntajes: { [user: string]: { [juego: string]: number } } = {};

    snapshot.docs.forEach((doc) => {
      const puntajeData = doc.data();
      const usuario = puntajeData['user'];
      const juego = puntajeData['juego'];
      const puntaje = puntajeData['puntaje'];

      // Verifica si el usuario ya tiene puntajes registrados
      if (!mejoresPuntajes[usuario]) {
        mejoresPuntajes[usuario] = {};
      }

      // Solo guarda si no existe un mejor puntaje para ese juego
      if (!mejoresPuntajes[usuario][juego]) {
        mejoresPuntajes[usuario][juego] = puntaje;
      }
    });

    // Convertir el objeto en un array para facilitar el manejo en la tabla
    const tablaPuntajes = Object.entries(mejoresPuntajes).map(
      ([user, juegos]) => ({
        user,
        ...juegos,
      }),
    );

    console.log(tablaPuntajes);
    return tablaPuntajes;
  }

  async ObtenerPuntajesUsuario(email: string): Promise<any[]> {
    const col = collection(this.firestore, 'puntajes');
    const q = query(col, where('user', '==', email));

    const snapshot = await getDocs(q);

    // Incluir la fecha en los datos que obtienes
    const puntajes = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        user: data['user'],
        juego: data['juego'],
        puntaje: data['puntaje'],
        fecha: data['fecha']
          ? new Date(data['fecha'].seconds * 1000).toLocaleDateString()
          : 'Sin fecha',
      };
    });
    console.log(puntajes);
    return puntajes;
  }
}

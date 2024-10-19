import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  constructor(private firestore: Firestore) {}

  guardarEncuesta(respuestas: any): Promise<void> {
    const encuestaRef = collection(this.firestore, 'encuestas');
    return addDoc(encuestaRef, respuestas)
      .then(() => console.log('Encuesta Guardadad'))
      .catch((error) => console.error('Error al guardar encuesta', error));
  }
}

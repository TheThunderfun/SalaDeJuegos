import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,query,orderBy, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore:Firestore) {}

  getMensajes():Observable<any[]>{
    const mensajes=collection(this.firestore,'mensajes');
    const q=query(mensajes,orderBy('hora'));
    return collectionData(q,{idField:'id'})
  }

  async enviarMensaje(usuario:string,contenido:string):Promise<void>{
    const mensajes=collection(this.firestore,'mensajes');
    await addDoc(mensajes,{
      contenido:contenido,
      usuario:usuario,
      hora:new Date()
    });
  }
}

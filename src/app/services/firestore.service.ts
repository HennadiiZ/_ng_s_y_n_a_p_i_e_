import { Injectable } from '@angular/core';
import { doc, DocumentData, DocumentSnapshot, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afs: Firestore) {}

  public setUserData(userId: string, data: { [key: string]: any }): Promise<void> {
    return setDoc(doc(this.afs, 'users', userId), data, { merge: true });
  }

  public async getUserData(userId: string): Promise<DocumentData | undefined> {
    const userData = await getDoc(doc(this.afs, 'users', userId));

    return userData.data();
  }
}

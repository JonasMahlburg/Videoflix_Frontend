// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Das BehaviorSubject speichert den aktuellen Anmeldestatus.
  // Es startet mit dem initialen Wert `false` (nicht angemeldet).
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  
  // Der `isLoggedIn$` ist ein Observable, das von Komponenten abonniert werden kann.
  // Das `asObservable()` sorgt dafür, dass die Komponenten den Wert nicht direkt ändern können.
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() { }

  /**
   * Simuliert den Login-Vorgang.
   * In einer echten Anwendung würde hier die API-Anmeldung erfolgen.
   */
  login(): void {
    // Wenn die Anmeldung erfolgreich ist, wird der Status auf `true` gesetzt.
    this.isLoggedInSubject.next(true);
    // Hier könntest du auch einen Token oder Benutzerdaten speichern.
  }

  /**
   * Simuliert den Logout-Vorgang.
   */
  logout(): void {
    // Setzt den Anmeldestatus auf `false`.
    this.isLoggedInSubject.next(false);
    // Lösche hier ggf. den Token oder andere Benutzerdaten.
  }

  /**
   * Gibt den aktuellen Anmeldestatus synchron zurück.
   * Nützlich für Guards oder wenn der sofortige Status benötigt wird.
   */
  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }
}
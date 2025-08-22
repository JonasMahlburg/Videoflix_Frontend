import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // NgForm für die Formularvalidierung importieren
import { HttpClient } from '@angular/common/http'; // HttpClient importieren

@Component({
  selector: 'app-landing-page',
  standalone: true,           
  imports: [CommonModule, FormsModule], 
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss']  
})
export class LandingPage {
  toastMessage: string | null = null;
  toastType: 'success' | 'error' | null = null;

  // Backend-URL für den E-Mail-Versand (muss angepasst werden)
  private emailApiUrl = 'https://deine-backend-api.com/send-email';

  // Den HttpClient im Konstruktor injizieren
  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showToast('Bitte eine gültige E-Mail-Adresse eingeben.', 'error');
      return;
    }
    
    const email = form.value.email;

    this.http.post(this.emailApiUrl, { email: email }).subscribe({
      next: (response) => {
        // Erfolgreicher Versand
        this.showToast('E-Mail wurde erfolgreich versendet!', 'success');
      },
      error: (error) => {
        // Fehler beim Versand
        console.error('E-Mail-Versand fehlgeschlagen', error);
        this.showToast('Etwas ist schiefgelaufen, bitte versuche es später noch einmal.', 'error');
      }
    });
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;

    setTimeout(() => {
      this.toastMessage = null;
      this.toastType = null;
    }, 3000);
  }
}

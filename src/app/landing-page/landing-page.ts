import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-landing-page',
  // imports: [],
  standalone: true,           // 👈 falls es eine Standalone-Komponente ist
  imports: [CommonModule, FormsModule], 
  templateUrl: './landing-page.html',
  // styleUrl: './landing-page.scss',
  styleUrls: ['./landing-page.scss']  
})
export class LandingPage {
  toastMessage: string | null = null;
  toastType: 'success' | 'error' | null = null;

  onSubmit() {
    // Beispiel: Fake-Login (hier würdest du später deinen Service ansprechen)
    const loginSuccess = Math.random() > 0.5; // nur zum Testen

    if (loginSuccess) {
      this.showToast('Login erfolgreich', 'success');
    } else {
      this.showToast('Login fehlgeschlagen', 'error');
    }
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;

    // Nach 3 Sekunden Toast ausblenden
  //   setTimeout(() => {
  //     this.toastMessage = null;
  //     this.toastType = null;
  //   }, 3000);
  }
}

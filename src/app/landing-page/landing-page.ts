import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


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

  onSubmit() {
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

    setTimeout(() => {
      this.toastMessage = null;
      this.toastType = null;
    }, 3000);
  }
}

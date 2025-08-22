import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in-page.html',
  styleUrl: './log-in-page.scss'
})
export class LogInPage {
  
  toastMessage: string | null = null;
  toastType: 'success' | 'error' | null = null;

  backendUrl = 'http://127.0.0.1:8000/api/login/';

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

  onLogin(form: NgForm) {
    if (form.invalid) {
      this.showToast('Bitte füllen Sie alle Felder aus.', 'error');
      return;
    }

    const { email, password } = form.value;

    this.http.post<any>(this.backendUrl, { email, password }).subscribe({
      next: (response) => {
        this.showToast('Login erfolgreich!', 'success');
        
        setTimeout(() => {
          this.router.navigate(['videos']);
        }, 1500);
      },
      error: (error) => {
        this.showToast('E-Mail oder Passwort ist falsch!', 'error');
        console.error('Login fehlgeschlagen:', error);
      }
    });
  }

  showPw() {
    let pwInput = document.getElementById("PwInput") as HTMLInputElement;
    let pwIcon = document.getElementById("pwIcon") as HTMLImageElement;

    if (pwInput.type === "password") {
      pwInput.type = "text";
      pwIcon.src = "icons/visibility_off.svg";
    } else {
      pwInput.type = "password";
      pwIcon.src = "icons/visibility.svg";
    }
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.toastMessage = null;
      this.toastType = null;
      this.cdr.detectChanges();
    }, 3000);
  }
}
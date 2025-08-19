import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in-page',
  imports: [],
  templateUrl: './log-in-page.html',
  styleUrl: './log-in-page.scss'
})

export class LogInPage {
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
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-page',
  imports: [],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.scss'
})
export class SignUpPage {
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
    showConfirmPw() {
    let pwInput = document.getElementById("PwCInput") as HTMLInputElement;
    let pwIcon = document.getElementById("pwCIcon") as HTMLImageElement;

    if (pwInput.type === "password") {
      pwInput.type = "text";
      pwIcon.src = "icons/visibility_off.svg";
    } else {
      pwInput.type = "password";
      pwIcon.src = "icons/visibility.svg";
    }
  }
}

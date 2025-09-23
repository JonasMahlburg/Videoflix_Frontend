import { Component } from '@angular/core';
import { Footer } from "../shared/footer/footer";
import { Header } from "../shared/header/header";

@Component({
  selector: 'app-sign-up-page',
  imports: [Footer, Header],
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

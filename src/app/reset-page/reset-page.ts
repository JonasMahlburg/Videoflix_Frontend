import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-page',
  imports: [FormsModule],
  templateUrl: './reset-page.html',
  styleUrl: './reset-page.scss'
})
export class ResetPage {
  togglePasswordVisibility(inputID: string, iconID: string) {
    let pwInput = document.getElementById(inputID) as HTMLInputElement;
    let pwIcon = document.getElementById(iconID) as HTMLImageElement;

    if (pwInput.type === "password") {
      pwInput.type = "text";
      pwIcon.src = "icons/visibility_off.svg";
    } else {
      pwInput.type = "password";
      pwIcon.src = "icons/visibility.svg";
    }
  }
}

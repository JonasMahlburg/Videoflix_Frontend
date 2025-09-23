import { Component } from '@angular/core';
import { Footer } from '../shared/footer/footer';
import { Header } from '../shared/header/header';

@Component({
  selector: 'app-forgot-page',
  imports: [Footer, Header],
  templateUrl: './forgot-page.html',
  styleUrl: './forgot-page.scss'
})
export class ForgotPage {

}

import { Component } from '@angular/core';
import { Footer } from "../shared/footer/footer";
import { Header } from "../shared/header/header";

@Component({
  selector: 'app-imprint',
  imports: [Footer, Header],
  templateUrl: './imprint.html',
  styleUrl: './imprint.scss'
})
export class Imprint {

}

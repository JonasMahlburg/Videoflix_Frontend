import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // Pfad anpassen!
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
    isLoggedIn: boolean = false;
    private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
  
  ngOnDestroy(): void {
    // Wichtig: Das Abonnement beenden, um Memory Leaks zu vermeiden.
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onButtonClick(): void {
    if (this.isLoggedIn) {
      this.authService.logout();
    } else {
      this.authService.login();
    }
  }
}

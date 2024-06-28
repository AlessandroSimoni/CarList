import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthappService } from 'src/services/authapp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isDarkMode = false;
  public currentRoute: string = '';
  isLogged: boolean = false;

  constructor(private router: Router, private basicAuth: AuthappService) { }

  ngOnInit(): void {
    // Sottoscrizione allo stato di autenticazione
    this.basicAuth.isLoggedIn$.subscribe(isLoggedIn => {
      console.log(`Header component received login status: ${isLoggedIn}`);
      this.isLogged = isLoggedIn;
    });

    // Sottoscrizione agli eventi di routing
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.urlAfterRedirects.split('/')[1] || '';
        console.log(`NavigationEnd event: ${route}`);
        this.basicAuth.setCurrentRoute(route);
      }
    });

    // Sottoscrizione agli aggiornamenti del percorso
    this.basicAuth.currentRoute$.subscribe(route => {
      console.log(`Header component received current route: ${route}`);
      this.currentRoute = route;
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  logOut() {
    this.basicAuth.logOut();
    this.router.navigate(['login']);
  }
}

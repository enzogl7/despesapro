import { Component } from '@angular/core';
import { faUsers, faPlaneDeparture, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-gestor',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './gestor.html',
  styleUrl: './gestor.css'
})
export class Gestor {

  constructor(private authService : AuthService) {}

  faUsers = faUsers;
  faPlaneDeparture = faPlaneDeparture;
  faRightFromBracket = faRightFromBracket;
  faUser = faUser;

  logout() {
    this.authService.logout()
  }

}

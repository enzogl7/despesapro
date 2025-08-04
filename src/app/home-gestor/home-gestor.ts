import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faPlaneDeparture, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-gestor',
  imports: [FontAwesomeModule],
  templateUrl: './home-gestor.html',
  styleUrl: './home-gestor.css'
})
export class HomeGestor {

  faUsers = faUsers;
  faPlaneDeparture = faPlaneDeparture;
  faRightFromBracket = faRightFromBracket;
  faUser = faUser;

}

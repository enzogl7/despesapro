import { Component } from '@angular/core';
import { faUsers, faPenToSquare, faTrash, faCheck, faX, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-colaboradores',
  imports: [FontAwesomeModule],
  templateUrl: './colaboradores.html',
  styleUrl: './colaboradores.css'
})
export class Colaboradores {

  faUsers = faUsers;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faCheck = faCheck;
  faX = faX;
  faPaperPlane = faPaperPlane;

}

import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlaneDeparture, faFolder, faChartColumn, faUser, faPaperPlane, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landingpage',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './landingpage.html',
  styleUrl: './landingpage.css'
})
export class Landingpage {

  faPlaneDeparture = faPlaneDeparture
  faFolder = faFolder
  faChartColumn = faChartColumn
  faUser = faUser
  faPaperPlane = faPaperPlane
  faCheck = faCheck
  menuAberto = false;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
      console.log('menuAberto:', this.menuAberto);
  }
}

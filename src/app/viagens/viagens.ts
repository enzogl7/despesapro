import { Component } from '@angular/core';
import { faPlaneDeparture, faPlane, faCircleCheck, faMoneyBills, faChartSimple, faCalendar, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-viagens',
  imports: [FontAwesomeModule],
  templateUrl: './viagens.html',
  styleUrl: './viagens.css'
})
export class Viagens {

  faPlaneDeparture = faPlaneDeparture;
  faPlane = faPlane;
  faCircleCheck = faCircleCheck;
  faMoneyBills = faMoneyBills;
  faChartSimple = faChartSimple;
  faCalendar = faCalendar;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
}

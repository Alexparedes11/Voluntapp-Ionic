import { Component, Input, OnInit, numberAttribute } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-card-component',
  templateUrl: './event-card-component.component.html',
  styleUrls: ['./event-card-component.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DatePipe, RouterModule]
})
export class EventCardComponentComponent implements OnInit{

  @Input() id: number | null = null;
  @Input() image: string | null = null;
  @Input() title: string | null = null;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Input() location: string | null = null;
  @Input() numVolunteers: number | null = null;
  @Input() createdByUser: string | null = null;
  @Input() createdByInstitution: string | null = null;
  @Input() nombreInstituciones: Array<string> | null = null;

  constructor() { }

  currentIndex: number = 0;
  currentInstitution: string = ''; // Inicialmente mostrar el primer elemento del array

  stringFunction() {
    if (this.nombreInstituciones) {
      this.currentInstitution = this.nombreInstituciones[0];
    }
  }

  intervalFunction() {
    if (this.nombreInstituciones) {
      this.currentIndex = (this.currentIndex + 1) % this.nombreInstituciones.length;
      this.currentInstitution = this.nombreInstituciones[this.currentIndex];
    }
  }

  ngOnInit() {
    this.stringFunction();
    setInterval(() => {
      this.intervalFunction();
    }, 2000); // Intervalo en milisegundos (por ejemplo, cada segundo)
  }

}

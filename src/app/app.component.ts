import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [CommonModule, HttpClientModule, IonApp, IonRouterOutlet],
  standalone: true,
})
export class AppComponent {
  title = 'VoluntApp';
  
}

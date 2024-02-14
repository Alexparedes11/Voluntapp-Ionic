import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EventCardComponentComponent } from '../event-card-component/event-card-component.component';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, EventCardComponentComponent]
})
export class TabsPage {

  constructor() {}

}

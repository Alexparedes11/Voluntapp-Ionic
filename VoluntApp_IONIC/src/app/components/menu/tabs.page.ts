import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EventCardComponentComponent } from '../event-card-component/event-card-component.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  providers: [UserService],
  imports: [IonicModule, EventCardComponentComponent, HttpClientModule]
})
export class TabsPage implements OnInit{

  constructor(private userService: UserService) {}

  logueado = false;

  volverlogin() {
    window.location.href = '/login';
  }

  ngOnInit(): void {

  this.logueado = this.userService.isLogged();

    if (this.logueado === false) {
      this.volverlogin();
    }

}
}

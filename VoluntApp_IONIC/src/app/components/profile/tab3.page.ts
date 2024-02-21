import { NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventDTO } from 'src/app/models/dto/EventDTO';
import { NumeroDeEventosDTO } from 'src/app/models/dto/NumeroDeEventosDTO';
import { UserDTO } from 'src/app/models/dto/UserDTO';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  providers: [UserService, EventService],
  imports: [HttpClientModule, NgIf, NgClass, IonicModule, RouterModule],
})

export class Tab3Page implements OnInit {
  constructor(
    private userService: UserService,
    private eventoService: EventService
  ) {}

  userId: number = -1;
  editarperfil: boolean = false;
  user: UserDTO = {} as UserDTO;
  event: EventDTO[] = [];
  eventosPerfil: NumeroDeEventosDTO = {} as NumeroDeEventosDTO;
  logueado = false;

  //Funcion cerrar sesion

  logout() {
    this.userService.logout();
  }

  //Funcion para volver al login

  volverlogin() {
    window.location.href = '/login';
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserIdFromToken();
    this.logueado = this.userService.isLogged();

    if (this.logueado === false) {
      this.volverlogin();
    }

    this.eventoService.obtenerEventosPerfil(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.eventosPerfil = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.user = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  //Boton de alerta para cerrar sesion

  public alertButtons = [
    {
      userService: UserService,
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.logout();
        this.volverlogin();
      },
    },
  ];
}

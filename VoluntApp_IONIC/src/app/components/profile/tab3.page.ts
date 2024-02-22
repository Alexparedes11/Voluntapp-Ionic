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
import { InstitucionDTO } from 'src/app/models/dto/InstitucionDTO';

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

  selectedProfileImage: string | null = null;
  selectedBannerImage: string | null = null;
  userId: number = -1;
  tipo: string = "";
  editarperfil: boolean = false;
  user: UserDTO = {} as UserDTO;
  userIn: InstitucionDTO = {} as InstitucionDTO;
  event: EventDTO[] = [];
  editedUser: UserDTO | null = null;
  eventosPerfil: NumeroDeEventosDTO = {} as NumeroDeEventosDTO;
  logueado = false;
  usuario = false;

  //Funcion cerrar sesion

  logout() {
    this.userService.logout();
  }

  //Funcion para volver al login

  volverlogin() {
    window.location.href = '/login';
  }

  onProfileImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedProfileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onBannerImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedBannerImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.tipo = this.userService.getUserTypeFromToken();
    this.logueado = this.userService.isLogged();

    if (this.logueado === false) {
      this.volverlogin();
    }

    if (this.tipo == "Usuario") {

      this.usuario = true;

      this.userId = this.userService.getUserIdFromToken();

      this.eventoService.obtenerEventosPerfil(this.userId).subscribe(
        (data) => {
          console.log(data);
          this.eventosPerfil = data;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );

      this.userService.getUserById(this.userId).subscribe( // Cambiar profileService a userService
        (data) => {
          console.log(data);
          this.user = data;
        },
        (error) => {
          console.error('Error fetching user data:', error); // Cambiar 'Error fetching events:' a 'Error fetching user data:'
        }
      );
    } else if (this.tipo == "Institucion") {

      this.userId = this.userService.getUserIdFromToken();

      this.userService.getUserByIdInstitucion(this.userId).subscribe(
        (data: InstitucionDTO) => { // Update the type of data to InstitucionDTO
          console.log(data);
          this.userIn = data; // Assign data directly to userIn
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
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

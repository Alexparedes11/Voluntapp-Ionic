import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDTO } from 'src/app/models/dto/EventDTO';
import { map } from 'rxjs';
import { MapComponent } from '../map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDTO } from 'src/app/models/dto/UserDTO';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
  standalone: true,
  providers: [EventService, UserService],
  imports: [IonicModule, CommonModule, FormsModule, MapComponent,  HttpClientModule]
})
export class EventDetailsPage implements OnInit {

  id: any;
  logueado = false;

  constructor(private eventService: EventService, private userService: UserService, private router: Router, 
              private activatedRoute: ActivatedRoute) { }


  tipo: string = "";
  userId: number = -1;
  isUserInEvent: boolean = false;
  isInstitucionInEvent: boolean = false;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  isCreator: boolean = false;

  event: EventDTO = {} as EventDTO;

  handleRefresh(data: any) {
    setTimeout(() => {
      location.reload();
      data.target.complete();
    }, 1500);
  }

  //Funcion para "cargar mas eventos"

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1500);
  }

  volverlogin() {
    window.location.href = '/login';
  }

  addUserToEvent() {
    this.eventService.addUserToEvent(this.userId, this.id).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isUserInEvent = true;
    alert("Te has unido al evento correctamente");

  }

  addInstitucionToEvent() {
    this.eventService.addInstitutionToEvent(this.userId, this.id).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isInstitucionInEvent = true;
    alert("Te has unido al evento correctamente");

  }

  removeUserFromEvent() {
    this.eventService.removeUserFromEvent(this.userId, this.id).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isUserInEvent = false;

  }

  removeInstitucionFromEvent() {
    this.eventService.removeInstitutionFromEvent(this.userId, this.id).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isInstitucionInEvent = false;

  }

  deleteEvent() {
    this.eventService.updateEventState(this.id, "eliminado").subscribe();
    this.router.navigate(['/myevents']);
  }

  requestEventElimination() {
    // Crea un contenedor div para personalizar el estilo del alert
    const alertContainer = document.createElement("div");
    alertContainer.style.position = "fixed";
    alertContainer.style.top = "50%";
    alertContainer.style.left = "50%";
    alertContainer.style.transform = "translate(-50%, -50%)";
    alertContainer.style.borderRadius = "5px";
    alertContainer.style.textAlign = "right";
    alertContainer.classList.add('bg-white', 'rounded', 'p-4');

    // Crea un título
    const title = document.createElement("h3");
    title.textContent = "¿Estás seguro de solicitar la eliminación?";
    title.style.marginBottom = "15px";
    title.classList.add('fw-semibold', 'text-black');
    alertContainer.appendChild(title);

    // Crea un área de texto para que el usuario ingrese los motivos
    const motivosInput = document.createElement("textarea");
    motivosInput.placeholder = "Ingrese los motivos aquí...";
    motivosInput.style.width = "100%";
    motivosInput.style.height = "100px";
    motivosInput.style.marginBottom = "10px";
    alertContainer.appendChild(motivosInput);



    // Crea un botón de cancelar
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancelar";
    cancelButton.style.backgroundColor = "#890101";
    cancelButton.style.color = "#fff";
    cancelButton.style.padding = "8px 15px";
    cancelButton.style.border = "none";
    cancelButton.style.borderRadius = "3px";
    cancelButton.style.cursor = "pointer";
    cancelButton.addEventListener("click", () => {
      // Cierra el alert sin hacer nada
      document.body.removeChild(alertContainer);
    });
    alertContainer.appendChild(cancelButton);
    // Crea un botón de confirmación
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirmar";
    confirmButton.style.backgroundColor = "#386641";
    confirmButton.style.color = "#fff";
    confirmButton.style.padding = "8px 15px";
    confirmButton.style.border = "none";
    confirmButton.style.cursor = "pointer";
    confirmButton.style.marginLeft = "10px";
    confirmButton.classList.add('bg-secondary', 'rounded')
    confirmButton.addEventListener("click", () => {
      // Obtiene el email del usuario



      // Guarda los motivos en la variable
      const motivosEliminacion = motivosInput.value;
      let user: UserDTO;
      this.userService.getUserById(this.userId).subscribe((userData) => {
        user = userData;
        // Enviar los motivos de eliminación


        this.eventService.sendDeleteRequest({
          email: user.email,
          asunto: "Motivos de eliminacion: ",
          mensaje: motivosEliminacion + " - Evento: " + this.id

        }).subscribe(response => {
          alert("Solicitud de eliminación enviada correctamente");
        });
      });

      // Actualizar el estado a "en-eliminacion"
      this.eventService.updateEventState(this.id, "en-eliminacion").subscribe(
        () => {
          // Cierra el alert después de que la actualización sea exitosa
          document.body.removeChild(alertContainer);
        },
        (error) => {
          console.error('Error al actualizar el estado del evento:', error);

          // Manejar el error aquí si es necesario

          // Cierra el alert incluso si hay un error
          document.body.removeChild(alertContainer);
        }
      );
    });
    alertContainer.appendChild(confirmButton);

    document.body.appendChild(alertContainer);
  }
  
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isAdmin = this.userService.isAdmin();
    this.userId = this.userService.getUserIdFromToken();
    this.tipo = this.userService.getUserTypeFromToken();

    console.log(this.tipo);

    this.logueado = this.userService.isLogged();

    if (this.logueado === false) {
      this.volverlogin();
    }

    this.eventService.getEventDTOById(this.id).subscribe(
      (data) => {
        this.event = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

    this.isLogged = this.userService.isLogged();

    if (this.isLogged) {

      if (!this.isAdmin && this.tipo == "Usuario") {

        this.eventService.isUserInEvent(this.userId, this.id).subscribe(
          (data) => {
            this.isUserInEvent = data;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }

        );

        this.eventService.isUserCreator(this.userId, this.id).subscribe(
          (boolean) => {
            if (boolean == true) {
              this.isCreator = true;
            }
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        )

      } else {
        this.eventService.isInstitucionInEvent(this.userId, this.id).subscribe(
          (data) => {
            this.isInstitucionInEvent = data;
          },
          (error) => {
            console.log('Error fetching events: ', error);
          }
        )
      }
    }
  }
}

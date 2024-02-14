import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserDTO } from 'src/app/models/dto/UserDTO';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, NgClass, NgIf, HttpClientModule],
  providers: [UserService, CookieService]
})
export class LoginPage{

  errorMensaje: string = '';

  form = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', Validators.required)
    }
  );

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }

  loguearUsuario(): void {
    this.userService.login(this.form.value).subscribe(
      (data: any) => {
        this.cookieService.set('token', data.token);
        this.router.navigate(['/menu/home']);
      },
      (error: any) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMensaje = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
      }
    );
  }
}

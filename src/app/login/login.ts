import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginRequest } from '../services/auth-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  form: FormGroup;
  loginIncorreto: boolean = false;
  erroServidor: boolean = false;
  cadastrado: boolean | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
    const navigation = this.router.getCurrentNavigation();
    this.cadastrado = navigation?.extras?.state?.['cadastrado'] ?? null;
  }

  logar() {
    if (this.form.valid) {
      const dados: LoginRequest = this.form.value;

      this.authService.logar(dados).subscribe({
        next: (response) => {
          if (response.role === 'ADMIN') {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/gestor/home']);
          } else {
            this.router.navigate(['/colab/home']);
          }
        },
        error: (erro) => {
          switch (erro.status) {
            case 403:
              this.loginIncorreto = true;
              break;
            default:
              this.erroServidor = true;
              console.error('Erro:', erro);
          }
        }
      });
    }
  }
}

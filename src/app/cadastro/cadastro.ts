import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, RegisterRequest } from '../services/auth-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  form: FormGroup;
  jaCadastrado: boolean = false;
  erroServidor: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  cadastrar() {
    if (this.form.valid) {
      const dados: RegisterRequest = {...this.form.value, role: 'USER'};

      this.authService.cadastrar(dados).subscribe({
        next: (response) => {
          this.router.navigate(['/login'], {
            state: { cadastrado: true }
          });
        },
        error: (erro) => {
          switch (erro.status) {
            case 400:
              this.jaCadastrado = true;
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

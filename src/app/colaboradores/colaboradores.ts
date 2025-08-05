import { Component } from '@angular/core';
import { faUsers, faPenToSquare, faTrash, faCheck, faX, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ColaboradoresService, ConviteRequest } from '../services/colaboradores-service';
@Component({
  selector: 'app-colaboradores',
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './colaboradores.html',
  styleUrl: './colaboradores.css'
})
export class Colaboradores {
  form: FormGroup;
  convite: string = "";
  gestorNaoEncontrado: boolean = false;
  erroInterno: boolean = false;

  constructor(private fb: FormBuilder, private colaboradoresService: ColaboradoresService) {
    this.form = this.fb.group({
      emailGestor: ['', [Validators.required, Validators.email]],
      nomeColaborador: ['', Validators.required],
      emailColaborador: ['', [Validators.required, Validators.email]],
    });
  }   

  gerarConvite() {
    const dados : ConviteRequest = this.form.value;

    this.colaboradoresService.gerarConviteColaborador(dados).subscribe({
        next: (response) => {
          this.erroInterno = false;
          this.gestorNaoEncontrado = false;
          this.convite = response.token;
        },
        error: (erro) => {
          this.convite = "";
          this.erroInterno = false;
          switch (erro.status) {
            case 400:
              this.gestorNaoEncontrado = true;
              break;
            default:
              this.erroInterno = true;
              console.error('Erro:', erro);
          }
        }
      });
  }

  faUsers = faUsers;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faCheck = faCheck;
  faX = faX;
  faPaperPlane = faPaperPlane;

}

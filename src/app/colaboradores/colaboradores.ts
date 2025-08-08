import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { faUsers, faPenToSquare, faTrash, faCheck, faX, faPaperPlane, faCopy, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ColaboradoresService, ConviteRequest } from '../services/colaboradores-service';
import { environment } from '../../environments/environment.development';
import { initTooltips, ModalInterface } from 'flowbite';

export interface Colaborador {
  id: string;
  usuario: {
    id: string
    nome: string;
    email: string;
  };
  criadoEm: string;
  cargo: string;
  telefone: string;
  ativo: boolean;
}

@Component({
  selector: 'app-colaboradores',
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './colaboradores.html',
  styleUrl: './colaboradores.css'
})
export class Colaboradores implements AfterViewInit {
  form: FormGroup;
  convite: string = "";
  warn: boolean = false;
  erroInterno: boolean = false;
  sucessoEdicao: boolean = false;
  mensagemWarn: string = "";
  mensagemSucesso: string = ""
  colaboradores: Colaborador[] = [];
  modalEditar: ModalInterface | undefined;

  colaboradorSelecionado: Colaborador = {
    id: '',
    usuario: {
      id: '',
      nome: '',
      email: ''
    },
    criadoEm: '',
    cargo: '',
    telefone: '',
    ativo: false
  };

  faUsers = faUsers;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faCheck = faCheck;
  faX = faX;
  faPaperPlane = faPaperPlane;
  faCopy = faCopy;
  faSave = faSave

  ngAfterViewInit() {
    let sucesso: string | null = "";
    if (isPlatformBrowser(this.platformId)) {
      initTooltips();
      sucesso = localStorage.getItem('sucessoEdicao');
    }
    this.listarColaboradores();
    if (sucesso === 'true') {
      this.sucessoEdicao = true;
      localStorage.removeItem('sucessoEdicao');
    }
  }

  constructor(private fb: FormBuilder, private colaboradoresService: ColaboradoresService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.form = this.fb.group({
      emailGestor: ['', [Validators.required, Validators.email]],
      emailColaborador: ['', [Validators.required, Validators.email]],
    });
  }   

  gerarConvite() {
    const dados : ConviteRequest = this.form.value;

    this.colaboradoresService.gerarConviteColaborador(dados).subscribe({
        next: (response) => {
          this.erroInterno = false;
          this.warn = false;
          this.convite = environment.appUrl + 'convite/aceitar/' + response.token;
        },
        error: (erro) => {
          this.convite = "";
          this.erroInterno = false;
          switch (erro.status) {
            case 400:
              this.warn = true;
              this.mensagemWarn = `Nenhum gestor encontrado com este email. Certifique-se de que '${this.form.value.emailGestor}' está cadastrado.`
              break;
            case 404: 
              this.warn = true;
              this.mensagemWarn = `Nenhum colaborador encontrado com este email. Certifique-se de que '${this.form.value.emailColaborador}' está cadastrado.`
              break;
            case 406:
              this.warn = true;
              this.mensagemWarn = 'Esse colaborador já possui um convite em aberto.';
              break;
            default:
              this.erroInterno = true;
              console.error('Erro:', erro);
          }
        }
      });
  }

  
  copiarConvite() {
    navigator.clipboard.writeText(this.convite).then(() => {
      const tooltip = document.getElementById('tooltip-click');
      if (tooltip) {
        tooltip.classList.remove('invisible', 'opacity-0');
        tooltip.classList.add('visible', 'opacity-100');
        setTimeout(() => {
          tooltip.classList.add('invisible', 'opacity-0');
          tooltip.classList.remove('visible', 'opacity-100');
        }, 1500);
      }
    });
  }

  listarColaboradores() {
    this.colaboradoresService.listarColaboradoresPorGestor().subscribe({
      next: (response) => {
        this.colaboradores = response;
      },
      error: (erro) => {
        console.log(erro);
      }
    });
  }

  abrirModal(colab : Colaborador) {
    this.colaboradorSelecionado = {... colab};
  }

  salvarEdicao() {
    this.colaboradoresService.salvarEdicaoColaborador(this.colaboradorSelecionado).subscribe({
      next: (response) => {
        localStorage.setItem('sucessoEdicao', 'true');
        location.reload();
      },
      error: (erro) => {
        console.log(erro)
      }
    });
  }

  removerColaborador() {
    this.colaboradoresService.removerColaborador(this.colaboradorSelecionado.id).subscribe({
      next: (response) => {
        localStorage.setItem('sucessoEdicao', 'true');
        location.reload();
      },
      error: (erro) => {
        console.log(erro)
      }
    });
  }

}
